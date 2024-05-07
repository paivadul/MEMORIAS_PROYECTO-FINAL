import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const navBar = () => {
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
                <h4 className='user-name'>{data.name}</h4>
                <Link className="link" to={`/login`}>Cerrar sesión</Link>
            </div>
        </>
    )
}

export default navBar;