import router from "../router/router.js"
import { hash} from "../utils/config.js"
import { navigation } from "../utils/functionsGlobal.js"


window.addEventListener("load", () => {
  navigation(hash.home)
  router(window.location.hash)
})

window.addEventListener("hashchange", () =>{
  router(window.location.hash)
})


