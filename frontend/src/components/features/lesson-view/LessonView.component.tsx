import { FC } from "react";
import { Lesson } from "../../../api/dto/courses/courses.types";
import AssistantChat from "../assistant-chat/AssistantChat.component";

type LessonViewProps = {
    lesson: Lesson | null;
    courseId: number
}

const LessonView: FC<LessonViewProps> = ({ lesson, courseId }) => {
    if (!lesson) {
        return <h1>Ten kurs jest pusty!</h1>
    }

    return (
        <div className="flex flex-col gap-6 pb-10 w-full">
            <h1 className="text-4xl">{lesson.title}</h1>
            <div className="w-full">
                <video controls className="mt-2 w-full">
                    <source src={lesson.videoUrl} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
            </div>
            <div className="border border-gray-300 rounded-md p-6" dangerouslySetInnerHTML={{ __html: lesson.content }} />
            <AssistantChat courseId={courseId} />
        </div>
    )
}

export default LessonView;