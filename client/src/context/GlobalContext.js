import { createContext } from "react";

//para toda la app quedará disponible estos datos. 
// El objeto user y la función setUser
export const GlobalContext = createContext({
    user: {},
    setUser: () => {},
})