import { Model } from "sequelize/types";
import { User } from "../models";
import { UserData } from "../models/user";

export async function createUser(email:string):Promise<Array<Model | boolean>>{
    if(!email){
        throw "Email is necessary"
    }
    const [user,userCreated] = await User.findOrCreate({
        where: {email},
        defaults:{
            email,
        }
    })    
    return [user, userCreated];
}

export async function getUserByToken(data:string):Promise<any>{
    const user = await User.findByPk(data);
    return user;
}

export async function getUserByEmail(email:string):Promise<any>{
    
    const user = await User.findOne({
        where:{
            email,
        }
    })
    return user;
}
export async function getUserById(userId){
    const user = await User.findOne({
        where:{
            id:userId,
        }
    })
    const email = user.getDataValue("email");
    return email;
}

