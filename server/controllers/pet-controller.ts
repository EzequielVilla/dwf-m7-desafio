import { IndexHints, Model } from "sequelize/types";
import { PetsData } from "../models/pets";
import { Pets } from "../models";
import { index } from "../lib/algolia";
import { UserData } from "../models/user";
import { cloudinary } from "../lib/cloudinary";



export async function createPet(data:PetsData, user:UserData):Promise<Model<PetsData>> {
    const photo = data.photo;
    
    
    try {
        const img = await cloudinary.uploader.upload(photo,{
            resource_type: "image",
            discard_original_filename:true,
            width:1000,
        })
        console.log({img});
            
        const pet = await Pets.create({
            ...data,
            photo:img.secure_url,

            userId: user.id,
        })            
        return pet;    
        
    } catch (error) {
        console.log(error);   
    }   

}
export async function createAlgoliaReg(data:Model<PetsData>):Promise<any>{ 
    try {  
        const algoliaRes = await index.saveObject({
            objectID: data.get("id"),
            name: data.get("name"),
            "_geoloc":{
                "lat": data.get("lat"),
                "lng":data.get("lng"),
            }
        });        
        return algoliaRes;
    } catch (error) {
        console.log(error);
        
    }
}

export async function getMyPets(data:Model<UserData>):Promise<Model<PetsData>[]>{
    const pets = await Pets.findAll({
        where:{userId: data.get("id")}
    })
    return pets;
}
export async function getNearPets(stringLat:string,stringLng:string):Promise<Array<Object>> {
    const lat = parseFloat(stringLat);
    const lng = parseFloat(stringLng);
    
    const res = await index.search(``,{
        aroundLatLng:`${lat},${lng}`,
        // aroundLatLng:"-34.61666,-58.371618", for the test
        aroundRadius:10000
    })
    
    const petsData = await Promise.all(
        res.hits.map(async (data) =>{
            const id = data.objectID;
            const pet = await Pets.findByPk(id);
            
            return pet; 
        })
    )
    
    console.log(petsData.length);
    
    const myDataPet = await Promise.all(petsData.map((item)=>{   
        // console.log(item);
        
            const id = item.getDataValue("id");
            const name = item.getDataValue("name");
            const photo= item.getDataValue("photo");
            const location = item.getDataValue("location");
            const userId = item.getDataValue("userId");
            const info = {id,name,photo,location,userId};
            return info;
        })
    )
    return myDataPet;
}

export async function updatePetData(data, id:number, userId:number):Promise<any>{
    const photo = data.photo;
    const img = await cloudinary.uploader.upload(photo,{
        resource_type: "image",
        discard_original_filename:true,
        width:1000,
    })
    
    
    await Pets.update({
        ...data,
        photo:img.secure_url,
    },{
        where:{
            id,
            userId,
        }
    })
    const pet = await Pets.findOne({
        where:{
            id,
            userId,
        }
    });
    
    try {  
        const algoliaRes = await index.saveObject({
            objectID: id,
            name: data.name,
            "_geoloc":{
                "lat": data.lat,
                "lng":data.lng,
            }
        });        
        return algoliaRes;
    } catch (error) {
        console.log(error);
        
    }
    return pet
}

export async function deletePet(id:number, userId:number):Promise<void>{    
    console.log({id,userId});

    await Pets.destroy({
        where:{
            id,
            userId,
        }
    })
     await index.deleteObject(`${id}`)
}

