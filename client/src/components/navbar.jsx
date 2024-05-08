import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const navBar = () => {

    // const {data, setData} = useState()
            
    // const getUser = () => {
    //     if (!token) {
    //         console.log('No se encontró un token en el localStorage');
    //         return;
    //     }

    //     axios.get('http://localhost:8000/', {
    //         withCredentials: true,
    //         headers: {
    //             Authorization: `Bearer ${token}` // Incluir el token en el encabezado de autorización
    //         }
    //     })
    //         .then((response) => {
    //             setEvents(response.data);
    //         })
    //         .catch((error) => {
    //             console.log(error);
    //             if (error.response && error.response.status === 401) {
    //                 console.log('Refrescar token y reintentar');
    //             }
    //         });
    // };

    return (
        <>
            <img className='logo'/>
            <div>
                <Link className="link" to={`/inicio`}>Inicio</Link>
                <Link className="link" to={`/anecdotas`}>Anécdotas</Link>
                <Link className="link" to={`/visitas`}>Mural de Visitas</Link>
                <Link className="link" to={`/galeria`}>Galería</Link>
            </div>
            <div>
                <h4 className='user-name'>nombre de usuario aquí</h4>
                <Link className="link" to={`/login`}>Cerrar sesión</Link>
            </div>
        </>
    )
}

export default navBar;