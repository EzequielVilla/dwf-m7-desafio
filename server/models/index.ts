import { User } from "./user";
import { Reports } from "./reports";
import { Pets } from "./pets";
import { Auth } from "./auth";

User.hasMany(Pets);
User.hasOne(Auth);
Auth.belongsTo(User);
Pets.belongsTo(User);
Reports.hasOne(Pets);
Pets.belongsTo(Reports)


export {User,Reports,Pets,Auth}