
import { Request, Response, NextFunction } from "express";

interface CustomError extends Error {
  statusCode?: number;
}

const errorHandler = (err: CustomError, req: Request, res: Response, next: NextFunction) => {
    if(err){
         console.log(err);
         res.status(err.statusCode || 500).json({
            success: false,
            message: err.message || "Something went wrong!",
         })
    }     
}

export default errorHandler;