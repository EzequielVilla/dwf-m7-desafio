export function initCaption(){
    class CaptionComponent extends HTMLElement{
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
                .my-caption{
                    font-family: Poppins;
                    font-size: 16px;                    
                }
            `

            this.shadow.appendChild(style);
            const div = document.createElement("div");
            div.innerHTML=
            `
                <p class="my-caption">${txt}</p>
            `
            this.shadow.appendChild(div);
            
        }
    }


    customElements.define("caption-comp", CaptionComponent)
}