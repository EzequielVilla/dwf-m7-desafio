import { DataTypes } from "sequelize";
import { sequelize } from "../lib/sequelize";

export interface AuthData{
    id:number,
    firstName:string,
    password:string,
    user_id:number,
}

export const Auth = sequelize.define("auth",{
    firstName:DataTypes.STRING,
    password:DataTypes.STRING,
    user_id: DataTypes.INTEGER,
})