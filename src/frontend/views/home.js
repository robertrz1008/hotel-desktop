import { hash, selectRoute } from "../../utils/config.js";
import {
  appendChildList,
  navigation,
  setBoxLink,
  setButtonLink,
  setDiv,
  setTitleOrP,
} from "../../utils/functionsGlobal.js";
import router from "../../router/router.js";
import { clientsLength } from "../schema/entityCount.js";
import { getClientsRequest } from "../api/clientRequest.js";
import { getServicesRequest } from "../api/serviceRequest.js";
import { getRoomsRequest } from "../api/roomRequest.js";
import { getProcessRequest } from "../api/processRequest.js";

const div = setDiv("home-table-con");
const titleDiv = setDiv("title-con");
const title = setTitleOrP("h2", "Inicio del Sistema");
const name = setTitleOrP("P", "© 2024 | Roberto Ramirez - Facitec");
name.className = "copy-text";

const linksDiv = setDiv("links-con");
const roadersLink = setBoxLink(
  "roader-link box-link",
  ["fa-solid", "fa-user", "icon-link-box"],
  "Clientes",
  0
);
const booksLink = setBoxLink(
  "books-link box-link",
  ["fa-solid", "fa-key", "icon-link-box"],
  "Habitaciones",
  0
);
const servicesLink = setBoxLink(
  "loan-link box-link",
  ["fa-solid", "fa-bell-concierge", "icon-link-box"],
  "Consumiciones",
  0
);
const areaLink = setBoxLink(
  "area-link box-link",
  ["fa-solid", "fa-bed", "icon-link-box"],
  "Estadias",
  0
);

const appName = setTitleOrP("h2", "RoomsSys 1.1");
const devName = setTitleOrP("h3", "Desarrollador: Roberto Ramirez");
const appTextDiv = setDiv("app-text-con");

function isNumber(client, service, room, stay) {
  if (!Boolean(client)) {
    client = [];
  }
  if (!Boolean(service)) {
    service = [];
  }
  if (!Boolean(room)) {
    room = [];
  }
  if (!Boolean(stay)) {
    stay = [];
  }
}

export async function tablesCountFromHome() {
  linksDiv.innerHTML = ""
 try {
   let clientC = await getClientsRequest();
   let serviceC = await getServicesRequest();
   let roomC = await getRoomsRequest();
   let stayC = await getProcessRequest();
 
   roadersLink.firstElementChild.firstElementChild.textContent = clientC.length;
   servicesLink.firstElementChild.firstElementChild.textContent =serviceC.length;
   booksLink.firstElementChild.firstElementChild.textContent = roomC.length;
   areaLink.firstElementChild.firstElementChild.textContent = stayC.length;
 
   appendChildList(linksDiv, [roadersLink, booksLink, servicesLink, areaLink]);
 } catch (error) {
  appendChildList(linksDiv, [roadersLink, booksLink, servicesLink, areaLink]);
 }
}

export default function homeTemplate() {
  function events() {
    const navigate = (route) => {
      navigation(route);
      router(window.location.hash);
    };

    booksLink.addEventListener("click", () => {
      navigate(hash.roomTable);
    });
    roadersLink.addEventListener("click", () => {
      navigate(hash.clientsTable);
    });
    servicesLink.addEventListener("click", () => {
      navigate(hash.servicesTable);
    });
  }

  events();
  tablesCountFromHome();

  appendChildList(appTextDiv, [appName, devName]);

  titleDiv.appendChild(title);

  appendChildList(div, [titleDiv, linksDiv, appTextDiv, name]);

  return div;
}
