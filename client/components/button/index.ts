export function initButton(){
    class ButtonComponent extends HTMLElement{
        shadow = this.attachShadow({mode:"open"});
        constructor(){
            super();
            this.render();
        }

        render(){
            const txt = this.textContent;
            const style = document.createElement("style");
            style.textContent=
            `
                .my-button{
                    font-family: Poppins;
                    font-weight: bold;
                    font-size: 16px;
                    margin: 10px 0 10px 0;
                    padding: 10px 20px;
                    border: 0px;
                    border-radius: 5px;
                    cursor:pointer;
                    max-width: 325px;
                    min-width: 325px;
                    background-color: #C4C4C4;
                }
            `

            this.shadow.appendChild(style);
            const div = document.createElement("div");
            div.innerHTML=
            `
                <button class="my-button">${txt}</button>
            `
            this.shadow.appendChild(div);
            
        }
    }


    customElements.define("button-comp", ButtonComponent)
}