export interface UserCredentials
{
    username: string;
    password: string;
}

export interface User extends UserCredentials
{
    name: string;
    email: string;
}
