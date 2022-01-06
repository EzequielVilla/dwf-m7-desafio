import { DataTypes } from "sequelize";
import { sequelize } from "../lib/sequelize";

export interface ReportData{
    firstName:string,
    phoneNumber:number,
    info:string;
}

export const Reports = sequelize.define("reports",{
    firstName: DataTypes.STRING,
    phoneNumber:DataTypes.INTEGER,
    info:DataTypes.STRING,

})