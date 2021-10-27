import "dotenv/config"
import { Auth, Pets, Reports } from "./models";
import { User } from "./models/user";


User.sequelize.sync({alter:true});
Auth.sequelize.sync({alter:true});
Pets.sequelize.sync({alter:true});
Reports.sequelize.sync({alter:true});