import { createContext } from "react";

//para toda la app quedará disponible estos datos. 
// El objeto user y la función setUser
const GlobalContext = createContext({
    user: {},
    setUser: () => {},
})

export default GlobalContext;