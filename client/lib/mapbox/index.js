const MAPBOX_TOKEN = process.env.MAPBOX_TOKEN;
const mapboxClient = new MapboxClient(MAPBOX_TOKEN);
export { mapboxClient };
import { state } from "../../state";

export function viewMap() {
  window.map = initMap();
}

function initMap() {
  mapboxgl.accessToken = MAPBOX_TOKEN;
  return new mapboxgl.Map({
    container: "map",
    style: "mapbox://styles/mapbox/streets-v11",
    center: [-69.9863687, -39.6540309],
    zoom: 2
  });
}

