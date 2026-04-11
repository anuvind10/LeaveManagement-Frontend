export type LeaveType = "Annual" | "Sick" | "Unpaid" | "Maternity" | "Paternity";
export type LeaveStatus = "Pending" | "Approved" | "Rejected" | "Canceled";
export type SortField = "SubmittedDate" | "NoOfDays";
export type SortDirection = "Ascending" | "Descending";

export type LeaveRequest = {
    id: string;
    submittedDate: string;
    employeeId: number;
    leaveType: LeaveType;
    startDate: string;
    endDate: string;
    noOfDays: number;
    reason: string;
    leaveStatus: LeaveStatus;
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

