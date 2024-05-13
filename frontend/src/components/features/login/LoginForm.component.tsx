import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z, object } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { TextInput, Button } from 'flowbite-react';
import { useSignInMutation } from '../../../api/api.service';
import { useDispatch } from 'react-redux';
import { setAuthenticationData } from '../../../redux/authentication/Authentication.slice';
import { useNavigate } from 'react-router-dom';
import { RoutingConstants } from '../../../routing/RoutingConstants';

const schema = object({
    email: z.string().email({ message: "Wprowadź adres email" }),
    password: z.string().min(1, { message: "Wprowadź hasło" }),
});

type FormValues = z.infer<typeof schema>;

const LoginForm = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<FormValues>({
        resolver: zodResolver(schema),
    });
    const [signIn, { data, isError, isLoading }] = useSignInMutation();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onSubmit = (data: FormValues) => {
        signIn(data)
        console.log(data);
    };

    useEffect(() => {
        if (data) {
            dispatch(setAuthenticationData(data));
            navigate(RoutingConstants.DASHBOARD);
        }
    }, [data])

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
                placeholder='hasło' 
                type="password" 
                {...register('password')} 
                color={errors.password?.message ? 'failure' : 'primary'} 
                helperText={errors.password?.message ? <span className="text-error">{errors.password.message}</span> : ''}
            />
            <Button 
                type="submit" 
                color="primary"
                isProcessing={isLoading}
            >
                Zarejestruj się
            </Button>
            {
                isError ? (
                    <span className="text-error">Wystąpił błąd!</span>
                ) : null
            }
        </form>
    );
};

export default LoginForm;
