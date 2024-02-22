import homeTemplate from "../frontend/views/home.js"
import clientTableTemplate from "../frontend/views/tables/clientTemplate.js"
import { hash } from "../utils/config.js"

let appContent = document.getElementById("root")

// diccionario de rutas 
const routes = [
    {
        route:hash.home,
        template: homeTemplate()
    },
    {
        route:hash.clientsTable,
        template: clientTableTemplate()
    },
    {
        route:hash.booksTable,
         template: `<h1>loanRegister</h1>`
    },
    {
        route:hash.readerTable,
        template: `<h1>loanRegister</h1>`
    },
    {
        route:hash.areaTable,
        template: `<h1>loanRegister</h1>`
    },
]

function router(hash){
    appContent.innerHTML = ""
    let findtemplate = routes.filter((routeObj) => routeObj.route == hash)

    appContent.appendChild(findtemplate[0].template)

}

export default router