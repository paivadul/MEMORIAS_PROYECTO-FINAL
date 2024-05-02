import React, { useState } from 'react';
import axios from 'axios';
import { Form, Input, Button, message } from 'antd';
import { Link, useNavigate } from 'react-router-dom';

const API_URL = 'http://localhost:8080/api/v1'; // URL of your Node.js server

const Login = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const handleChange = (event) => {
        setFormData({ ...formData, [event.target.name]: event.target.value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault(); // Prevent default form submission behavior

        try {
            const response = await axios.post(`/login`, formData);
            console.log(response.data); // Handle successful login response

            // Assuming your backend returns a token on successful login:
            const token = response.data.token; // Extract the token from the response
            localStorage.setItem('userToken', token); // Store the token in local storage

            message.success('Inicio de sesión exitoso');
            navigate('/home'); // Redirect to the home page or a protected route
        } catch (error) {
            console.error(error);
            message.error('Error al iniciar sesión');
        }
    };

    return (
        <div className="form-container">
            <h1>Iniciar sesión</h1>
            <Form layout="vertical" onSubmit={handleSubmit}>
                <Form.Item
                    label="Email"
                    name="email"
                    rules={[{ required: true, message: 'Por favor ingresa tu email' }]}
                >
                    <Input value={formData.email} onChange={handleChange} />
                </Form.Item>
                <Form.Item
                    label="Contraseña"
                    name="password"
                    rules={[{ required: true, message: 'Por favor ingresa tu contraseña' }]}
                >
                    <Input.Password value={formData.password} onChange={handleChange} />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Iniciar sesión
                    </Button>
                </Form.Item>
                <Link to="/register">¿Aún no tienes una cuenta? Regístrate aquí</Link>
            </Form>
        </div>
    );
};

export default Login;
