import { state } from "../../state";
import {mapboxClient} from "./../../lib/mapbox"

export async function setCoordinates(){
    const search = document.querySelector(".search").shadowRoot.querySelector("input").value;
    await mapboxClient.geocodeForward(
        search,
        {
            country: "ar",
            autocomplete: true,
            language: "es",
        },
        function (err, data, res) {
            const lng = (data.features[0].center[0]);
            const lat = (data.features[0].center[1]);
            state.getState().missedCoordinates.lat = lat;
            state.getState().missedCoordinates.lng = lng;
        }
    );
}

