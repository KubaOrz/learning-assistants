import { FC, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z, object } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { TextInput, Button, Textarea } from 'flowbite-react';
import { LessonBase } from '../../../api/dto/courses/courses.types';
import { useCreateNewLessonMutation } from '../../../api/api.service';

const schema = object({
    title: z.string().min(1, { message: "Wprowadź tytuł lekcji" }),
    videoUrl: z.string().url({ message: "Wprowadź prawidłowy URL wideo" }),
    content: z.string().min(1, { message: "Dodaj opis lekcji" }),
});

type CreateLessonFormProps = {
    chapterId: number;
}

// TODO create some handy editor for creating and editing lessons
const CreateLessonForm: FC<CreateLessonFormProps> = ({ chapterId }) => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm<LessonBase>({
        resolver: zodResolver(schema),
    });
    const [createNewLesson, { isError, isLoading, isSuccess }] = useCreateNewLessonMutation();

    const onSubmit = (data: LessonBase) => {
        // TODO tutaj też trzeba jakoś dodać durationMinutes, ale może to już będzie brane z backendu lepiej w jakiś sposób
        data.durationMinutes = 5;
        data.lessonNumber = 10;
        createNewLesson({ LessonData: data, chapterId: chapterId})
    };

    useEffect(() => {
        if (isSuccess) {
            reset();
        }
    });

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2 w-1/2 p-5 rounded-lg bg-base-100 bg-opacity-90">
            <TextInput 
                placeholder='Tytuł lekcji' 
                type="text" 
                {...register('title')} 
                color={errors.title?.message ? 'failure' : 'primary'}
                helperText={errors.title?.message ? <span className="text-error">{errors.title.message}</span> : ''}
            />
            <TextInput 
                placeholder='URL wideo' 
                type="text" 
                {...register('videoUrl')} 
                color={errors.videoUrl?.message ? 'failure' : 'primary'}
                helperText={errors.videoUrl?.message ? <span className="text-error">{errors.videoUrl.message}</span> : ''}
            />
            <Textarea 
                placeholder='Krótki opis kursu' 
                {...register('content')} 
                color={errors.content?.message ? 'failure' : 'primary'} 
                helperText={errors.content?.message ? <span className="text-error">{errors.content.message}</span> : ''}
            />
            <Button 
                type="submit" 
                color="primary"
                isProcessing={isLoading}
            >
                Dodaj Lekcję
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

export default CreateLessonForm;
