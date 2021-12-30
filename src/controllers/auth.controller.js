import jwt from "jsonwebtoken";

import config from "../config"
import Role from "../models/role";
import user from "../models/user";
import User from "../models/user";

export const signUp = async (request, response) => {
    const { username, email, password, roles } = request.body;

    const newUser = new User({
        username,
        email,
        password: await User.encryptPassword(password)
    });

    if (roles) {
        const foundRoles = await Role.find({ name: { $in: roles } });
        newUser.roles = foundRoles.map(role => role._id);
    } else {
        const role = await Role.findOne({ name: "user" });
        newUser.roles = [role._id]
    }

    const savedUser = await newUser.save();

    const token = jwt.sign({ id: savedUser._id }, config.SECRET, {
        expiresIn: 86400
    })

    response.status(200).json({ token })
}
export const signIn = async (request, response) => {
    const userFound = await User.findOne({ email: request.body.email }).populate("roles");

    if (!userFound) {
        return response.status(400).json({ message: "User not found" });
    }
    
    const matchPassword = await User.comparePassword(request.body.password, userFound.password);

    if(!matchPassword){
        return response.status(401).json({token:null, message: "Invalid password"});
    }
    
    const token = jwt.sign({ id: userFound._id }, config.SECRET, {
        expiresIn: 86400
    })

    response.json({token});

}


