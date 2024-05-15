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
<<<<<<< HEAD:client/src/pages/inicio/Inicio.jsx
<h1>inicio</h1>
=======
            <h1> Inicio

            </h1>

>>>>>>> 4b1e4e4effa1dc54fa7b86a41c408de5a2350cc1:client/src/pages/inicio.jsx
        </>
    )
}
