import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import logo from '../img/memorial_logo.png';
import './navbar.css';
import axios from 'axios';

const NavBar = ({ token }) => {
    const [user, setUser] = useState(null);
    const { _id } = useParams();

    useEffect(() => {
        const getUser = async () => {
            try {
                const response = await axios.get(`http://localhost:8060/api/user/${_id}`, {
                    withCredentials: true,
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setUser(response.data);
            } catch (error) {
                console.error(error);
            }
        };
        getUser();
    }, [token]);

    console.log('esto es id', _id)
    useEffect(() => {
        console.log('esto es user', user);
    }, [user])

    return (
        <div className='cont-navbar'>
            <img className='logo' src={logo} alt="memorial-logo" />
            <div className='cont-link'>
                <Link className="link" to={`/inicio`}>Inicio</Link>
                <Link className="link" to={`/anecdotas`}>Anécdotas</Link>
                <Link className="link" to={`/visitas`}>Mural de Visitas</Link>
                <Link className="link" to={`/galeria`}>Galería</Link>
            </div>
            {user && (
                <div>
                    <h4 className='user-name'>{user.firstName}</h4>
                    <p className='user-email'>{user.email}</p>
                    <Link className="link" to={`/login`}>Cerrar sesión</Link>
                </div>
            )}
        </div>
    );
};

export default NavBar;
