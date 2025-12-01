// src/types/expressTypes.ts
import "express";
import { Request, Response, NextFunction } from "express";


declare global {
  namespace Express {
    interface Request {
      firebaseUser?: {
        uid: string;
        email?: string;
        claims?: Record<string, any>;
      };
    }

    interface Response {
      locals: {
        uid?: string;
        role?: string;
        [key: string]: any;
      };
    }
  }
}

export type MiddlewareFunction = (
  req: Request,
  res: Response,
  next: NextFunction
) => void;

export {};
