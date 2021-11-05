import { Router } from "@vaadin/router";
import {Dropzone} from "dropzone";
import { state } from "../../state";
import { setCoordinates } from "./controller";
import {viewMap} from "./../../lib/mapbox"


class initReportLost extends HTMLElement {
  connectedCallback() {
    state.saveLocalStorage();
    this.render();
  }

  render() {
    const defaultImage = require("url:./../../img/default.svg")
    const style = document.createElement("style");
    style.textContent =
      `
            .container{
                display:flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                text-align: center;
                
            }
            h1{
                font-family: Poppins;
                font-size: 40px;
                font-weight: bold;             
            }
            .image{
              cursor:pointer;
              max-width:350px;
              max-height: 200px;
            }
            .name-comp{
              margin-bottom: 0px;
              font-size:20px;
            }
        `

    this.innerHTML =
      `
            <header-comp></header-comp>
            <div class="container">
                <h1>Reportar <br> mascota <br> perdida</h1>
                <caption-comp class="name-comp">Nombre</caption-comp>
                <input-comp class="name"></input-comp>
                <img class="image" src=${defaultImage}>
                <button-comp class="save-image">Agregar/modificar foto</button-comp>
                <div id="map" style="width: 250px; height: 250px"></div>
                <input-comp class="search" type="search"></input-comp>
                <caption-comp>Escribí un punto de referencia para reportar a tu mascota. Puede ser una dirección, un barrio o una ciudad.</caption-comp>
                <button-comp class="report-lost">Reportar como perdido</button-comp>
                <button-comp class="cancel">Cancelar</button-comp>
            </div>
            
            
            `
    this.appendChild(style);
    this.buttonsColor();
    this.dropzone();
    // viewMap();
    this.reportClick();
    this.cancelClick();
    
    
  }
  reportClick():void{
    const form = this.querySelector(".report-lost");
    
    
    form.addEventListener("click", async(e) => {
        e.preventDefault();
        await setCoordinates();
        const name = this.querySelector(".name").shadowRoot.querySelector("input").value;
        const location = this.querySelector(".search").shadowRoot.querySelector("input").value;
        const photo = state.getState().photo;
        const lat = state.getState().missedCoordinates.lat;
        const lng = state.getState().missedCoordinates.lng;
        const data = {name,photo,lat,lng,location}
        
        
        state.uploadMissedPet(data);
        Router.go("/")
    });

  }
  buttonsColor():void {
    const reportButton = this.querySelector(".report-lost").shadowRoot;
    const reportButtonStyle = document.createElement("style");
    reportButtonStyle.textContent =
      `
            .my-button{
                background-color: #FF9DF5;
            }
        `
    reportButton.appendChild(reportButtonStyle);

    const addButton = this.querySelector(".save-image").shadowRoot;
    const addButtonStyle = document.createElement("style");
    addButtonStyle.textContent =
      `
            .my-button{
                background-color: #97EA9F;
            }
        `
    addButton.appendChild(addButtonStyle);

  }
  dropzone():void{
    Dropzone.autoDiscover = false;
    let picture;
    let myDropzone = new Dropzone(".image",{
      url: "/falsa",
      autoProcessQueue: false,
    });
    myDropzone.on("addedfile", file => {
      picture = file;
    });
    this.querySelector(".save-image").addEventListener("click",(e)=>{
      e.preventDefault();      
      const photo = picture.dataURL;
      this.querySelector(".image").setAttribute("src", photo)
      state.getState().photo = photo;
    }) 
  }
  cancelClick():void{
    this.querySelector(".cancel").addEventListener("click",(e)=>{
      e.preventDefault();
      Router.go("/");
    })
  }
}


customElements.define("report-lost-page", initReportLost);