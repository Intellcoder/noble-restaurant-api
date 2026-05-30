import { Request, Response, NextFunction } from "express";
declare class CustomError extends Error {
    statusCode: number;
    constructor(message: any, statusCode: number);
}
export declare const customError: (message: any, statusCode: number) => CustomError;
export declare const ErrorHandler: (err: any, req: Request, res: Response, next: NextFunction) => Response<any, Record<string, any>> | undefined;
export {};
//# sourceMappingURL=errorHandler.d.ts.map