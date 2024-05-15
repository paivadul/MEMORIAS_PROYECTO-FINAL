import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../img/memorial_logo.png';
import './navbar.css';

import { AppContext } from '../context/AppProvider';

export const Navbar = () => {
    const { state, setState } = useContext(AppContext);
    const { user } = state;
    const navigate = useNavigate();

    const handleLogout = () => {
        // Eliminar la información del usuario del localStorage
        localStorage.removeItem('userToken');
        localStorage.removeItem('user');
        localStorage.removeItem('isAuthenticated');

        // Actualizar el estado global
        setState({
            ...state,
            user: null,
            isAuthenticated: false
        });

        // Redirigir al usuario al login
        navigate('/login');
    };

    return (
        <div className='cont-navbar'>
            <img className='logo' src={logo} alt="memorial-logo" />
            <div className='cont-link'>
                <Link className="link" to={`/inicio`}>Inicio</Link>
                <Link className="link" to={`/anecdotas`}>Anécdotas</Link>
                <Link className="link" to={`/visitas`}>Mural de Visitas</Link>
                <Link className="link" to={`/galeria`}>Galería</Link>
            </div>
            {user ? (
                <div>
                    <h4 className='user-name'>{user.firstName}</h4>
                    <p className='user-email'>{user.email}</p>
                    <button className="link" onClick={handleLogout}>Cerrar sesión</button>
                </div>
            ) : (
                <Link className="link" to={`/login`}>Iniciar sesión</Link>
            )}
        </div>
    );
};