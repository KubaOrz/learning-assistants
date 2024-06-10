import React, { FC } from "react";
import LoginForm from "../../components/features/login/LoginForm.component";

const LoginPage: FC = () => {
    return (
        <div className="flex flex-col gap-4 items-center p-5 min-hh-[500px] rounded-2xl"  style={{backgroundImage: 'url("src/assets/form_background.jpeg")'}}>
                <h1 className="text-2xl text-center bg-primary text-base-100 bg-opacity-70 p-5 rounded-xl w-full">Zaloguj się, aby w pełni korzystać z serwisu!</h1>
                <LoginForm />
        </div>
    )
}

export default LoginPage;