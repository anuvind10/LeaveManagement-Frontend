import type { LoginRequest } from "@/types/auth";
import api from "./axiosInstance";

export default async function login(data: LoginRequest): Promise<string> {
    const response = await api.post("/api/Auth", data, { responseType: 'text' });
    return response.data;
}