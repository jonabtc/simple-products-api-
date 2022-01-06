import { ROLES } from "../models/role"
import User from "../models/user";


export const checkDuplicateUsernameOrEmail = async (request, response, next) =>{
    const { username, email } = request.body;
    const userByUsername = await User.exists({ username });
    if(userByUsername){
        return response.status(400).json({message: "A user with this username already exists"});
    }
    const userByEmail = await User.exists({ email });
    if(userByEmail){
        return response.status(400).json({message: "A user with this email already exists"});
    }
    next();
}

export const checkRolesExisted = (request, response, next) =>{
    if(request.body.roles){
        for(let role of request.body.roles){
            if ( !ROLES.includes(role)){
                return response.status(400).json({
                    message: `Role '${role}' does not exists`
                });
            }
        }
    }

    next();
}