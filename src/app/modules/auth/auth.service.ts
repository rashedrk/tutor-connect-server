import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import prisma from "../../utils/prisma";
import { TAuth } from "./auth.interface";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"
import config from "../../config/config";

const login = async (payload: TAuth) => {
    const user = await prisma.user.findUnique({
        where: {
            email: payload.email
        }
    });

    //throw error if user does not exist
    if (!user) {
        throw new AppError(httpStatus.NOT_FOUND, "User not found!");
    }

    //checking if user is deleted
    if (user.is_deleted) {
        throw new AppError(httpStatus.FORBIDDEN, "This user is deleted!")
    }

    //checking if user is blocked
    if(user.status === 'blocked'){
        throw new AppError(httpStatus.FORBIDDEN, "This use has been blocked!");
    }

    //matching the given password with stored password
    const passwordMatched = await bcrypt.compare(payload.password, user.password);

    //throw error if user does not match password
    if (!passwordMatched) {
        throw new AppError(httpStatus.UNAUTHORIZED, "Password is incorrect!");
    }

    const jwtPayload = {
        id: user.id,
        email: user.email,
        role: user.role,
    }

    const refreshToken = jwt.sign(jwtPayload, config.refresh_secret as string, {
        expiresIn: config.refresh_expires_in,
    })

    const accessToken = jwt.sign(jwtPayload, config.jwt_secret as string, {
        expiresIn: config.jwt_expires_in,
    })

    return {
        accessToken,
        refreshToken,
    }
}

export const authServices = {
    login
}