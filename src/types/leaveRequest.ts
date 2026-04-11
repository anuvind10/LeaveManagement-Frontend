export type LeaveType = "Annual" | "Sick" | "Unpaid" | "Maternity" | "Paternity";
export type LeaveStatus = "Pending" | "Approved" | "Rejected" | "Canceled";
export type LeaveAction = "Approved" | "Rejected" | "Canceled";
export type SortField = "SubmittedDate" | "NoOfDays";
export type SortDirection = "Ascending" | "Descending";

export type LeaveRequest = {
    id: string;
    submittedDate: string;
    startDate: string;
    endDate: string;
    leaveType: LeaveType;
    noOfDays: number;
    reason?: string;
    leaveStatus: LeaveStatus;
    leaveAudits: LeaveAudit[];
}

export type LeaveRequestSummary = {
    id: string;
    leaveType: LeaveType;
    noOfDays: number;
    reason?: string;
    leaveStatus: LeaveStatus;
}

export type CreateLeaveRequestPayload = {
    leaveType: LeaveType;
    startDate: string;
    endDate: string;
    reason?: string;
}

export type LeaveAudit = {
    auditId: string;
    auditorId: number;
    processDateTime: string;
    comments?: string;
    action: LeaveAction;
}

export type LeaveRequestQueryParams = {
    page?: number;
    pageSize?: number;
    field?: SortField;
    direction?: SortDirection;
    status?: LeaveStatus;
    type?: LeaveType;
    fromDate?: string;
    toDate?: string;
}

export type PaginatedResponse<T> = {
    items: T[];
    totalCount: number;
    page: number;
    pageSize: number;
    totalPages: number;
}

export type ApiError = {
    title: string;
    status: number;
    detail: string;
    errors?: Record<string, string[]>;
}

