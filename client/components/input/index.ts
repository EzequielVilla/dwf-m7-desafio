export function initInput(){
    class InputComponent extends HTMLElement{
        shadow = this.attachShadow({mode:"open"});
        constructor(){
            super();
            this.render();
        }

        render(){
            
            const style = document.createElement("style");
            style.textContent=
            `
                .my-input{
                    font-family: Poppins;
                    font-size: 20px;
                    margin: 10px 0 10px 0;
                    border: solid 1px;
                    border-radius: 5px;
                    max-width: 325px;
                    min-width: 325px;
                }
            `
            this.shadow.appendChild(style);
            const div = document.createElement("div");
            div.innerHTML=
            `
                <input type="text" class="my-input"></input>
            `
            this.shadow.appendChild(div);
            
        }
    }


    customElements.define("input-comp", InputComponent)
}