import * as express from "express";
import * as cors from "cors";
import "dotenv/config"
import { User } from "./models/user";
import { createUser, getUserByEmail, getUserById, getUserByToken } from "./controllers/user-controller";
import { checkPassword, createAuth, createToken, updateUserData } from "./controllers/auth-controller";
import { createAlgoliaReg, createPet, deletePet, getMyPets, getNearPets, updatePetData } from "./controllers/pet-controller";
import { authMiddleware, checkBodyMiddleware } from "./controllers/middleware";
import { Auth, Pets } from "./models";
import { createReport, sendEmail } from "./controllers/report-controller";


const port = process.env.PORT || 3000;
const path = require("path");
const app = express();
app.use(cors());
app.use(express.json({
    limit: "50mb",
}));
app.use(express.static("dist"));


app.post("/user", checkBodyMiddleware, async(req,res)=>{
    const [newUser, created] = await createUser(req.body.email)
    created ? 
        
        res.status(200).json({
            created,
            newUser,
        })
        : 
        res.status(400).json({
            created,
            message: "User already exist"
        })
    // if(created){
    //     res.status(200).json({
    //         created,
    //         newUser,
    //     })
    // }
    // else {
    //     res.status(400).json({
    //         created,
    //         message: "User already exist"
    //     })
    // }
})
app.post("/auth", checkBodyMiddleware, async (req, res) => {
    const { user, password, firstName } = req.body;    
    const newAuth = await createAuth(firstName, password, user)
    const token = createToken(newAuth);
    res.status(200).json({
        token,
        newAuth,
    })
})
app.post("/me/pet", checkBodyMiddleware, authMiddleware, async (req, res) => {
    const user = await getUserByToken(req._user.id);
    const newPet = await createPet(req.body, user);
    const algoliaRes = await createAlgoliaReg(newPet);  
    res.status(200).json({
        algoliaRes,
        newPet,
    })
})
app.get("/mypets",authMiddleware,async(req,res)=>{
    const user = await getUserByToken(req._user.id);
    const pets = await getMyPets(user);
    res.status(200).json({
        pets,
    })
})



app.post("/report", checkBodyMiddleware,  async (req, res) => {
    const {petName,firstName,phone,location,userId} = req.body;    
    const email = await getUserById(userId);
    const dataToSendEmail = {email,petName,location,firstName,phone};
    const emailSended = await sendEmail(dataToSendEmail)
    const report = await createReport(firstName,phone,location)
    res.json({
        message: emailSended,
        report,
    })
});

app.put("/myuser",checkBodyMiddleware, authMiddleware,async(req,res)=>{ 
    const updatedUser = await updateUserData(req.body, req._user.id); 
    res.status(200).json({
        updatedUser,
    })
})
app.put("/pet/:id", checkBodyMiddleware, authMiddleware,async(req,res)=>{
    const {id} = req.params;
    const updatedPet = await updatePetData(req.body, id,req._user.id);
    res.status(200).json({updatedPet})
});




app.delete("/pet/:id",authMiddleware,async(req,res)=>{
    const {id} = req.params;
    await deletePet(id,req._user.id);
    res.status(200).json({
        message: "Pet deleted"
    })
})


app.get("/:email/:password", async(req,res)=>{
    const {email,password} = req.params;
    const user = await getUserByEmail(email);
    const data = await checkPassword(user,password);
    if(data.exist){
        const token = createToken(data.auth)
        res.status(200).json({
            token,
            exist:data.exist,
        })
    }
    else{
        res.status(400).json({
            token:undefined,
            exist:data.exist,
        })
    }
})
app.get("/nearPets",async(req,res)=>{
    const {lat,lng} = req.query;
    const data = await getNearPets(lat,lng);
    res.status(200).json(
        data
    )
});


//

app.get("/all", async (req,res)=>{
    const users = await User.findAll({});
    const pets = await Pets.findAll({});
    const auths = await Auth.findAll({});
    res.json({
        users,
        pets,
        auths,
    })
})
app.get("*", (req, res) => {
    const ruta = path.resolve(__dirname, "./../index.html");    
    res.sendFile(ruta);
})
app.listen(port, () => {
    console.log(`escuchando en ${port}`);
});