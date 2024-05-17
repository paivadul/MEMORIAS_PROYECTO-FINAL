import React, { useContext, useEffect } from 'react';
import { GlobalContext } from '../../context/GlobalContext';

export const Home = () => {
    const { user, setUser } = useContext(GlobalContext);

    useEffect(() => {
    }, [user])

    return (
        <>
            <h1> Inicio

            </h1>

        </>
    )
}
