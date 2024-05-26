import { FC, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z, object } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { TextInput, Button } from 'flowbite-react';
import { useNavigate } from 'react-router-dom';
import { useCreateEmptyChapterMutation } from '../../../api/api.service';
import { RoutingConstants } from '../../../routing/RoutingConstants';

const schema = object({
    title: z.string().min(1, { message: "Wprowadź tytuł lekcji" }),
});

type CreateChapterFormProps = {
    courseId: number;
}

const CreateChapterForm: FC<CreateChapterFormProps> = ({ courseId }) => {
    const { register, handleSubmit, formState: { errors } } = useForm<{ title: string }>({
        resolver: zodResolver(schema),
    });
    const [createEmptyChapter, { isError, isLoading, isSuccess }] = useCreateEmptyChapterMutation();
    const navigate = useNavigate();

    const onSubmit = (data: { title: string }) => {
        createEmptyChapter({ title: data.title, courseId: courseId})
        console.log(data);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2 w-full p-5 rounded-lg bg-base-100 bg-opacity-90">
            <TextInput 
                placeholder='Tytuł rozdziału' 
                type="text" 
                {...register('title')} 
                color={errors.title?.message ? 'failure' : 'primary'}
                helperText={errors.title?.message ? <span className="text-error">{errors.title.message}</span> : ''}
            />
            <Button 
                type="submit" 
                color="primary"
                isProcessing={isLoading}
            >
                Dodaj Rozdział
            </Button>
            {
                isError ? (
                    <span className="text-error">Nie udało się utworzyć nowego rozdziału!</span>
                ) : null
            }
        </form>
    );
};

export default CreateChapterForm;
