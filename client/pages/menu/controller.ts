import { Router } from "@vaadin/router";
import { state } from "../../state";

export function buttonHandler():void{
    const email = state.getState().email; 
    const logIn = state.getState().logIn;
    
    
    
    
    
    if(email == null || email != null && logIn == false){
    const logIn = document.querySelector(".log-in").addEventListener("click",(e)=>{
        e.preventDefault();
            Router.go("/email")
            
        })
    } 
    else if(email != null && logIn == true){
        const logOut = document.querySelector(".close").addEventListener("click",(e)=>{
            e.preventDefault();   
            window.location.reload();
            state.getState().email = null; 
        })
    }
    const data = document.querySelector(".data").addEventListener("click",(e)=>{
        e.preventDefault();
        if(logIn == false){
            state.getState().page = "/myData";
            Router.go("email")
        }else{
            Router.go("/myData")    
        }
    })

    const myPets = document.querySelector(".my-pets").addEventListener("click",(e)=>{
        e.preventDefault();
        if(logIn == false){
            state.getState().page = "/myPets";
            Router.go("email")
        }else{
            Router.go("/myPets")
        }
    })
    
    
    const reportLost = document.querySelector(".report").addEventListener("click",(e)=>{
        e.preventDefault();
        
        
        if(logIn == false){
            state.getState().page = "/reportLost";
            Router.go("email")
        }else{
            Router.go("/reportLost");
        }
    })
}
