import jwt from "jsonwebtoken";

import config from "../config"
import Role from "../models/role";
import User from "../models/user";

export const signUp = async (request, response)=>{
    const {username, email, password, roles } = request.body;

    const newUser =  new User({
        username,
        email,
        password:  await User.encryptPassword(password)
    });

    if (roles){
        const foundRoles = await Role.find({name:{$in:roles}});
        newUser.roles = foundRoles.map(role => role._id);
    }else{
        const role = await Role.findOne({name:"user"});
        newUser.roles = [role._id]
    }

    const savedUser = await newUser.save();
    
    const token = jwt.sign({id:savedUser._id}, config.SECRET, {
        expiresIn: 86400
    })

    response.status(200).json({token})
}
export const signIn = async (request, response)=>{response.json("signIn")}