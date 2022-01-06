import { DataTypes } from "sequelize";
import { sequelize } from "../lib/sequelize";

export interface UserData {
    id:number,
    email:string,
}
export const User = sequelize.define("user",{
    email:DataTypes.STRING,
})