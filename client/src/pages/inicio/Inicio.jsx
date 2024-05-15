import React, { useState, useContext, useEffect } from 'react';
import GlobalContext from '../../context/global-context';

// import { Link, useNavigate } from 'react-router-dom';

export const Inicio = () => {
    const { user, setUser } = useContext(GlobalContext);

    useEffect(() => {
        console.log('esto es user-inicio', user);
    }, [user])

    return (
        <>
            <h1> Inicio

            </h1>

        </>
    )
}
