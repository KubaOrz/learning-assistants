export type UserRegistrationDetails = {
    email: string,
    firstName: string,
    lastName: string,
    password: string
}

export type UserDetails = {
    id: number,
    email: string,
    firstName: string,
    lastName: string,
}

export type AuthenticationData = {
    user: UserDetails,
    accessToken: string
}

export type SignInRequest = {
    email: string;
    password: string;
}