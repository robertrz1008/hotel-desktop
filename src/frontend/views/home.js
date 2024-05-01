import { hash, selectRoute } from "../../utils/config.js"
import { appendChildList, navigation, setBoxLink, setButtonLink, setDiv, setTitleOrP } from "../../utils/functionsGlobal.js"
import router from "../../router/router.js"
import { clientsLength } from "../schema/entityCount.js"


export default function homeTemplate(){
    const div = setDiv("home-table-con")
    const titleDiv = setDiv("title-con")
    const title = setTitleOrP("h2", "Inicio del Sistema")
    const name = setTitleOrP("P", "© 2024 | Roberto Ramirez - Facitec")
    name.className = "copy-text"

    const linksDiv = setDiv("links-con")
    const roadersLink = setBoxLink("roader-link box-link", ["fa-solid", "fa-user", "icon-link-box"], "Clientes", parseInt(clientsLength()))
    const booksLink = setBoxLink("books-link box-link", ["fa-solid", "fa-key", "icon-link-box"], "Habitaciones", 16)
    const servicesLink = setBoxLink("loan-link box-link", ["fa-solid", "fa-bell-concierge", "icon-link-box"], "Servicios", 20)
    const areaLink = setBoxLink("area-link box-link", ["fa-solid", "fa-bed",  "icon-link-box"], "Estadia", 10)

    const appName = setTitleOrP("h2", "RoomsSys 1.1")
    const devName = setTitleOrP("h3", "Desarrollador: Roberto Ramirez")
    const appTextDiv = setDiv("app-text-con")

    function events(){

        const navigate = (route) => {
            navigation(route)
            router(window.location.hash)
        }

        booksLink.addEventListener("click", () =>{
            navigate(hash.roomTable)
        })
        roadersLink.addEventListener("click", () =>{
            navigate(hash.clientsTable)
        })
        servicesLink.addEventListener("click", () =>{
            navigate(hash.servicesTable)
        })
    }

    events()

    appendChildList(appTextDiv, [
        appName,
        devName
    ])

    titleDiv.appendChild(title)
    appendChildList(linksDiv, [
        roadersLink,
        booksLink,
        servicesLink,
        areaLink,
    ])
    appendChildList(div, [
        titleDiv,
        linksDiv,
        appTextDiv,
        name
    ])

    return div
}