import jwt from "jsonwebtoken";
import { AppError, catchAsync } from "./error.middleware.js";

export const isAuthenticated = catchAsync(async (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        throw new AppError("You are not logged in", 401);
    }
    try {
        const decoded = await jwt.verify(token, process.env.JWT_SECRET);
        req.id = decoded.userId;
        next();
    } catch (error) {
        throw new AppError("JWT Token error", 401);
    }
    
})