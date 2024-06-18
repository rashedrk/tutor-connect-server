import { NextFunction, Request, RequestHandler, Response } from 'express';
import { TAuthUser } from '../types/global';

const catchAsync =
    (fn: RequestHandler) =>
        async (req: Request & { user?: TAuthUser }, res: Response, next: NextFunction): Promise<void> => {
            try {
                await fn(req, res, next);
            } catch (error) {
                next(error);
            }
        };

export default catchAsync;