import router from "../router/router.js"
import { hash, selectRoute} from "../utils/config.js"
import { itemSelect, navigation } from "../utils/functionsGlobal.js"

window.addEventListener("load", () => {
  navigation(hash.home)
  router(window.location.hash)
})

window.addEventListener("hashchange", () =>{
  router(window.location.hash)
})


