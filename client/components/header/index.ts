import { Router } from "@vaadin/router";


export function initHeader() {
    let menu = false;
    class HeaderComponent extends HTMLElement{
        constructor() {
            super();
            this.render();
        }
        render() {
            const footPrint = require("url:./../../img/header.svg");
            const burguer = require("url:./../../img/burger.svg")
            var style = document.createElement("style");
            style.textContent = `
            .root{
                background-color: #FF8282;           
                height : 60px;
            }
            .cont{
                display:flex;
                justify-content: space-between;
                z-index:1;
            }
            .foot{
                margin-left:20px;
                margin-top:10px;
                cursor:pointer;

            }
            .burguer{
                margin-right:20px;
                margin-top:10px;
                cursor:pointer;
            }     
            `
            var shadow = this.attachShadow({ mode: 'open' });
            shadow.appendChild(style);
            var div = document.createElement("div");
            div.classList.add("root");
            div.innerHTML=`
                <div class="cont">
                    <div>
                        <img class="foot" src= ${footPrint} alt="" name="foot">
                    </div>
                    <div>
                        <img class="burguer" src= ${burguer} alt="" name="foot">
                    </div>
                </div>
            `
            shadow.appendChild(div);
            this.burguerClick();
            this.footClick();
        }
        burguerClick(){
            this.shadowRoot.querySelector(".burguer").addEventListener("click", (e)=>{
                e.preventDefault();
                Router.go("/menu")
            })
        }
        footClick(){
            this.shadowRoot.querySelector(".foot").addEventListener("click", (e)=>{
                e.preventDefault();
                Router.go("/")
            })
        }

    }
    customElements.define('header-comp', HeaderComponent);
}