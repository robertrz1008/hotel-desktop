import homeTemplate from "../frontend/views/home.js"
import clientTableTemplate from "../frontend/views/tables/clientTemplate.js"
import roomTemplate from "../frontend/views/tables/roomTemplate.js"
import servicesTemplate from "../frontend/views/tables/servicesTemplate.js"
import { hash, itensList } from "../utils/config.js"
import { itemSelect } from "../utils/functionsGlobal.js"

let appContent = document.getElementById("root")

let selectRoute;

// diccionario de rutas 
const routes = [
    {
        route:hash.home,
        li: itensList.home,
        template: homeTemplate()
    },
    {
        route:hash.clientsTable,
        li: itensList.tables,
        template: clientTableTemplate()
    },
    {
        route:hash.servicesTable,
        li: itensList.tables,
         template: servicesTemplate()
    },
    {
        route:hash.roomTable,
        li: itensList.tables,
        template: roomTemplate()
    },
    {
        route:hash.areaTable,
        li: itensList.tables,
        template: `<h1>loanRegister</h1>`
    },
]

function router(hash){
    appContent.innerHTML = ""
    const findtemplate = routes.filter((routeObj) => routeObj.route == hash)
    selectRoute = findtemplate[0].li
    appContent.appendChild(findtemplate[0].template)
    console.log(selectRoute)
    itemSelect(selectRoute)
}

export default router