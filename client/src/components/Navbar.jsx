import React, { useContext } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import logo from '../img/memorial_logo.png';
import { AppBar, Toolbar, Typography, Button, ThemeProvider } from '@mui/material';
import { createTheme } from '@mui/material/styles'; // Importa createTheme
import theme from '../theme/theme';

import { AppContext } from '../context/AppProvider';

const customTheme = createTheme(theme); // Crea el tema personalizado

export const Navbar = () => {
    const { state, setState } = useContext(AppContext);
    const { user } = state;
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('userToken');
        localStorage.removeItem('user');
        localStorage.removeItem('isAuthenticated');
        setState({
            ...state,
            user: null,
            isAuthenticated: false
        });
        navigate('/login');
    };

    return (
        <ThemeProvider theme={customTheme}> {/* Usa el tema personalizado aquí */}
            <AppBar position="static" sx={{ backgroundColor: customTheme.palette.primary.main }}>
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        <RouterLink to="/">
                            <img className='logo' src={logo} alt="memorial-logo" style={{ width: '150px', height: 'auto' }} /> {/* Ajusta el tamaño de la imagen aquí */}
                        </RouterLink>
                    </Typography>
                    <div className='cont-link'>
                        <Button component={RouterLink} to="/anecdotas" variant="text" sx={{ color: customTheme.palette.details.main, mr: 2 }}>Anécdotas</Button>
                        <Button component={RouterLink} to="/visitas" variant="text" sx={{ color: customTheme.palette.details.main, mr: 2 }}>Mural de Visitas</Button>
                        <Button component={RouterLink} to="/galeria" variant="text" sx={{ color: customTheme.palette.details.main, mr: 2 }}>Galería</Button>
                        <Button component={RouterLink} to="/usuario" variant="text" sx={{ color: customTheme.palette.details.main, mr: 2 }}>Usuario</Button>
                    </div>
                    {user ? (
                        <div className='navbar-button'>
                            <Typography variant="body1" sx={{ color: customTheme.palette.details.main, mr: 2 }}>{`${user.firstName.charAt(0).toUpperCase() + user.firstName.slice(1)} ${user.lastName.charAt(0).toUpperCase() + user.lastName.slice(1)}`}</Typography>
                            <Button variant="contained" sx={{ backgroundColor: customTheme.palette.secondary.main, color: '#FFFFFF' }} onClick={handleLogout}>Cerrar sesión</Button>
                        </div>
                    ) : (
                        <Button component={RouterLink} to="/login" variant="contained" sx={{ backgroundColor: customTheme.palette.secondary.main, color: '#FFFFFF' }}>Iniciar sesión</Button>
                    )}
                </Toolbar>
            </AppBar>
        </ThemeProvider>
    );
};
