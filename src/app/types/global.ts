import { ROLE } from "@prisma/client"

export type TAuthUser = {
    id: string,
    email: string,
    role: ROLE,
    iat: number,
    exp: number
}