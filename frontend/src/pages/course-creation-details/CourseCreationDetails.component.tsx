import { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDisableAssistantMutation, useEnableAssistantMutation, useLazyGetAssistantQuery, useLazyGetCourseDetailsQuery } from "../../api/api.service";
import { Accordion, AccordionContent, AccordionTitle, Alert, Button, Checkbox, Label, Modal, Spinner } from "flowbite-react";
import ChapterLessonsList from "../../components/features/course-management/lesson-management/ChapterLessonsList.component";
import CreateChapterForm from "../../components/features/course-management/CreateChapterForm.component";
import CourseDetails from "../../components/features/course-management/course-details/CourseDetails.component";
import { HiInformationCircle } from "react-icons/hi";

const CourseCreationDetails: FC = () => {
    const { courseId } = useParams<{ courseId: string }>();

    const [getAssistant, { data: assistant, isLoading: assistantLoading, isError: assistantError, isSuccess: assistantSuccess }] = useLazyGetAssistantQuery();
    const [getCourseDetails, { data, isLoading, isError, isSuccess }] = useLazyGetCourseDetailsQuery();
    const [enableAssistant] = useEnableAssistantMutation();
    const [disableAssistant] = useDisableAssistantMutation();
    const [showChapterForm, setShowChapterForm] = useState(false);

    const [isChecked, setIsChecked] = useState(false)

    const toggleChapterForm = () => {
        setShowChapterForm(!showChapterForm);
    }

    const toggleAssistant = () => {
        if (!courseId) {
            return;
        }
        if (isChecked) {
            disableAssistant(courseId);
          } else {
            enableAssistant(courseId);
          }
          setIsChecked(!isChecked);
    }

    useEffect(() => {
        if (courseId) {
            getCourseDetails(parseInt(courseId));
            getAssistant(courseId);
        }
    }, [courseId])

    useEffect(() => {
        if (assistant) {
            setIsChecked(assistant.enabled)
        }
    }, [assistant])

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
            <div className="mt-2 flex flex-col gap-2 mb-5">
                <h1 className="text-2xl">Asystenci AI</h1>
                <Alert
                    color="success"
                    icon={HiInformationCircle}
                    rounded
                >
                    Włączenie tej funkcji sprawi, że ten kurs będzie udostępniał funkcjonalność chatu z asystentem AI z dołączoną bazą wiedzy wygenerowaną na podstawie treści tego kursu
                </Alert>
                {
                    assistant || assistantError ? (
                        <form>
                            <Checkbox id="toggle-assistants" className="mr-2" checked={isChecked} onChange={toggleAssistant} />
                            <Label htmlFor="toggle-assistants">Funkcja asystenta AI</Label>
                        </form>
                    ) : null
                }

            </div>
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