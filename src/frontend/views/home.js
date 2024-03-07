import { hash, selectRoute } from "../../utils/config.js"
import { appendChildList, navigation, setBoxLink, setButtonLink, setDiv, setTitleOrP } from "../../utils/functionsGlobal.js"
import router from "../../router/router.js"


export default function homeTemplate(){
    const div = setDiv("home-table-con")
    const titleDiv = setDiv("title-con")
    const title = setTitleOrP("h2", "Inicio del Sistema")
    const name = setTitleOrP("P", "© 2024 | Roberto Ramirez")
    name.className = "copy-text"

    const linksDiv = setDiv("links-con")
    const roadersLink = setBoxLink("roader-link box-link", ["fa-solid", "fa-user", "icon-link-box"], "Clientes", 30)
    const booksLink = setBoxLink("books-link box-link", ["fa-solid", "fa-key", "icon-link-box"], "Habitaciones", 16)
    const loanLink = setBoxLink("loan-link box-link", ["fa-solid", "fa-bell-concierge", "icon-link-box"], "Servicios", 20)
    const areaLink = setBoxLink("area-link box-link", ["fa-solid", "fa-bed",  "icon-link-box"], "Estadia", 10)

    function events(){

        const navigate = (route) => {
            navigation(route)
            router(window.location.hash)
        }

        booksLink.addEventListener("click", () =>{
            navigate(hash.booksTable)
        })
        roadersLink.addEventListener("click", () =>{
            navigate(hash.clientsTable)
        })
        booksLink.addEventListener("click", () =>{
            navigate(hash.booksTable)
        })
    }

    events()

    titleDiv.appendChild(title)
    appendChildList(linksDiv, [
        roadersLink,
        booksLink,
        loanLink,
        areaLink,
    ])
    appendChildList(div, [
        titleDiv,
        linksDiv,
        name
    ])

    return div
}