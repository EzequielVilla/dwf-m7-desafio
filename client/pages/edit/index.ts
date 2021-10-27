import { Router } from "@vaadin/router";
import { state } from "../../state";

class initEdit extends HTMLElement{
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
        this.appendChild(style);
        this.innerHTML=`
            <header-comp></header-comp>
            <div class="container">
                <h1>Mis datos</h1>
                <caption-comp>Nombre</caption-comp>
                <input-comp class="name"></input-comp>
                <caption-comp>Contraseña</caption-comp>
                <input-comp class="password"></input-comp>
                <caption-comp>Repetir contraseña</caption-comp>
                <input-comp class="repeat-password"></input-comp>
                <button-comp>Guardar</button-comp>
            </div>
        `
        this.appendChild(style)
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
            const name = document.querySelector(".name").shadowRoot.querySelector("input").value;
            const password = document.querySelector(".password").shadowRoot.querySelector("input").value;  
            const repeatedPassword = document.querySelector(".repeat-password").shadowRoot.querySelector("input").value;  
            const myToken = state.getState().token;            
            if(password == repeatedPassword && myToken == null){
                
                
                const responseFromServer = await state.createAuthAndToken(name, password)
                const token = responseFromServer.token;
                state.getState().token = token;
                const page = state.getState().page
                state.getState().logIn = true;
                if(page == null)
                    Router.go("/")
                else
                    Router.go(page);
            } else if(password != repeatedPassword && myToken == null){
                state.getState().logIn = false;
                //escribir el error que deberia aparecer por tener 2 contrasenias distintas
            } else if(password == repeatedPassword && myToken != null){
                
                state.updateUserData(name,password);
            }
            
        })
    }
}


customElements.define("edit-page", initEdit);