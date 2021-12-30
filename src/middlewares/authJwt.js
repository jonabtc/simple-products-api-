import jwt from "jsonwebtoken"
import config from "../config"
import User from "../models/user";

export const verifyToken = async (request, response, next) => {
    try {
        const token = request.headers["x-access-token"];

        if (!token) {
            return response.status(403).json({ message: "No token provided" });
        }
        
        const { id: userId} = jwt.verify(token, config.SECRET);
        const user = await User.exists({ _id: userId });

        if (!user) {
            return response.status(404).json({ message: "Token not valid" })
        }

        next();

    } catch (error) {
        
        if (error.name === "TokenExpiredError") {
            return response.status(401).json({ message: "Token expired" })
        }

        if (error.name === "JsonWebTokenError" || error.name === "SyntaxError") {
            return response.status(401).json({ message: "Token invalid" })
        }
        
        return response.status(500).json({ message: "Error validating token" })
    }
}