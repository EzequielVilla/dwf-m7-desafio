
import { Router } from "@vaadin/router";
import { state } from "../../state";
import { buttonHandler } from "./controller";

class initMenu extends HTMLElement{
    connectedCallback():void{
        this.render();
        this.buttonColor();
        buttonHandler();
        
    }

    render():void{
        const style = document.createElement("style");
        style.textContent=`
        .menu{
            display:flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            text-align: center;
            width:100%;
            height:70vh;
            background-color:#8AF1FF;
        }
        p{
            cursor:pointer;
            margin-top:20px;
            font-family: Poppins;
            font-style: normal;
            font-weight: bold;
            font-size: 24px;
            line-height: 36px;
        }        
        `
        this.innerHTML=`
            <div class="menu">
                <p class="data">Mis datos</p>
                <p class="my-pets">Mis mascotas<br>reportadas</p>
                <p class="report">Reportar<br>mascota</p>
            </div>
        `
        this.appendChild(style)
        this.email();
        
        
    }
    email():void{
        
        
        const el = document.createElement("div");
        el.classList.add("email");
        const style = document.createElement("style");
        style.textContent=`
        .email{
            display:flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            text-align: center;
            width:100%;
            height:30vh;
            background-color:#8AF1FF;
        }
        .my-email{
            cursor: auto;
        }
        `
        const email = state.getState().email;  
        const logIn = state.getState().logIn;         
        if(email == null || email != null && logIn == false){
            el.innerHTML=`
            <button-comp class="log-in">Log-in</button-comp>
            `
        } 
        else if(email != null && logIn == true){
            el.innerHTML=`
                <p class="my-email">${email}</p>
                <button-comp class="close">Cerrar sesión</button-comp>
            `
        }
        this.appendChild(el);
        this.appendChild(style);
    }


    buttonColor():void{
        const shadow = this.querySelector("button-comp").shadowRoot;
        const anotherStyle = document.createElement("style");
        anotherStyle.textContent=
        `
            .my-button{
                background-color: #97EA9F;
            }
        `
        shadow.appendChild(anotherStyle);
    }
}


customElements.define("menu-page", initMenu);

