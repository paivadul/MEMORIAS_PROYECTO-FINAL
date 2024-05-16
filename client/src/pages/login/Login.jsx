// src/pages/login/Login.js
import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css';
import { AppContext } from '../../context/AppProvider';

export const Login = () => {
    const { state, setState } = useContext(AppContext);
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
            const response = await axios.post('http://localhost:8060/api/login', formData);
            localStorage.setItem('userToken', response.data.token);
            localStorage.setItem('user', JSON.stringify(response.data.user));
            localStorage.setItem('isAuthenticated', 'true');
            setState({
                ...state,
                user: response.data.user,
                isAuthenticated: true,
            });
            navigate('/inicio');
        } catch (error) {
            console.error('Error al iniciar sesión', error);
            alert('Error al iniciar sesión, verifica tus credenciales');
        }
    };
    

    useEffect(() => {
        console.log('esto es user', state.user);
    }, [state.user]);

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
