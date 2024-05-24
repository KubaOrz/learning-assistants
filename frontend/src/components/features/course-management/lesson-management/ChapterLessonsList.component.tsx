import { FC, useEffect, useState } from "react";
import { Lesson } from "../../../../api/dto/courses/courses.types";
import { Button, Toast } from "flowbite-react";
import CreateLessonForm from "../CreateLessonForm.component";
import { useDrag, useDrop } from 'react-dnd';
import { HiCheck, HiX } from "react-icons/hi";
import { useUpdateLessonsOrderMutation } from "../../../../api/api.service";
import { RoutingConstants } from "../../../../routing/RoutingConstants";
import { useNavigate } from "react-router-dom";

type ChapterLessonsListProps = {
    chapterId: number;
    initialLessons: Lesson[];
};

const ChapterLessonsList: FC<ChapterLessonsListProps> = ({ chapterId, initialLessons }) => {
    const [showLessonForm, setShowLessonForm] = useState(false);
    const [lessons, setLessons] = useState<Lesson[]>(initialLessons);
    const [orderChanged, setOrderChanged] = useState(false);
    const [updateLessonsOrder, { isLoading, isError, isSuccess }] = useUpdateLessonsOrderMutation();
    const navigate = useNavigate();

    const moveLesson = (dragIndex: number, hoverIndex: number) => {
        const draggedLesson = lessons[dragIndex];
        const newLessons = [...lessons];
        newLessons.splice(dragIndex, 1);
        newLessons.splice(hoverIndex, 0, draggedLesson);

        const updatedLessons = newLessons.map((lesson, index) => ({
            ...lesson,
            lessonNumber: index + 1,
        }));

        console.log(updatedLessons);
        setLessons(updatedLessons);
        setOrderChanged(true);
    };

    const handleUpdateLessonOrder = () => {
        const lessonIds = lessons.map((lesson, index) => {
            return {
                id: lesson.id,
                lessonNumber: index + 1
            }
        });
        console.log(lessonIds);
        updateLessonsOrder({ lessonIds: lessonIds });
    }

    useEffect(() => {
        if(isSuccess) {
            setOrderChanged(false);
        }
    }, [isSuccess])

    const LessonListItem: React.FC<{ lesson: Lesson; index: number }> = ({ lesson, index }) => {
        const [{ isDragging }, drag] = useDrag({
            type: 'lesson',
            item: { type: 'lesson', index },
            collect: (monitor) => ({
                isDragging: monitor.isDragging(),
            }),
        });

        const [, drop] = useDrop({
            accept: 'lesson',
            hover: (item: any) => {
                const dragIndex = item.index;
                const hoverIndex = index;

                if (dragIndex === hoverIndex) {
                    return;
                }

                moveLesson(dragIndex, hoverIndex);
                item.index = hoverIndex;
            },
        });

        const opacity = isDragging ? 0.5 : 1;

        return (
            <>
                <li ref={(node) => drag(drop(node))} className={`opacity-${opacity * 100}`}>
                    <div className="bg-white rounded-lg shadow-md p-3">
                        <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center">
                                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5s-GdgH4XPlGIDoQcZDMiSh32oN2TmPgz0mGoevc6Ow&s" alt="Lesson Thumbnail" className="w-12 h-12 rounded-full mr-2" />
                                <h2 className="text-md font-semibold">{lesson.title}</h2>
                            </div>
                            <div className="flex items-center gap-2">
                                <Button size="xs" color="info" className="text-black" onClick={() => navigate(RoutingConstants.LESSON_EDITION.replace(':lessonId', lesson.id.toString()))}>
                                    Edytuj
                                </Button>
                                <Button size="xs" color="error">
                                    Usuń
                                </Button>
                            </div>
                        </div>
                        <div className="flex justify-between items-center">
                            <p className="text-sm text-gray-500">{`Lekcja ${lesson.lessonNumber}`}</p>
                            <p className="text-sm text-gray-500">{`${lesson.durationMinutes} min`}</p>
                        </div>
                    </div>
                </li>
            </>

        );
    };

    const toggleLessonForm = () => {
        setShowLessonForm(!showLessonForm);
    }

    return (
        <div>
            <ul className="flex flex-col gap-3 rounded-lg mb-3">
                {lessons.map((lesson, index) => (
                    <LessonListItem key={lesson.id} lesson={lesson} index={index} />
                ))}
            </ul>
            <div className="flex gap-3">
                <Button color="secondary" onClick={toggleLessonForm}>Dodaj nową lekcję</Button>
                {
                    orderChanged ? (
                        <Button color="primary" onClick={handleUpdateLessonOrder} isProcessing={isLoading}>Zapisz zmiany kolejności</Button>
                    ) : null
                }
            </div>
            {
                showLessonForm ? (
                    <CreateLessonForm chapterId={chapterId} />
                ) : null
            }
            {
                    isSuccess ? (
                        <Toast>
                            <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-green-100 text-green-500 dark:bg-green-800 dark:text-green-200">
                                <HiCheck className="h-5 w-5" />
                            </div>
                            <div className="ml-3 text-sm font-normal">Kolejność lekcji w rozdziale zmieniona</div>
                            <Toast.Toggle />
                        </Toast>
                    ) : null
                }
                {
                    isError ? (
                        <Toast>
                            <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-red-100 text-red-500 dark:bg-red-800 dark:text-red-200">
                                <HiX className="h-5 w-5" />
                            </div>
                            <div className="ml-3 text-sm font-normal">Nie udało się zmienic kolejności w rozdziale</div>
                            <Toast.Toggle />
                        </Toast>
                    ) : null
                }
        </div>
    );
};

export default ChapterLessonsList;

