import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z, object } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { TextInput, Button, Textarea } from 'flowbite-react';
import { useNavigate } from 'react-router-dom';
import { CreateCourseDTO } from '../../../api/dto/courses/courses.types';
import { useCreateNewCourseMutation } from '../../../api/api.service';
import { RoutingConstants } from '../../../routing/RoutingConstants';

const schema = object({
    title: z.string().min(1, { message: "Wprowadź tytuł kursu" }),
    thumbnail: z.string().url({ message: "Wprowadź prawidłowy URL miniaturki" }),
    shortDescription: z.string().min(1, { message: "Wprowadź krótki opis kursu" }),
    longDescription: z.string().min(1, { message: "Wprowadź długi opis kursu" }),
});

const CreateCourseForm = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<CreateCourseDTO>({
        resolver: zodResolver(schema),
    });
    const [createNewCourse, { isError, isLoading, isSuccess }] = useCreateNewCourseMutation();
    const navigate = useNavigate();

    const onSubmit = (data: CreateCourseDTO) => {
        createNewCourse(data)
        console.log(data);
    };

    useEffect(() => {
        if (isSuccess) {
            navigate(RoutingConstants.COURSE_CREATION_DETAILS)
        }
    }, [isSuccess]);

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2 w-1/2 p-5 rounded-lg bg-base-100 bg-opacity-90">
            <TextInput 
                placeholder='Tytuł kursu' 
                type="text" 
                {...register('title')} 
                color={errors.title?.message ? 'failure' : 'primary'}
                helperText={errors.title?.message ? <span className="text-error">{errors.title.message}</span> : ''}
            />
            <TextInput 
                placeholder='URL miniaturki' 
                type="text" 
                {...register('thumbnail')} 
                color={errors.thumbnail?.message ? 'failure' : 'primary'}
                helperText={errors.thumbnail?.message ? <span className="text-error">{errors.thumbnail.message}</span> : ''}
            />
            <Textarea 
                placeholder='Krótki opis kursu' 
                {...register('shortDescription')} 
                color={errors.shortDescription?.message ? 'failure' : 'primary'} 
                helperText={errors.shortDescription?.message ? <span className="text-error">{errors.shortDescription.message}</span> : ''}
            />
            <Textarea 
                placeholder='Długi opis kursu' 
                {...register('longDescription')} 
                color={errors.longDescription?.message ? 'failure' : 'primary'} 
                helperText={errors.longDescription?.message ? <span className="text-error">{errors.longDescription.message}</span> : ''}
            />
            <Button 
                type="submit" 
                color="primary"
                isProcessing={isLoading}
            >
                Dodaj kurs
            </Button>
            {
                errors && (
                    <span className="text-error">Wystąpiły błędy w formularzu!</span>
                )
            }
            {
                isError ? (
                    <span className="text-error">Nie udało się utworzyć nowego kursu!</span>
                ) : null
            }
        </form>
    );
};

export default CreateCourseForm;
