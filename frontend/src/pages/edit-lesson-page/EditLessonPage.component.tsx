import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { Button, FileInput, Label, Progress, Spinner, TextInput, Toast } from "flowbite-react";
import { useLazyGetLessonByIdQuery, useUpdateLessonMutation } from "../../api/api.service";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useForm, Controller } from 'react-hook-form';
import { HiCheck, HiX } from "react-icons/hi";
import useUploadMedia from "../../hooks/useUploadMedia";

const editorModules = {
    toolbar: [
        [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
        [{ size: [] }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [{ 'list': 'ordered' }, { 'list': 'bullet' },
        { 'indent': '-1' }, { 'indent': '+1' }],
        ['link', 'image', 'video'],
        ['clean']
    ],
};

const EditLessonPage = () => {
    const { lessonId } = useParams<{ lessonId: string }>();
    const [getLesson, { data: lesson, isLoading, isError }] = useLazyGetLessonByIdQuery();
    const { register, handleSubmit, control, setValue, getValues } = useForm();
    const [editorValue, setEditorValue] = useState('');
    const { uploadMedia, uploadProgress, isUploading } = useUploadMedia();
    const [updateLesson, { isLoading: isUpdating, isError: updateError, isSuccess: updateSuccess }] = useUpdateLessonMutation();
    const quillRef = useRef<ReactQuill>(null);

    useEffect(() => {
        if (lessonId) {
            getLesson(parseInt(lessonId));
        }
    }, [lessonId]);

    useEffect(() => {
        if (lesson) {
            setValue('title', lesson.title);
            setValue('content', lesson.content);
            setValue('videoUrl', lesson.videoUrl);
            setEditorValue(lesson.content);
        }
    }, [lesson, setValue]);

    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const objectKey = await uploadMedia(file);
            if (objectKey) setValue('videoUrl', `${import.meta.env.VITE_CLOUDFRONT_URL}/${objectKey}`)
        }
    };

    const onSubmit = (data: any) => {
        if (lessonId) {
            updateLesson({ lessonId: parseInt(lessonId), lessonData: data })
        }
    };

    const handleImageUpload = () => {
        const input = document.createElement('input');
        input.setAttribute('type', 'file');
        input.setAttribute('accept', 'image/*');
        input.click();

        input.onchange = async () => {
            const file = input.files ? input.files[0] : null;
            if (file) {
                const objectKey = await uploadMedia(file);
                const quill = quillRef.current?.getEditor();
                if (!quill) return;
                const range = quill.getSelection();
                if (!range) return;
                quill.insertEmbed(range.index, 'image', `${import.meta.env.VITE_CLOUDFRONT_URL}/${objectKey}`);
            }
        };
    };

    useEffect(() => {
        if (quillRef.current) {
            const editor = quillRef.current.getEditor();
            editor.getModule('toolbar').addHandler('image', handleImageUpload);
        }
    })

    return (
        <>
            {
                lesson && (
                    <div className="mx-auto p-6 bg-white shadow-md rounded-lg">
                        <h1 className="text-2xl font-bold mb-4">Edytuj lekcję</h1>
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                            <div>
                                <Label htmlFor="title" className="block text-gray-700">Tytuł lekcji</Label>
                                <TextInput
                                    id="title"
                                    type="text"
                                    className="mt-1"
                                    {...register('title')}
                                />
                            </div>
                            <div>
                                <Label htmlFor="videoUrl" className="block text-gray-700">Materiał wideo</Label>
                                <FileInput
                                    id="videoUrl"
                                    className="mt-1"
                                    onChange={handleFileChange}
                                />
                                {
                                    isUploading && (
                                        <Progress progress={uploadProgress} color="purple" className='w-full mt-2' />
                                    )
                                }
                                {getValues('videoUrl') && (
                                    <video controls className="mt-2 w-full">
                                        <source src={getValues('videoUrl')} type="video/mp4" />
                                        Your browser does not support the video tag.
                                    </video>
                                )}
                            </div>
                            <div>
                                <Label htmlFor="content" className="block text-gray-700">Treść</Label>
                                <Controller
                                    name="content"
                                    control={control}
                                    defaultValue={lesson.content}
                                    render={({ field }) => (
                                        <ReactQuill
                                            ref={quillRef}
                                            theme="snow"
                                            value={editorValue}
                                            onChange={(value) => {
                                                field.onChange(value);
                                                setEditorValue(value);
                                            }}
                                            modules={editorModules}
                                            className="h-[80vh] mb-16"
                                        />
                                    )}
                                />
                            </div>
                            <div className="flex justify-end">
                                <Button type="submit" color="primary" isProcessing={isUpdating} disabled={isUploading}>
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
            <div className="fixed bottom-0 left-0 m-4">
                {
                    updateSuccess ? (
                        <Toast>
                            <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-green-100 text-green-500 dark:bg-green-800 dark:text-green-200">
                                <HiCheck className="h-5 w-5" />
                            </div>
                            <div className="ml-3 text-sm font-normal">Zmiany zostały zapisane</div>
                            <Toast.Toggle />
                        </Toast>
                    ) : null
                }
                {
                    updateError ? (
                        <Toast>
                            <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-red-100 text-red-500 dark:bg-red-800 dark:text-red-200">
                                <HiX className="h-5 w-5" />
                            </div>
                            <div className="ml-3 text-sm font-normal">Nie udało się zapisać zmian</div>
                            <Toast.Toggle />
                        </Toast>
                    ) : null
                }
            </div>
        </>
    )
}

export default EditLessonPage;
