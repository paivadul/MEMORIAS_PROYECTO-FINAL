import React, { useContext, useEffect } from 'react';
import { GlobalContext } from "../../context/GlobalContext";

export const Usuario = () => {
    const { user } = useContext(GlobalContext);

    useEffect(() => {
    }, [user])

    return (
        <>
            <h1>Usuario</h1>
        </>
    )
}