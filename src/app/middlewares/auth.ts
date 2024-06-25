import { NextFunction, Request, Response } from "express";
import AppError from "../errors/AppError";
import httpStatus from "http-status";
import jwt, { JwtPayload } from "jsonwebtoken"
import config from "../config/config";
import prisma from "../utils/prisma";
import { TAuthUser } from "../types/global";

const auth = (...requiredRoles: string[]) => 
    async (req: Request & {user?:TAuthUser}, res: Response, next: NextFunction) => {
        try {
            //get authorization token from request
            const authToken = req.headers.authorization;
            if (!authToken) {
                throw new AppError(httpStatus.UNAUTHORIZED, "You are not Authorized")
            }

            //verify the token and get the user information
            const decodedToken = jwt.verify(authToken, config.jwt_secret as string) as JwtPayload

            // console.log(decodedToken);
            

            //checking if the user exists
            const user = await prisma.user.findUnique({
                where: {
                    id: decodedToken.id,
                },
                select: {
                    id: true,
                    email: true,
                    is_deleted: true,
                    status: true,
                    role: true,
                }
            });

            if (!user) {
                throw new AppError(httpStatus.NOT_FOUND, "User not found")
            }

            //check if the user blocked
            if (user?.status === "blocked") {
                throw new AppError(httpStatus.FORBIDDEN, "User has been blocked");
            }

            //check if user is deleted
            if (user?.is_deleted) {
                throw new AppError(httpStatus.FORBIDDEN, "User is deleted");
            }

            if (requiredRoles && !requiredRoles.includes(decodedToken.role)) {
                throw new AppError(
                    httpStatus.UNAUTHORIZED,
                    'You are not authorized!',
                );
            }

            req.user = decodedToken as TAuthUser;

            console.log(req.user);
            
            next();
        } catch (error) {
            next(error);
        }
    }


export default auth;