import type { LoginRequest } from "@/types/auth";
import api from "./axiosInstance";

export default async function Login(data: LoginRequest): Promise<string> {
    return api.post("/api/Auth", data, {
        headers: { "Content-Type": "text/plain" }
    });
}