import { Auth } from "../models"
import * as crypto from "crypto"
import { Model } from "sequelize/types"
import * as jwt from "jsonwebtoken";
import { UserData } from "../models/user";
import { AuthData } from "../models/auth";



function getSHA256ofstring(text:string){
    return crypto.createHash('sha256').update(text).digest('hex')
}

export async function createAuth(firstName:string, password:string, user:UserData):Promise<Model<AuthData>>{
    if (!firstName || !password){
        throw "Firstname and password is necessary"
    }
    const [auth,authCreated] = await Auth.findOrCreate({
        where:{user_id: user.id},
        defaults:{
            firstName,
            password: getSHA256ofstring(password),
            user_id: user.id,
        }
    })    
    return auth;
}
export async function checkPassword(user:UserData, password:string):Promise<any> {         
    const auth = await Auth.findOne({
        where:{
            user_id: user.id,
            password: getSHA256ofstring(password),
        }
    })  
    if(auth){
        const data = {auth, exist:true};
        return data;
    }
    else{
        const data = {auth, exist: false};
        return data;
    } 

    
}
export function createToken(data:Model<AuthData>): string{
    const random = process.env.SECRET;    
    const token:string =  jwt.sign({id:data.get("user_id")}, random)    
    return token;
}

export async function updateUserData(data, userId:number){    
    const {name,password} = data;
    console.log({name,password});
    
    const user = await Auth.findByPk(userId);
    const updatedUser = await Auth.update(
        {
            ...user,
            name,
            password: getSHA256ofstring(password)
        },{
        where:{
            id: userId,
        }
    })
    return updatedUser;
}


    
    
