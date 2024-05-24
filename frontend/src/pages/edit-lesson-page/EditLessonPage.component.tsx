import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Button, FileInput, Label, Spinner, TextInput, Textarea } from "flowbite-react";
import { useLazyGetLessonByIdQuery } from "../../api/api.service";

// TODO add markdown editor
const EditLessonPage = () => {
    const params = useParams<{ lessonId: string }>();
    const lessonId = params.lessonId;

    useEffect(() => {
        if (lessonId) {
            getLesson(parseInt(lessonId));
        }
    }, [lessonId]);

    const [getLesson, { data: lesson, isLoading, isError }] = useLazyGetLessonByIdQuery();

    // TODO hangle upload to s3
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        console.log(file?.name);
    };


    return (
        <>
            {
                lesson && (
                    <div className="mx-auto p-6 bg-white shadow-md rounded-lg">
                        <h1 className="text-2xl font-bold mb-4">Edit Lesson</h1>
                        <form className="space-y-4">
                            <div>
                                <Label htmlFor="title" className="block text-gray-700">Tytuł lekcji</Label>
                                <TextInput
                                    id="title"
                                    type="text"
                                    className="mt-1"
                                    defaultValue={lesson.title}
                                />
                            </div>
                            <div>
                                <Label htmlFor="videoUrl" className="block text-gray-700">Materiał wideo</Label>
                                <FileInput
                                    id="videoUrl"
                                    className="mt-1"
                                    onChange={handleFileChange}
                                />
                                {lesson.videoUrl && (
                                    <video controls className="mt-2 w-full">
                                        <source src={lesson.videoUrl} type="video/mp4" />
                                        Your browser does not support the video tag.
                                    </video>
                                )}
                            </div>
                            <div>
                                <Label htmlFor="content" className="block text-gray-700">Treść</Label>
                                <Textarea
                                    id="content"
                                    className="mt-1"
                                    defaultValue={lesson.content}
                                />
                            </div>
                            <div className="flex justify-end">
                                <Button type="submit" color="primary">
                                    Zapisz zmiany
                                </Button>
                            </div>
                        </form>
                    </div>
                )
            }
            {
                isLoading && <Spinner />
            }
            {
                isError && <div className="text-error">Wystąpił błąd podczas pobierania danych</div>
            }
        </>

    )
}

export default EditLessonPage;