const pen = require("url:./../../img/pen.svg")

export function initCard(){
    class CardComponent extends HTMLElement{
        shadow = this.attachShadow({mode:"open"});
        constructor(){
            super();
            this.render();
        }

        render(){   
            
            const style = document.createElement("style");
            style.textContent=
            `
                .cont{
                    border: solid 2px;
                    max-width: 325px;
                    max-height: 250px;
                }
                .cont__img{
                    background-color: #FF6868;
                    display:flex;
                    justify-content: center;
                    align-items: center;
                }
                .photo{
                    max-height:140px;
                    max-width: 300px;
                }
                .name{
                    margin-top:0px;
                    margin-bottom:0px;
                    margin-left:15px;
                    font-weight: bold;
                    font-size: 40px;
                    line-height: 60px;
                }
                .location{
                    margin-left:15px;
                    font-size: 16px;
                    text-transform: uppercase;
                }

                .cont__info{
                    display:flex;
                    justify-content: space-between;
                }
                .cont__info__report{
                    margin-left: 15px;
                    margin-top:20px;
                    margin-right:20px;
                }
                .pen{
                    display:none;
                }
            `
            this.shadow.appendChild(style);      
            const div = document.createElement("div");

            div.innerHTML=`
                <div class="cont">
                    <div class="cont__img">
                        <img src="" alt="" class="photo">
                    </div>
                    <div class="cont__info">
                        <div class="cont__info__data">
                            <p class="name"> prueba</p>
                            <p class="location"> test</p>                
                        </div>
                        <div class="cont__info__report">
                            <p  class="report-info">REPORTAR <br> INFORMACIÓN</p>
                            <img class="pen" src=${pen} name="pen">
                        </div>
                    </div>              
                </div>
            `
            this.shadow.appendChild(div);
            
        }
       
    }


    customElements.define("card-comp", CardComponent)
}