import jwt from "jsonwebtoken"

import config from "../config"
import User from "../models/user";
import Role from "../models/role";

export const verifyToken = async (request, response, next) => {
    try {
        const token = request.headers["x-access-token"];

        if (!token) {
            return response.status(403).json({ message: "No token provided" });
        }
        
        const {id} = jwt.verify(token, config.SECRET);
        request.userId = id;
        const user = await User.exists({ _id: request.userId });

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
        
        return response.status(500).json({ message: "Error validating token" });
    }
}

export const isAdmin = async (request, response, next) =>{
    const user = await User.findById(request.userId);
    const roles = await Role.find({_id: {$in: user.roles}});
    
    for (let i=0; i < roles.length; i++){
        if(roles[i].name === "admin"){
            next();
            return;
        }
    }

    return response.status(203).json({message: "Require admin role"});
}

export const isModerator = async (request, response, next) =>{
    const user = await User.findById(request.userId);
    const roles = await Role.find({_id: {$in: user.roles}});
    
    for (let i=0; i < roles.length; i++){
        if(roles[i].name === "moderator"){
            next();
            return;

        }
    }

    return response.status(203).json({message: "Require moderator role"});
}