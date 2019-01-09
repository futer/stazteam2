export interface IUser {
    email: string;
    name: string;
    surname: string;
    password: string;
    confirmpassword?: string;
    image?: Blob;
}
