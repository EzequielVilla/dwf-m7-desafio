import { DataTypes } from "sequelize";
import { sequelize } from "../lib/sequelize";

export interface PetsData{
    name:string,
    photo:string,
    location:string,
    lat:number,
    lng:number,
}
export const Pets = sequelize.define("pets",{
    name: DataTypes.STRING,
    photo:DataTypes.STRING,
    location:DataTypes.STRING,
    lat:DataTypes.FLOAT,
    lng:DataTypes.FLOAT
})