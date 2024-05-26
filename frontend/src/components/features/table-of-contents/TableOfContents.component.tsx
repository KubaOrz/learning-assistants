import { FC } from "react";
import { CourseDetails, Lesson } from "../../../api/dto/courses/courses.types";
import { Accordion, AccordionContent, AccordionTitle } from "flowbite-react";

type TableOfContentsProps = {
    course: CourseDetails;
    selectLesson: (lesson: Lesson) => void;
}

const TableOfContents: FC<TableOfContentsProps> = ({ course, selectLesson }) => {
    return (
        <Accordion className="mb-4 w-1/4 h-fit">
            {
                course.chapters.map(chapter => (
                    <Accordion.Panel >
                        <AccordionTitle className="p-3 bg-primary hover:bg-primary-light text-base-100">
                            <div>
                                <h2 className="text-lg font-semibold">{chapter.title}</h2>
                            </div>
                            <div>
                                <span className="text-base mr-10">{chapter.totalDurationMinutes} minut</span>
                                <span className="text-base">{chapter.lessons.length} lekcji</span>
                            </div>

                        </AccordionTitle>
                        <AccordionContent className="p-1">
                            {
                                chapter.lessons.map(lesson => (
                                    <div
                                        className="cursor-pointer p-2 mb-2 mx-4 border-b border-gray-200 hover:bg-gray-100 hover:text-gray-800 rounded-lg shadow transition duration-200 ease-in-out"
                                        onClick={() => selectLesson(lesson)}
                                    >
                                        {lesson.title}
                                    </div>
                                ))
                            }
                        </AccordionContent>
                    </Accordion.Panel>
                ))
            }
        </Accordion>
    )
}

export default TableOfContents;