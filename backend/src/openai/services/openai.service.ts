import { ConflictException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Assistant } from '../model/assistant.entity';
import { Repository } from 'typeorm';
import { Course } from 'src/course/model/course.entity';
import { CourseService } from 'src/course/services/course.service';
import OpenAI, { toFile } from "openai";
import { promises as fs } from 'fs';
import { Thread } from 'openai/resources/beta/threads/threads';

@Injectable()
export class OpenAIService {

    private openAI: OpenAI

    constructor(
        private readonly configService: ConfigService,
        @InjectRepository(Assistant)
        private assistantRepository: Repository<Assistant>,
        private courseService: CourseService
    ) {
        this.openAI = new OpenAI({
            apiKey: this.configService.get<string>('OPENAI_API_KEY'), // This is the default and can be omitted
        });
    }

    async enableAssistantsForCourse(courseId: number): Promise<void> {
        const existingAssistant = await this.assistantRepository.findOne({
            where: {
                course: {
                    id: courseId
                }
            }
        });
        if (existingAssistant) {
            existingAssistant.enabled = true;
            this.assistantRepository.save(existingAssistant);
            return;
        }

        const courseDetails = await this.courseService.getCourseWithChaptersById(courseId);

        const fileIds = await this.generateCourseContentsFiles(courseDetails);
        const vectorStore = await this.createVectorStore(fileIds, 'Test vector store');

        const instructions = 'Twoim zadaniem jest wspieranie kursanta w nauce w obrębie kursu na podstawie materiałów z tego kursu';

        this.createAssistant(courseDetails, instructions, vectorStore.id, 'Test assistant');
        return;
    }

    async disableAssistantsForCourse(courseId: number): Promise<void> {
        const assistant = await this.getAssistant(courseId);

        assistant.enabled = false;
        this.assistantRepository.save(assistant);
    }

    async getAssistant(courseId: number): Promise<Assistant> {
        const assistant = await this.assistantRepository.findOne({
            where: {
                course: {
                    id: courseId
                }
            }
        });

        if (!assistant) {
            throw new NotFoundException('Assistant not found');
        }

        return assistant;
    }

    async createEmptyThread(): Promise<Thread> {
        const emptyThread = await this.openAI.beta.threads.create();
        return emptyThread;
    }

    async createRunStream(assistantId: string, threadId: string) {
        const stream = await this.openAI.beta.threads.runs.create(
            threadId,
            { assistant_id: assistantId, stream: true }
        );

        return stream;
    }

    async addMessageToThread(threadId: string, content: string) {
        const message = await this.openAI.beta.threads.messages.create(
            threadId,
            {
                role: "user",
                content: content
            }
        );

        return message;
    }

    private async generateCourseContentsFiles(courseDetails: Course): Promise<string[]> {
        const fileIds = [];

        for (const chapter of courseDetails.chapters) {
            for (const lesson of chapter.lessons) {
                const content = lesson.content;
                const filepath = `/tmp/file_${new Date().toISOString()}.html`;

                try {
                    await fs.writeFile(filepath, content, 'utf-8');
                    const fileContent = await fs.readFile(filepath);
                    const uploadableFile = await toFile(fileContent, 'test_file_name.html');

                    const file = await this.openAI.files.create({
                        file: uploadableFile,
                        purpose: "assistants",
                    });

                    fileIds.push(file.id);
                } catch (error) {
                    console.error('Błąd podczas operacji na pliku:', error);
                } finally {
                    try {
                        await fs.unlink(filepath); // Usunięcie pliku po operacjach na nim
                    } catch (unlinkError) {
                        console.error('Błąd podczas usuwania pliku:', unlinkError);
                    }
                }
            }
        }

        return fileIds;
    }


    private async createAssistant(course: Course, instructions: string, vectorStoreId: string, name = `${course.title} learning assistant`): Promise<Assistant> {
        const newAssistant = await this.openAI.beta.assistants.create({
            instructions: instructions,
            name: name,
            tools: [{ type: "file_search" }],
            model: "gpt-3.5-turbo",
            tool_resources: {
                file_search: {
                    vector_store_ids: [vectorStoreId]
                }
            }
        });

        const assistant = new Assistant();
        assistant.openaiId = newAssistant.id;
        assistant.name = newAssistant.name;
        assistant.course = course;
        assistant.enabled = true;

        return this.assistantRepository.save(assistant);
    }

    private async createVectorStore(fileIds: string[], name: string) {
        const vectorStore = await this.openAI.beta.vectorStores.create({
            name: name,
            file_ids: fileIds
        });

        return vectorStore;
    }
}
