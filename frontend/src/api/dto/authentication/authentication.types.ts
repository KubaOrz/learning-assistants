export type UserRegistrationDetails = {
    email: string,
    firstName: string,
    lastName: string,
    password: string
}

export type AuthenticationData = {
    user: UserRegistrationDetails,
    accessToken: string
}

export type SignInRequest = {
    email: string;
    password: string;
}