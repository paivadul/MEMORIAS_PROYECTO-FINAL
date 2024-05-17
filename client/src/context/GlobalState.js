import { useState } from "react";
import { GlobalContext } from "./GlobalContext";

export const GlobalState = (props) => {
    const [user, setUser] = useState({})

    return (
        <GlobalContext.Provider
            value = {
                {
                    user: user,
                    setUser: setUser,
                }
            }
        >
            {
                props.children
            }
        </GlobalContext.Provider>
    )
}