import "./routes"
import "./pages/home"
import "./pages/email"

import "./pages/edit"
import "./pages/password"
import "./pages/mypets"

import "./pages/report-lost"
import "./pages/menu"
import "./pages/editpet"
import "dotenv/config"




import { initInput } from "./components/input";
import { initButton } from "./components/button";
import { initCaption } from "./components/caption";
import { initHeader } from "./components/header";
import { initCard } from "./components/card/card"
import { state } from "./state"



function main(){
    state.initLocalStorage();
    initButton();
    initInput();
    initCaption();
    initHeader();
    initCard();
}

main();
