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

type FormValues = z.infer<typeof schema>;

const RegistrationForm = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<FormValues>({
        resolver: zodResolver(schema),
    });
    const [createUser] = useCreateUserMutation();

    const onSubmit = (data: FormValues) => {
        createUser(data)
        console.log(data);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2 w-1/2 p-5 rounded-lg bg-base-100 bg-opacity-90">
            <TextInput 
                placeholder='Email' 
                type="email" 
                {...register('email')} 
                color={errors.email?.message ? 'failure' : 'primary'}
                helperText={errors.email?.message ? <span className="text-error">{errors.email.message}</span> : ''}
            />
            <TextInput 
                placeholder='Imię' 
                type="text" 
                {...register('firstName')} 
                color={errors.firstName?.message ? 'failure' : 'primary'} 
                helperText={errors.firstName?.message ? <span className="text-error">{errors.firstName.message}</span> : ''}
            />
            <TextInput 
                placeholder='nazwisko' 
                type="text" {...register('lastName')} 
                color={errors.lastName?.message ? 'failure' : 'primary'} 
                helperText={errors.lastName?.message ? <span className="text-error">{errors.lastName.message}</span> : ''}
            />
            <TextInput 
                placeholder='hasło' 
                type="password" 
                {...register('password')} 
                color={errors.password?.message ? 'failure' : 'primary'} 
                helperText={errors.password?.message ? <span className="text-error">{errors.password.message}</span> : ''}
            />
            <Button type="submit" color="primary">Zarejestruj się</Button>
        </form>
    );
};

export default RegistrationForm;
