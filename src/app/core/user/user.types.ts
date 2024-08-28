export interface User {
    id: string;
    name: string;
    email: string;
    avatar?: string;
    status?: string;
    phone?: string;
    address?: string;
}

export interface SystemUser {
    id: string;
    userName: string;
    firstName: string;
    lastName?: string;
    email?: string;
    phoneNumber?: string;
    role?: string;
    Address?: string;
    avatar?: string;
    status?: string;
}