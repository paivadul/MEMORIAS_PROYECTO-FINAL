import React, { useEffect, useState } from 'react';
import { Link, useParams} from 'react-router-dom';
import logo from '../img/memorial_logo.png'
import './navbar.css';
import axios from 'axios';

const NavBar = ({ token }) => {
    const [user, setUser] = useState(null);
    const { id } = useParams();
            
    const getUserById = async () => {
            try {
                const response = await axios.get(`http://localhost:8060/api/user/${id}`, {
                    withCredentials: true,
                    headers: {
                        Authorization: `Bearer ${token}` // Incluir el token en el encabezado de autorización
                    }
                })
                setUser(response.data)
            } catch (error) {
                console.error(error)
            }
    };

    useEffect(() => {
        getUserById()
    }, [])

    useEffect(() => {
        console.log(user);
    }, [user])

    return (
        <div className='cont-navbar'>
            <img className='logo' src={logo} alt="memorial-logo"  />
            <div className='cont-link'>
                <Link className="link" to={`/inicio`}>Inicio</Link>
                <Link className="link" to={`/anecdotas`}>Anécdotas</Link>
                <Link className="link" to={`/visitas`}>Mural de Visitas</Link>
                <Link className="link" to={`/galeria`}>Galería</Link>
            </div>
                <div>
                    <h4 className='user-name'>{user.firstName}</h4>
                    <p className='user-email'>{user.email}</p>
                    <Link className="link" to={`/login`}>Cerrar sesión</Link>
                </div>
        </div>
    )
}

export default NavBar;