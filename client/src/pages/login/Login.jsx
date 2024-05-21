import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { AppContext } from '../../context/AppProvider';
import { Box, Button, TextField, Typography } from '@mui/material';
import '../../styles/loginRegister/loginRegister.css';

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
            navigate('/anecdotas');
        } catch (error) {
            console.error('Error al iniciar sesión', error);
            alert('Error al iniciar sesión, verifica tus credenciales');
        }
    };

    useEffect(() => {
        console.log('esto es user', state.user);
    }, [state.user]);

    return (
        <Box  sx={{ maxWidth: 400, margin: 'auto', mt: 8, p: 3, boxShadow: 3, borderRadius: 2, bgcolor: '#F2EBDF' }}>
            <Typography variant="h4" component="h1" gutterBottom>
                MEMORIA
            </Typography>
            <form onSubmit={handleSubmit}>
                <TextField
                    label="Correo electrónico"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="Contraseña"
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    fullWidth
                    margin="normal"
                />
                <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
                    Iniciar Sesión
                </Button>
            </form>
            <Typography variant="body2" sx={{ mt: 2 }}>
                ¿Aún no tienes una cuenta? <Link to="/register">Regístrate aquí</Link>
            </Typography>
        </Box>
    );
};
