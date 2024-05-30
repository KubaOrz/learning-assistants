import { FC } from "react";
import { Course, CreateCourseDTO } from "../../../../api/dto/courses/courses.types";
import { useForm } from "react-hook-form";
import { Button, FileInput, Label, Progress, TextInput, Textarea, Toast } from "flowbite-react";
import { useUpdateBasicCourseInfoMutation } from "../../../../api/api.service";
import { HiCheck, HiX } from "react-icons/hi";
import useUploadMedia from "../../../../hooks/useUploadMedia";

type CourseDetailsProps = {
    course: Course;
};

const CourseDetails: FC<CourseDetailsProps> = ({ course }) => {
    const { register, handleSubmit, setValue } = useForm({
        defaultValues: {
            title: course.title,
            shortDescription: course.shortDescription,
            longDescription: course.longDescription,
            thumbnail: course.thumbnail
        }
    });
    const [updateCourseBasicInfo, { isError, isSuccess }] = useUpdateBasicCourseInfoMutation();
    const { uploadMedia, uploadProgress, isUploading } = useUploadMedia();

    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const objectKey = await uploadMedia(file);
            if (objectKey) setValue('thumbnail', `${import.meta.env.VITE_CLOUDFRONT_URL}/${objectKey}`)
        }
    };

    const onSubmit = (data: CreateCourseDTO) => {
        console.log(data);
        updateCourseBasicInfo({ courseId: course.id, courseData: data });
    };

    return (
        <div className="mx-auto p-6 bg-white shadow-md rounded-lg mb-4">
            <h1 className="text-2xl font-bold mb-4">Podstawowe informacje</h1>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                    <Label htmlFor="title" className="block text-gray-700">Nazwa kursu</Label>
                    <TextInput
                        id="title"
                        type="text"
                        className="mt-1"
                        {...register('title')}
                    />
                </div>
                <div>
                    <Label htmlFor="shortDescription" className="block text-gray-700">Krótki opis</Label>
                    <Textarea
                        id="shortDescription"
                        className="mt-1"
                        {...register('shortDescription')}
                    />
                </div>
                <div>
                    <Label htmlFor="thumbnail" className="block text-gray-700">Miniaturka kursu</Label>
                    <FileInput
                        id="thumbnail"
                        className="mt-1"
                        onChange={handleFileChange}
                    />
                    {course.thumbnail && <img src={course.thumbnail} alt="Thumbnail Preview" className="mt-2 w-24 h-24 object-cover" />}
                    {
                        isUploading && (
                            <Progress progress={uploadProgress} color="Green" className='w-full mt-2' />
                        )
                    }
                </div>
                <div>
                    <Label htmlFor="longDescription" className="block text-gray-700">Dłuższy opis</Label>
                    <Textarea
                        id="longDescription"
                        className="mt-1"
                        {...register('longDescription')}
                        rows={5}
                    />
                </div>
                <div>
                    <Label htmlFor="createdAt" className="block text-gray-700">Data utworzenia</Label>
                    <span className="text-sm">{(new Date(course.createdAt)).toLocaleDateString()}</span>
                </div>
                <div>
                    <Label htmlFor="updatedAt" className="block text-gray-700">Data ostatniej modyfikacji</Label>
                    <span className="text-sm">{(new Date(course.updatedAt)).toLocaleDateString()}</span>
                </div>
                <div className="flex justify-end">
                    <Button type="submit" color="primary">
                        Zapisz zmiany
                    </Button>
                </div>
            </form>
            <div className="fixed bottom-0 left-0 m-4">
                {
                    isSuccess ? (
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
                    isError ? (
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
        </div>
    );
}

export default CourseDetails;
