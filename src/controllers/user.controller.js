import User from "../models/user"

export const createUser = (request, response)=>{
    return response.json("created user")
}

export const getUsers = (request, response)=>{
    const users = User.find(); 
    return response.json({users});
}