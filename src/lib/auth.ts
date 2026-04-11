import type { AuthUser, Role } from "@/types/auth";
import { jwtDecode } from "jwt-decode";

interface JwtPayload {
    "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier": string;
    "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name": string;
    "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress": string;
    "http://schemas.microsoft.com/ws/2008/06/identity/claims/role": Role;
}


export function decodeToken(token: string): AuthUser {
    const decoded = jwtDecode<JwtPayload>(token);
    return {
        userId: decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"],
        userName: decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"],
        email: decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"],
        role: decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"],
    };
}
