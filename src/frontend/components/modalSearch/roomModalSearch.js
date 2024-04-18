import { appendChildList, closeConfirmModal, replaceClass, setButton, setDiv, setInputForm, setTitleOrP } from "../../../utils/functionsGlobal.js"
import {getRoomsByFilterRequest} from "../../api/roomRequest.js"
import roomList from "../list/roomModalSearchList.js"

function roomModalSearch({roomNameSelect}) {
    const div = setDiv("modal-search-con")
    const title = setTitleOrP("h4", "Seleccionar habitaciones")
    const tfSearch = setInputForm("","text", "buscar...")
    const listCon = setDiv("list-con")
    const nameDiv = setDiv("name-con")
    const nameP = setTitleOrP("p", `Seleccionado: `)
    const button = setButton("Agregar", "modal-search-btn-disable")
    let roomFound;
    let roomName = ""
    let roomId;
    div.innerHTML = ""
    button.disabled = true

    function buttonEnabled(roomFound){
        button.disabled = false;
        replaceClass(button, "modal-search-btn-disable", "modal-search-btn")
        roomName = roomFound.name
        nameP.textContent = "Seleccionado: "+roomFound.name
        roomId = roomFound.id
    }

    const renderList = async (filter) =>{
        roomFound = await getRoomsByFilterRequest(filter)
        roomFound = roomFound.filter(data => data.estado == 1)
        roomList({
            listCon, 
            roomFound,
            buttonEnabled
        })
    }
    function handleSearch(value){
        listCon.innerHTML = ""
        if(value.trim() == ""){
            return
        }
        renderList(value)
    }

    // events
    tfSearch.addEventListener("keyup", (e) => {
        const searchValue = tfSearch.lastElementChild.firstElementChild.value
        handleSearch(searchValue)
    })
    //
    button.addEventListener("click",() => {
        closeConfirmModal()
        roomNameSelect({
            id: roomId,
            name: roomName,
        })
    })


    //dom
    nameDiv.appendChild(nameP)
    appendChildList(div, [
        title,
        tfSearch,
        listCon,
        nameDiv,
        button
    ])
    return div
}

export default roomModalSearch