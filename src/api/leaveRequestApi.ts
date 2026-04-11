import type { CreateLeaveRequestPayload, LeaveRequest, LeaveRequestSummary, PaginatedResponse, LeaveRequestQueryParams } from "@/types/leaveRequest"
import api from "./axiosInstance"

export async function submitLeaveRequest(data: CreateLeaveRequestPayload): Promise<LeaveRequest> {
    const response = await api.post("/api/v1LeaveRequest", data);
    return response.data;
}

export async function getAll(params?: LeaveRequestQueryParams): Promise<PaginatedResponse<LeaveRequestSummary>> {
    const response = await api.get("/api/v1LeaveRequest", {
        params: params
    });

    return response.data;
}

export async function getById(id: string): Promise<LeaveRequest> {
    const response = await api.get(`/api/v1LeaveRequest/${id}`);
    return response.data;
}

export async function getByEmployeeId(id: string, params?: LeaveRequestQueryParams): Promise<PaginatedResponse<LeaveRequestSummary>> {
    const response = await api.get(`/api/v1LeaveRequest/employee/${id}`, {
        params: params
    });

    return response.data;
}

export async function approve(id: string): Promise<LeaveRequest> {
    const response = await api.put(`/api/v1LeaveRequest/${id}/approve`);
    return response.data;
}

export async function reject(id: string): Promise<LeaveRequest> {
    const response = await api.put(`/api/v1LeaveRequest/${id}/reject`);
    return response.data;
}

export async function cancel(id: string): Promise<LeaveRequest> {
    const response = await api.put(`/api/v1LeaveRequest/${id}/cancel`);
    return response.data;
}