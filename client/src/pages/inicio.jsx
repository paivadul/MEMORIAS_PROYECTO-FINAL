import React, { useState, useContext, useEffect } from 'react';
import GlobalContext from '../context/global-context';

// import { Link, useNavigate } from 'react-router-dom';

const Inicio = () => {
    const { user, setUser } = useContext(GlobalContext);

    useEffect( () => {
        console.log('esto es user-inicio', user);
    }, [user])

    return (
        <>

        </>
    )
}

export default Inicio;