export type LoginRequest = {
    email: string;
    password: string;
}

export type Role = "HR" | "Manager" | "Employee";

export type AuthUser = {
    userId: string;
    userName: string;
    email: string;
    role: Role;
}