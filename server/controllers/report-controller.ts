
import { Reports } from "../models/reports";
import * as SendGrid from "@sendgrid/mail"
import {ReportData} from "../models/reports" 
import "dotenv/config"
import { Model } from "sequelize/types";



export async function createReport(firstName:string,phoneNumber:string,info:string):Promise<Model<ReportData>> {
    
    const report = await Reports.create({
        defauls:{
            firstName,
            phoneNumber,
            info,
        }
    })
    return report;
}
export async function sendEmail(data):Promise<any> {
    const {email,petName,location,firstName,phone} = data;
    SendGrid.setApiKey(process.env.SENDGRID_KEY);
    const msg = {
        to: `ezequiel.n.villa@gmail.com`,
        from: 'ezequiel.n.villa@gmail.com',
        subject: `Vieron a ${petName}`,
        text: ` `,
        html: `Hola! Vieron a ${petName} cerca de ${location}. Podes comunicarte con ${firstName}, que lo reporto, llamandolo al siguiente numero ${phone}.`,
    };

    (async () => {
        try {
            await SendGrid.send(msg);
        } catch (error) {
            console.error(error);
            if (error.response) {
                console.error(error.response.body)
            }
        }
    })();
    
    
    return msg;
}