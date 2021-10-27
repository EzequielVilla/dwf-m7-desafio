import { DataTypes } from "sequelize";
import { sequelize } from "../lib/sequelize";

export interface ReportData{
    firstName:string,
    phoneNumber:number,
    info:string;
}
//No se si la info ponerla como string o tomar las calles que dicen, guardarla con lat, lng y marcarla en el mapa.
export const Reports = sequelize.define("reports",{
    firstName: DataTypes.STRING,
    phoneNumber:DataTypes.INTEGER,
    info:DataTypes.STRING,

})