import { ROLE } from "@prisma/client"

export type TAuthUser = {
    user_id: string,
    email: string,
    role: ROLE,
    iat: number,
    exp: number
}

export type TPaginationOptions = {
    page?: number;
    limit?: number;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
};