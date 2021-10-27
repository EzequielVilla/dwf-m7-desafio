


import { deletePet } from "../server/controllers/pet-controller";
import { PetsData } from "../server/models/pets";


const API_BASE_URL = process.env.API_BASE_URL || "http://localhost:3000";


export const state = {
    data:{
        page :null,
        email: null,
        logIn: false,
        editProfile: false,
        token: null,
        missedCoordinates:{
            lat:0,
            lng:0,
        },
        photo:"",
        photoId:0,
        giveUbication: false,
    },
    listeners:[],
    subscribe(callback:(any)=>any){
        this.listeners.push(callback);
    },
    getState(){
        return this.data;
    },

    setState(newState):void{
        this.data = newState;
        for(const cb of this.listeners){       
            cb();         
        }          
        console.log('cambie:', this.data);
    },
    
    async createOrFindUser (email:string):Promise<any>{
        const resp = await fetch(API_BASE_URL+`/user`,{
            method: "post",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                email,
            })
        })
        const data = await resp.json();
        
        
        return data;   
    },
    async createAuthAndToken(firstName:string,password:string):Promise<any>{
        const user = this.getState().newUser;      
        const resp = await fetch(API_BASE_URL+`/auth`,{
            method:"post",
            headers:{
                "Content-Type": "application/json"
            },
            body:JSON.stringify({
                firstName,
                password,
                user,
            })
        })
        const data = await resp.json();
        return data;
    },
    async checkPassword(password:string):Promise<boolean>{
        const email = this.getState().email;
        const resp = await fetch(API_BASE_URL+`/${email}/${password}`,{
            method:"get",
        })
        const data = await resp.json();
        state.getState().token = data.token;
        this.getState().logIn = data.exist;    
        return data.exist;

    },
    uploadMissedPet(data:PetsData):void{
        const token = state.getState().token;
        fetch(API_BASE_URL+`/me/pet`,{
            method:"post",
            headers:{
                "Content-Type":"application/json",
                "Authorization": `bearer ${token}`
            },
            body: JSON.stringify({
                ...data,
            })
        })

    },
    updateMissedPet(data:PetsData, id:string):void{
        const token = state.getState().token;
        fetch(API_BASE_URL+`/pet/${id}`,{
            method:"put",
            headers:{
                "Content-Type":"application/json",
                "Authorization": `bearer ${token}`
            },
            body: JSON.stringify({
                ...data,
            })
        })
        
        
    },
    async getMyReportedPets(){
        const token = state.getState().token;
        
        
        const resp = await fetch(API_BASE_URL+`/mypets`,{
            method:"get",
            headers:{
                "Authorization":`bearer ${token}`
            }
        })
        const data = await resp.json();
        const pets:Array<any> = data.pets;
        
        
        const petsData = pets.map((item)=>{
            const {id,name,photo,userId,location} = item;
            const data = {id,name,photo,userId,location}
            return data;
        })
        return petsData;
    },
    async updateUserData(firstName:string,password:string){
        const token = state.getState().token;
        
        
        const resp = await fetch (API_BASE_URL+`/myuser`,{
            method:"put",
            headers:{
                "Content-Type":"application/json",
                "Authorization":`bearer ${token}`
            },
            body:JSON.stringify({
                firstName,
                password,
            })
        })
    },
    async findNearMissedPets(lat,lng):Promise<Array<any>>{
        const token = state.getState().token;
        const resp = await fetch(API_BASE_URL+`/nearPets/?lat=${lat}&lng=${lng}`,{
            method:"get",
            headers:{
                "Authorization":`bearer ${token}`
            }
        })
        const data = await resp.json();
        return data;
    },

    //id -> id del animal
    //userId -> id del usuario al que pertenece.
    async sendReport(data:Object):Promise<any>{
        const resp = await fetch(API_BASE_URL+`/report`,{
            method:"post",
            headers:{
                "Content-Type":"application/json",
            },
            body:JSON.stringify(
                data
            )

        })  
    },

    async deletePet(id){
        const resp = await fetch(API_BASE_URL+`/pet/${id}`,{
            method:"delete",
        })
    }
}