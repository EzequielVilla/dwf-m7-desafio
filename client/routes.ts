import {Router} from "@vaadin/router"

const router = new Router(document.querySelector('.root'));
router.setRoutes([
    {path:'/', component: 'home-page'},
    {path:'/email', component: 'email-page'},
    {path:'/password', component:'password-page'},
    {path:'/reportFind', component:'report-find-page'},
    {path:'/reportLost', component:'report-lost-page'},
    {path:'/edit', component:'edit-page'},
    {path:'/myData', component:'edit-page'},
    {path:'/myPets', component:'pets-page'},
    {path:'/menu', component:'menu-page'},
    {path:'/editPet', component:'edit-pet-page'},
])