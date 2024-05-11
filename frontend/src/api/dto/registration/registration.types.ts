export type UserRegistrationDetails = {
    email: string,
    firstName: string,
    lastName: string,
    password: string
}

export type RegistrationResponse = {
    user: UserRegistrationDetails,
    accessToken: string
}