
import { Router } from "@vaadin/router";
import {Dropzone} from "dropzone";
import { state } from "../../state";
import { setCoordinates } from "./controller";
import {viewMap} from "./../../lib/mapbox"


class initEditPet extends HTMLElement{
    connectedCallback():void{
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
            `
    
        this.innerHTML =
          `
                <header-comp></header-comp>
                <div class="container">
                    <h1>Reportar <br> mascota <br> perdida</h1>
                    <caption-comp>Nombre</caption-comp>
                    <input-comp class="name"></input-comp>
                    <img class="image" src=${defaultImage}>
                    <button-comp class="save-image">Agregar/modificar foto</button-comp>
                    <div id="map" style="width: 250px; height: 250px"></div>
                    <input-comp class="search" type="search"></input-comp>
                    <caption-comp>Escribí un punto de referencia para reportar a tu mascota. Puede ser una dirección, un barrio o una ciudad.</caption-comp>
                    <button-comp class="save-button">Guardar</button-comp>
                    <button-comp class="finded-button">Reportar como encontrado</button-comp>
                </div>
                
                
                `
        this.appendChild(style);
        this.buttonsColor();
        this.dropzone();
        viewMap();
        this.saveClick();
        this.findedClick();
        
        
        
      }
      saveClick():void{
        const form = this.querySelector(".save-button");

        
        form.addEventListener("click", async(e) => {
            e.preventDefault();
            await setCoordinates();
            const name = this.querySelector(".name").shadowRoot.querySelector("input").value;
            const location = this.querySelector(".search").shadowRoot.querySelector("input").value;
            const photo = state.getState().photo;
            const lat = state.getState().missedCoordinates.lat;
            const lng = state.getState().missedCoordinates.lng;
            const id = state.getState().photoId;
            const data = {name,photo,lat,lng,location}
            
            
            await state.updateMissedPet(data,id);
            Router.go("/")
        });
    
      }
      //borrar el animal con el id de la base de datos
      findedClick():void{
        this.querySelector(".finded-button").addEventListener("click",(e)=>{
          e.preventDefault();
          const id = state.getState().photoId;
          state.deletePet(id);
          Router.go("/");
        })
      }
      
      buttonsColor():void {
        const saveButton = this.querySelector(".save-button").shadowRoot;
        const saveButtonStyle = document.createElement("style");
        saveButtonStyle.textContent =
          `
                .my-button{
                    background-color: #FF9DF5;
                }
            `
        saveButton.appendChild(saveButtonStyle);
        const addButton = this.querySelector(".save-image").shadowRoot;
        const addButtonStyle = document.createElement("style");
        addButtonStyle.textContent =
            `
                .my-button{
                    background-color: #97EA9F;
                }
            `
        addButton.appendChild(addButtonStyle);
        const findedButton = this.querySelector(".finded-button").shadowRoot;
        const findedButtonStyle = document.createElement("style");
        findedButtonStyle.textContent =
            `
                .my-button{
                    background-color: #97EA9F;
                }
            `      
        findedButton.appendChild(findedButtonStyle);
    
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
}


customElements.define("edit-pet-page", initEditPet);