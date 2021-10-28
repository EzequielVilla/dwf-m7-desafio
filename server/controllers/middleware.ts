import * as jwt from "jsonwebtoken";

export function checkBodyMiddleware(req,res,next):void{
    if(Object.keys(req.body).length === 0){
        res.status(400).json({
            message: "No data in body"
        })
    } else{
        next();
    }
}
export function authMiddleware( req,res,next){
    try {
        const token = req.get("authorization").split(" ")[1];
        try{
            const data = jwt.verify(token, process.env.SECRET);
            req._user = data;
            next();
        }catch(e){
            res.status(401).json({error:"invalid token"})
        }
    } catch (e) {
        res.status(401).json({error: "There isn't an authorization at the header"})
    }
}