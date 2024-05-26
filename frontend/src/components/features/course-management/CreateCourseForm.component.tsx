import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z, object } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { TextInput, Button, Textarea, FileInput, Label } from 'flowbite-react';
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
    const { register, handleSubmit, setValue, formState: { errors } } = useForm<CreateCourseDTO>({
        resolver: zodResolver(schema),
    });
    const [createNewCourse, { isError, isLoading, isSuccess }] = useCreateNewCourseMutation();
    const navigate = useNavigate();

    const onSubmit = (data: CreateCourseDTO) => {
        createNewCourse(data);
        console.log(data);
    };

    useEffect(() => {
        if (isSuccess) {
            navigate(RoutingConstants.COURSE_CREATION_DETAILS);
        }
    }, [isSuccess]);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const mockUrl = "https://con.jaktestowac.pl/wp-content/uploads/API/title-pages/api6-1.jpg";
            setValue('thumbnail', mockUrl);
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
