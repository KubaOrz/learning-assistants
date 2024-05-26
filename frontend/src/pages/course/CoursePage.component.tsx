import { FC, useEffect, useState } from "react";
import TableOfContents from "../../components/features/table-of-contents/TableOfContents.component";
import { useLazyGetCourseDetailsQuery } from "../../api/api.service";
import { useParams } from "react-router-dom";
import { Spinner } from "flowbite-react";
import { Lesson } from "../../api/dto/courses/courses.types";
import LessonView from "../../components/features/lesson-view/LessonView.component";

const CoursePage: FC = () => {
    const { courseId } = useParams<{ courseId: string }>();
    const [getCourseDetails, { data: course, isLoading, isError, isSuccess }] = useLazyGetCourseDetailsQuery();
    const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);

    const selectLesson = (lesson: Lesson) => {
        setSelectedLesson(lesson);
    }

    useEffect(() => {
        if (courseId) {
            getCourseDetails(parseInt(courseId));
        }
    }, [courseId])

    useEffect(() => {
        if (course?.chapters[0]) {
            setSelectedLesson(course?.chapters[0].lessons[0])
        }
    }, [course])

    return (
        <>
            {
                course && (
                    <div className="flex gap-6">
                        <TableOfContents course={course} selectLesson={selectLesson} />
                        <LessonView lesson={selectedLesson} />
                    </div>
                )
            }
            {
                isLoading && <Spinner />
            }
        </>
    )
}

export default CoursePage;