import { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useLazyGetCourseDetailsQuery } from "../../api/api.service";
import { Accordion, AccordionContent, AccordionTitle, Button, Modal, Spinner } from "flowbite-react";
import ChapterLessonsList from "../../components/features/course-management/lesson-management/ChapterLessonsList.component";
import CreateChapterForm from "../../components/features/course-management/CreateChapterForm.component";
import CourseDetails from "../../components/features/course-management/course-details/CourseDetails.component";

const CourseCreationDetails: FC = () => {
    const { courseId } = useParams<{ courseId: string }>();

    const [getCourseDetails, { data, isLoading, isError, isSuccess }] = useLazyGetCourseDetailsQuery();
    const [showChapterForm, setShowChapterForm] = useState(false);

    const toggleChapterForm = () => {
        setShowChapterForm(!showChapterForm);
    }

    useEffect(() => {
        if (courseId) {
            getCourseDetails(parseInt(courseId));
        }
    }, [courseId])

    return (
        <div className="pb-5">
            <h1 className="text-4xl mb-6">Dodaj rozdziały i lekcje do twojego kursu</h1>
            {
                isSuccess && data ? (
                    <>
                        <CourseDetails course={data} />

                        <Accordion className="mb-4">
                            {
                                data.chapters.map(chapter => (
                                    <Accordion.Panel >
                                        <AccordionTitle className="p-3 bg-primary hover:bg-primary-light text-base-100">
                                            <div>
                                                <h2 className="text-lg font-semibold">{chapter.title}</h2>
                                            </div>
                                            <span className="text-base mr-10">Łączny czas trwania: {chapter.totalDurationMinutes} minut</span>
                                            <span className="text-base">Liczba lekcji: {chapter.lessons.length}</span>
                                        </AccordionTitle>
                                        <AccordionContent>
                                            <ChapterLessonsList chapterId={chapter.id} initialLessons={chapter.lessons} />
                                        </AccordionContent>
                                    </Accordion.Panel>
                                ))
                            }
                        </Accordion>
                        {/* {
                            showChapterForm ? (
                                <CreateChapterForm courseId={data.id} />
                            ) : null
                        } */}
                        <Modal
                            show={showChapterForm}
                            size="lg"
                            popup={true}
                            onClose={() => setShowChapterForm(false)}
                        >
                            <Modal.Header>
                                Dodaj nowy rozdział
                            </Modal.Header>
                            <Modal.Body>
                                <CreateChapterForm courseId={data.id} />                            
                            </Modal.Body>
                            <Modal.Footer>
                                <Button
                                    onClick={() => setShowChapterForm(false)}
                                    color={'secondary'}
                                    outline
                                >
                                    Anuluj
                                </Button>
                            </Modal.Footer>
                        </Modal>
                    </>

                ) : null
            }
            <Button color="primary" onClick={toggleChapterForm}>Dodaj nowy rozdział</Button>
            {
                isLoading && <Spinner></Spinner>
            }
            {
                isError ? (
                    <span className="text-error">Wystąpił błąd</span>
                ) : null
            }
        </div>
    )
}

export default CourseCreationDetails;