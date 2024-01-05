import { Request } from "express";
export interface RequestWithUser extends Request {
    user: {
        userId: number;
        username: string;
    };
}
export declare const UserId: (...dataOrPipes: unknown[]) => ParameterDecorator;
