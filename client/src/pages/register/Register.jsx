import React from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { Box, Button, TextField, Typography } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import '../../styles/loginRegister/loginRegister.css';

export const Register = () => {
    const navigate = useNavigate();
    const { control, handleSubmit, reset } = useForm();

    const onSubmit = async (values) => {
        try {
            const response = await axios.post('http://localhost:8060/api/register', values);
            if (response.data.data) {
                alert('Registro exitoso! Tu cuenta ha sido creada con éxito.');
                reset();
                navigate('/login');
            } else {
                alert('Registro fallido: ' + response.data.error);
            }
        } catch (error) {
            alert('Error en la carga de datos: ' + (error.response ? error.response.data.error : error.message));
        }
    };

    return (
        <Box sx={{ maxWidth: 400, margin: 'auto', mt: 8, p: 3, boxShadow: 3, borderRadius: 2, bgcolor: '#F2EBDF' }}>
            <Typography variant="h4" component="h1" gutterBottom>
                Formulario de Registro
            </Typography>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Controller
                    name="firstName"
                    control={control}
                    defaultValue=""
                    rules={{ required: 'Por favor ingresa tu nombre!' }}
                    render={({ field, fieldState }) => (
                        <TextField
                            {...field}
                            label="Nombre"
                            fullWidth
                            margin="normal"
                            error={!!fieldState.error}
                            helperText={fieldState.error?.message}
                        />
                    )}
                />
                <Controller
                    name="lastName"
                    control={control}
                    defaultValue=""
                    rules={{ required: 'Por favor ingresa tu apellido!' }}
                    render={({ field, fieldState }) => (
                        <TextField
                            {...field}
                            label="Apellido"
                            fullWidth
                            margin="normal"
                            error={!!fieldState.error}
                            helperText={fieldState.error?.message}
                        />
                    )}
                />
                <Controller
                    name="email"
                    control={control}
                    defaultValue=""
                    rules={{ required: 'Por favor ingresa tu correo electrónico!' }}
                    render={({ field, fieldState }) => (
                        <TextField
                            {...field}
                            label="Correo electrónico"
                            type="email"
                            fullWidth
                            margin="normal"
                            error={!!fieldState.error}
                            helperText={fieldState.error?.message}
                        />
                    )}
                />
                <Controller
                    name="password"
                    control={control}
                    defaultValue=""
                    rules={{ required: 'Por favor ingresa tu contraseña!' }}
                    render={({ field, fieldState }) => (
                        <TextField
                            {...field}
                            label="Contraseña"
                            type="password"
                            fullWidth
                            margin="normal"
                            error={!!fieldState.error}
                            helperText={fieldState.error?.message}
                        />
                    )}
                />
                <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
                    Registrarse
                </Button>
            </form>
            <Typography variant="body2" sx={{ mt: 2 }}>
                ¿Ya tienes una cuenta? <Link to="/login">Inicia sesión aquí</Link>
            </Typography>
        </Box>
    );
};
