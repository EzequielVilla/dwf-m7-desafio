import { Router } from "@vaadin/router";
import { Model } from "sequelize/types";

import {state} from "./../../state"
class initEmail extends HTMLElement{
    connectedCallback():void{
        this.render();


    }

    render():void{
        const style = document.createElement("style");
        style.textContent=`
            .container{
                margin-top:15px;
                display:flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                text-align: center;
                
        }
        `
        this.innerHTML=
        `
            <header-comp></header-comp>
            <div class="container">
                <h1>Ingresar</h1>
                <caption-comp>Email</caption-comp>
                <input-comp></input-comp>
                <button-comp>Siguiente</button-comp>
            </div>
        `
        this.appendChild(style);
        this.buttonColor(); 
        this.buttonHandler();
    }
    buttonColor():void{
        const shadow = this.querySelector("button-comp").shadowRoot;
        const anotherStyle = document.createElement("style");
        anotherStyle.textContent=
        `
            .my-button{
                background-color: #FF9DF5;
            }
        `
        shadow.appendChild(anotherStyle);
    }
    buttonHandler():void{
        this.querySelector("button-comp").addEventListener("click",async function (e){
            e.preventDefault();
            const email = document.querySelector("input-comp").shadowRoot.querySelector("input").value;        
            const data = await state.createOrFindUser(email);
            const created = data.created;
            const newUser:Model = data.newUser;
            state.getState().email= email;
            if(created){
                const lastState = state.getState();
                state.setState({
                    ...lastState,
                    newUser,
                })
                Router.go("/edit");
            }
            else{
                Router.go("/password");
            }          
        })
    }
}


customElements.define("email-page", initEmail);