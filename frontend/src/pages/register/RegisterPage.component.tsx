import React, { FC } from "react";
import RegistrationForm from "../../components/features/registration/RegistrationForm.component";

const RegisterPage: FC = () => {
    return (
        <div className="flex flex-col gap-4">
            <h1 className="text-2xl text-center">Załóż konto, aby w pełni korzystać z serwisu!</h1>
            <RegistrationForm />
        </div>
    )
}

export default RegisterPage;