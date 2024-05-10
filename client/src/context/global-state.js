import GlobalContext from "./global-context";
import { useState } from "react";

const GlobalState = (props) => {
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

export default GlobalState;