import { Router } from "@vaadin/router";
import { state } from "../../state";


class initPassword extends HTMLElement{
    connectedCallback():void{
        state.saveLocalStorage();

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
                <caption-comp>Contraseña</caption-comp>
                <input-comp></input-comp>
                <a>Olvide mi contraseña</a>
                <button-comp>Ingresar</button-comp>
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
    buttonHandler(){
        this.querySelector("button-comp").addEventListener("click",async function (e){
            e.preventDefault();
            const page = state.getState().page;
            const password = document.querySelector("input-comp").shadowRoot.querySelector("input").value;
            const exist = await state.checkPassword(password);
            if(exist == true && page == null) {
                state.getState().logIn = true;
                Router.go("/")   

            }      
            else if (exist == true && page != null) {
                state.getState().logIn = true;
                Router.go(page)
            }     
            else if (exist == false){
                console.log("Contrasenia incorrecta");
                //cambiar el html para que muestre eso en la pagina
            }
            
                 
        })
    }
}


customElements.define("password-page", initPassword);