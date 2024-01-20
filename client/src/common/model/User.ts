export interface UserResponse {
    id: number;
    email: string;
    firstName: string;
    lastName: string;
    mobile: number
}

export interface RegisterUserRequest extends Omit<UserResponse, "id"> {
    password: string;
    passwordConfirmation: string;
}
