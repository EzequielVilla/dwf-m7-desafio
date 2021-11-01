
import { state } from "../../state";
const close = require("url:./../../img/vector.svg")



class initHome extends HTMLElement{
    connectedCallback():void{
        this.render();
    }

    render():void{
        const ubication = state.getState().giveUbication;
        const style = document.createElement("style");
        style.textContent=
        `
        .container{
            display:flex;
            position:absolute;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            text-align: center;
            width: 100vw;
        }
        h1{
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

        .cont__cardInfo{
            display:flex;
            justify-content: space-between;

            align-items: center;
            text-align: center;
            height:100px;
        }
        .cont__cardInfo__report{
            margin-left: 15px;
            margin-top:20px;
            margin-right:20px;
        }
      
        .report-new-cardInfo{   
            cursor:pointer;
        }
        `
        
        this.innerHTML=
        `
            <header-comp></header-comp>
            <div class="container">
                <h1>Mascotas perdidas cerca tuyo</h1>
                <caption-comp>Para ver las mascotas reportadas cerca tuyo necesitamos permiso para conocer tu ubicación.
                </caption-comp>
                <button-comp class="give-ubication">Dar mi ubicación</button-comp>
            </div>
           
            
        `
        this.appendChild(style);
        this.buttonColor(); 
        this.ubicationButton(style);
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
    ubicationButton(style:HTMLStyleElement){
        this.querySelector(".give-ubication").addEventListener("click",(e)=>{
            e.preventDefault();
            
            navigator.geolocation.getCurrentPosition(async (data)=>{
                const lat = data.coords.latitude;
                const lng = data.coords.longitude;
                const cardInfo = await state.findNearMissedPets(lat,lng);
                
                if(cardInfo.length > 0){
                    this.innerHTML= await this.createNearMissedPetsCards(cardInfo);
                    this.reportButtonHandler();
                }   
                else{                 
                    this.innerHTML=`
                        <header-comp></header-comp>
                        <div class="container">
                            <h1>Mascotas perdidas cerca tuyo</h1>
                            <caption-comp>No hay mascotas perdidas cerca tuyo.
                            </caption-comp>   
                        </div>
                    `
                }  
                this.appendChild(style);
            })
        })
    }

    
    
    async createNearMissedPetsCards(cardInfo:Array<any>):Promise<string>{
        return `
            <header-comp></header-comp>
            <div class="container">
                <h1>Mascotas perdidas cerca tuyo</h1>
            ${                      
                 cardInfo.map((cardInfo)=> {   
                    return `
                    <div class="cont">
                        <div class="cont__img" id="${cardInfo.userId}">
                            <img src="${cardInfo.photo}" alt="" class="photo">
                        </div>
                        <div class="cont__cardInfo">
                            <div class="cont__cardInfo__data">
                                <p class="name"> ${cardInfo.name}</p>
                                <p class="location"> ${cardInfo.location}</p>                
                            </div>
                            <div class="cont__cardInfo__report">
                                <p id="${cardInfo.id}"class="report-new-cardInfo">REPORTAR <br> INFORMACIÓN</p>
                            </div>
                        </div>              
                    </div>
                    `
                })
            }
            </div>  
        `
    }

    reportButtonHandler(){
        const report = this.querySelectorAll(".report-new-cardInfo");
        const name = this.querySelectorAll(".name");
        const userIdEl = this.querySelectorAll(".cont__img");
        //change color of header component
        const headerStyle = this.querySelector("header-comp").shadowRoot;
        const opacityComponent = document.createElement("style");
        opacityComponent.textContent =`
        .root{
            background-color: rgba(0,0,0,0.6)
        }
        .cont{
            background-color: rgba(255, 104, 104, 0.6)
        }
        .
        `
        //
        for (let i = 0; i < report.length; i++ ){
                report[i].addEventListener("click",async (e)=>{
                    const id = report[i].getAttribute("id");
                    const userId = userIdEl[i].getAttribute("id");
                    const petName = name[i].textContent;                           
                    const popUpWindow:HTMLDivElement = document.createElement("div");
                    const popUpWindowStyle = document.createElement("style");
                    
                    
                    popUpWindowStyle.textContent=`
                        .container{
                            background-color: rgba(0,0,0,0.6)
                        }
                        .cont__img{
                            background-color: rgba(255, 104, 104, 0.6)
                        }
                        .popup-container{
                            position: fixed;
                            left: 50%;
                            top: 50%;
                            transform: translate(-50%, -50%);
                            background-color: white;
                            
                            width:340px;
                            height: 600px;    
                            border: solid 2px;           
                        }
                        .close{
                            cursor:pointer;
                            margin: 5px 0px 5px 90%;
         
                            display:flex;
                            
                        }
                        .input-form-container{
                            display:flex;
                            position: fixed;
                            flex-direction: column;
                            justify-content: center;
                            align-items: center;
                            text-align: center;
                        }
                    `    
                    //Create popUpWindow.                 
                    popUpWindow.innerHTML=`
                        <div class="popup-container">
                            <img class="close" src="${close}">
                            <div class="input-form-container">
                                <h1>Reportar cardInfo <br> de ${petName}</h1>
                                <caption-comp>TU NOMBRE</caption-comp>
                                <input-comp class="myname"></input-comp>
                                <caption-comp>TU TELÉFONO</caption-comp>
                                <input-comp class="phone"></input-comp>
                                <caption-comp>DONDE LO VISTE?</caption-comp>
                                <input-comp class="find-cardInfo"></input-comp>
                                <button-comp class="send-cardInfo">Enviar</button-comp>
                            </div>
                        </div>

                    `
                    this.appendChild(popUpWindow);
                    this.buttonColor();
                    this.appendChild(popUpWindowStyle);
                    headerStyle.appendChild(opacityComponent);
                    this.buttonSendHandler(id,userId,petName);
                    this.buttonClose(popUpWindow,popUpWindowStyle,headerStyle,opacityComponent);
                })
                
            }
    }

    buttonSendHandler(id,userId,petName):void{
        this.querySelector(".send-cardInfo").addEventListener("click",async(e)=>{
            e.preventDefault();
            const firstName = this.querySelector(".myname").shadowRoot.querySelector("input").value; 
            const phone = this.querySelector(".phone").shadowRoot.querySelector("input").value;
            const location = this.querySelector(".find-cardInfo").shadowRoot.querySelector("input").value;
            const data = {petName,userId,firstName,phone,location};
            await state.sendReport(data);
            
        })
    }
    buttonClose(popUpWindow:HTMLDivElement,popUpWindowStyle:HTMLStyleElement,headerStyle:ShadowRoot,opacityComponent:HTMLStyleElement):void{
        this.querySelector(".close").addEventListener("click",(e)=>{
            e.preventDefault();
            this.removeChild(popUpWindow);
            this.removeChild(popUpWindowStyle);
            headerStyle.removeChild(opacityComponent)
        })
    }
}


customElements.define("home-page", initHome);