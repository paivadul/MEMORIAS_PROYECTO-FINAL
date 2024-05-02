
import React, { useState } from 'react';
import axios from 'axios';
import { Form, Input, Button, message } from 'antd';
import { Link, useNavigate } from 'react-router-dom';

const API_URL = 'http://localhost:8080/api/v1/register'; // Replace with your backend URL

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const navigate = useNavigate();

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post(API_URL, formData);

      if (response.data.success) {
        message.success('Registro exitoso!');
        navigate('/'); // Redirect to home page on success
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      message.error('Error al registrarse'); // More user-friendly error message
    }
  };

  return (
    <div className="form-container">
      <Form layout="vertical" onFinish={handleSubmit} className="register-form">
        <h3 className="text-center">Formulario de Registro</h3>
        <Form.Item label="Nombre" name="name">
          <Input type="text" required value={formData.name} onChange={handleChange} />
        </Form.Item>
        <Form.Item label="Correo electrónico" name="email">
          <Input type="email" required value={formData.email} onChange={handleChange} />
        </Form.Item>
        <Form.Item label="Contraseña" name="password">
          <Input.Password required value={formData.password} onChange={handleChange} />
        </Form.Item>
        <Link to="/login" className="m-2">
          ¿Ya tienes una cuenta? Inicia sesión aquí
        </Link>
        <Button type="primary" htmlType="submit">
          Registrarse
        </Button>
      </Form>
    </div>
  );
};

export default Register;
