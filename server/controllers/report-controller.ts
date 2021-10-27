
import { Reports } from "../models";
import * as SendGrid from "@sendgrid/mail"
import "dotenv/config"



export async function createReport(firstName,phoneNumber,info) {
    const report = await Reports.create({
        defauls:{
            firstName,
            phoneNumber,
            info,
        }
    })
    return report;
}
export async function sendEmail(data) {
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