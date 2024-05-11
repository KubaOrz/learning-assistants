import React from 'react';
import { useForm } from 'react-hook-form';
import { z, object } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { TextInput, Button } from 'flowbite-react';
import { useCreateUserMutation } from '../../../api/ApiConfig';

const schema = object({
    email: z.string().email(),
    firstName: z.string().min(2),
    lastName: z.string().min(2),
    password: z.string().min(6),
});

type FormValues = z.infer<typeof schema>; // Definicja typu dla wartości formularza

const RegistrationForm = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<FormValues>({
        resolver: zodResolver(schema), // Używamy Zod jako resolver dla React Hook Form
    });
    const [createUser] = useCreateUserMutation();

    const onSubmit = (data: FormValues) => {
        createUser(data)
        console.log(data); // Dane formularza są poprawne, można wykonać dalszą logikę
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
            <TextInput placeholder='Email' type="email" {...register('email')} color={errors.email?.message ? 'failure' : 'primary'} />
            <TextInput placeholder='Imię' type="text" {...register('firstName')} color={errors.email?.message ? 'failure' : 'primary'} />
            <TextInput placeholder='nazwisko' type="text" {...register('lastName')} color={errors.email?.message ? 'failure' : 'primary'} />
            <TextInput placeholder='hasło' type="password" {...register('password')} color={errors.email?.message ? 'failure' : 'primary'} />
            <Button type="submit">Zarejestruj się</Button>
        </form>
    );
};

export default RegistrationForm;
