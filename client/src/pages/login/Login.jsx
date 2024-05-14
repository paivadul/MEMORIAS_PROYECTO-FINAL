import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css';
import GlobalContext from '../../context/global-context';

    export const Login = () => {
        const { user, setUser } = useContext(GlobalContext);
        const navigate = useNavigate();
        const [formData, setFormData] = useState({
            email: '',
            password: '',
        });

        const handleChange = (event) => {
            setFormData({ ...formData, [event.target.name]: event.target.value });
        };

        const handleSubmit = async (event) => {
            event.preventDefault();

            try {
                const response = await axios.post(`http://localhost:8060/api/login`, formData);
                localStorage.setItem('userToken', response.data.token);
                setUser(response.data.user)
                navigate('/inicio');
            } catch (error) {
                console.error('Error al iniciar sesión', error);
            }
        };

        useEffect( () => {
            console.log('esto es user', user);
        }, [user])

        return (
            <div className="login-container">
                <h1 className="login-title">MEMORIA</h1>
                <form onSubmit={handleSubmit} className="login-form">
                    <div>
                        <input
                            type="email"
                            name="email"
                            placeholder="Correo electrónico"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="login-input"
                        />
                    </div>
                    <div>
                        <input
                            type="password"
                            name="password"
                            placeholder="Contraseña"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            className="login-input"
                        />
                    </div>
                    <div>
                        <button type="submit" className="login-button">Iniciar Sesión</button>
                    </div>
                </form>
                <p>¿Aún no tienes una cuenta? <Link to="/register" className="login-link">Regístrate aquí</Link></p>
            </div>
        );
    };