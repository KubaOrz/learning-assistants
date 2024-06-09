import { useForm } from 'react-hook-form';
import { z, object } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { TextInput, Button, Textarea, FileInput, Label, Progress } from 'flowbite-react';
import { CreateCourseDTO } from '../../../api/dto/courses/courses.types';
import { useCreateNewCourseMutation } from '../../../api/api.service';
import useUploadMedia from '../../../hooks/useUploadMedia';

const schema = object({
    title: z.string().min(1, { message: "Wprowadź tytuł kursu" }),
    thumbnail: z.string().min(1, { message: "Wprowadź prawidłowy URL miniaturki" }),
    shortDescription: z.string().min(1, { message: "Wprowadź krótki opis kursu" }),
    longDescription: z.string().min(1, { message: "Wprowadź długi opis kursu" }),
});

const CreateCourseForm = () => {
    const { register, handleSubmit, setValue, formState: { errors } } = useForm<CreateCourseDTO>({
        resolver: zodResolver(schema),
    });
    const [createNewCourse, { isError, isLoading }] = useCreateNewCourseMutation();
    const { uploadMedia, uploadProgress, isUploading } = useUploadMedia();

    const onSubmit = (data: CreateCourseDTO) => {
        createNewCourse(data);
    };

    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const objectKey = await uploadMedia(file);
            if (objectKey) setValue('thumbnail', `${import.meta.env.VITE_CLOUDFRONT_URL}/${objectKey}`)
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 w-full p-5 rounded-lg bg-base-100 bg-opacity-90">
            <div>
                <Label htmlFor="title" className="block text-gray-700">Tytuł kursu</Label>
                <TextInput 
                    id="title"
                    placeholder='Tytuł kursu' 
                    type="text" 
                    {...register('title')} 
                    color={errors.title?.message ? 'failure' : 'primary'}
                    helperText={errors.title?.message ? <span className="text-error">{errors.title.message}</span> : ''}
                />
            </div>
            <div>
                <Label htmlFor="thumbnail" className="block text-gray-700">Miniaturka</Label>
                <FileInput 
                    id="thumbnail"
                    className="mt-1"
                    onChange={handleFileChange}
                    color={errors.thumbnail?.message ? 'failure' : 'primary'}
                    helperText={errors.thumbnail?.message ? <span className="text-error">{errors.thumbnail.message}</span> : ''}
                />
                {
                    isUploading && (
                        <Progress progress={uploadProgress} color="Green" className='w-full mt-2' />
                    )
                }
            </div>
            <div>
                <Label htmlFor="shortDescription" className="block text-gray-700">Krótki opis</Label>
                <Textarea 
                    id="shortDescription"
                    placeholder='Krótki opis kursu' 
                    {...register('shortDescription')} 
                    color={errors.shortDescription?.message ? 'failure' : 'primary'} 
                    helperText={errors.shortDescription?.message ? <span className="text-error">{errors.shortDescription.message}</span> : ''}
                />
            </div>
            <div>
                <Label htmlFor="longDescription" className="block text-gray-700">Długi opis</Label>
                <Textarea 
                    id="longDescription"
                    placeholder='Długi opis kursu' 
                    {...register('longDescription')} 
                    color={errors.longDescription?.message ? 'failure' : 'primary'} 
                    helperText={errors.longDescription?.message ? <span className="text-error">{errors.longDescription.message}</span> : ''}
                />
            </div>
            <Button 
                type="submit" 
                color="primary"
                isProcessing={isLoading}
                disabled={isUploading}
            >
                Dodaj kurs
            </Button>
            {
                isError ? (
                    <span className="text-error">Nie udało się utworzyć nowego kursu!</span>
                ) : null
            }
        </form>
    );
};

export default CreateCourseForm;
