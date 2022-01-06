import "dotenv/config"
import { Auth, Pets, Reports } from "./models";
import { User } from "./models/user";


User.sequelize.sync({force:true});
// Auth.sequelize.sync({force:true});
// Pets.sequelize.sync({force:true});
// Reports.sequelize.sync({force:true});