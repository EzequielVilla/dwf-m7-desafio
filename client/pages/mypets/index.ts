import { Router } from "@vaadin/router";


import { state } from "../../state";
const pen = require("url:./../../img/pen.svg")

class initPets extends HTMLElement{
    connectedCallback():void{
        state.saveLocalStorage();

        this.render();
    }

    async render(){
        
        const cards = await state.getMyReportedPets();
        
        
        
        const style = document.createElement("style");
        style.textContent=
        `
            .container{
                display:flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                text-align: center;
                
            }
            h1{
                margin-top:10px;
                font-family: Poppins;
                font-size: 40px;
                font-weight: bold; 
                margin-bottom: 40px;            
            }
            .cont{
                border: solid 2px;
                max-width: 325px;
                min-width:325px;
                min-height:280px;
                max-height: 280px;
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
                font-size: 35px;
            }
            .location{
                margin-left:15px;
                font-size: 14px;
                text-transform: uppercase;
            }

            .cont__info{
                display:flex;
                justify-content: space-between;

                align-items: center;
                text-align: center;
                height:100px;
            }
            .cont__info__report{
                margin-left: 15px;
                margin-top:20px;
                margin-right:20px;
            }
            .pen{
                
                cursor:pointer;
            }
            .data{
                margin-left: 10px;
            }
        `
        
        
        if(cards.length == 0){
            this.innerHTML=`
                <header-comp></header-comp>
                <div class="container">
                    <h1>Mis mascotas  reportadas</h1>

                    <caption-comp class="no-reports">AUN NO REPORTASTE MASCOTAS PERDIDAS.</caption-comp>
                
                </div>
            `
        }
        
        
        else{        
            this.innerHTML= await this.createMyMissedPetsCards(cards);
            const pen = this.querySelectorAll(".pen");
            for (let i = 0; i < pen.length; i++ ){
                pen[i].addEventListener("click",async (e)=>{
                    const id = pen[i].getAttribute("id");                    
                    const lat = pen[i].getAttribute("data-lat");
                    const lng = pen[i].getAttribute("data-lng");
                    state.getState().photoId = id;                 
                    state.getState().missedCoordinates.lat= lat;
                    state.getState().missedCoordinates.lng= lng;
                     
                    Router.go("/editPet")
                })
                
            }

            
        }
        
        
        
        this.appendChild(style);
    }
    async createMyMissedPetsCards(cards):Promise<string>{
        
        
        return `     
        <header-comp></header-comp>
        <div class="container">
            <h1>Mis mascotas  reportadas</h1>
            ${                      
                 cards.map((info)=> {   
                    return `
                    <div class="cont">
                        <div class="cont__img">
                            <img src="${info.photo}" alt="" class="photo">
                        </div>
                        <div class="cont__info" >
                            <div class="cont__info__data">
                                <p class="name"> ${info.name}</p>
                                <p class="location"> ${info.location}</p>                
                            </div>
                            <div class="cont__info__report">
                                <img class="pen" id="${info.id}" src="${pen}"data-lat="${info.lat}" data-lng="${info.lng}">
                            </div>
                        </div>              
                    </div>
                    `
                })
            }
        </div>  
    `;
    }
}


customElements.define("pets-page", initPets);