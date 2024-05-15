import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { Form, Input, Button, notification } from 'antd';

export const Register = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const handleSubmit = async (values) => {
    try {
      const response = await axios.post('http://localhost:8060/api/register', values);
      if (response.data.data) {
        notification.success({
          message: 'Registro exitoso!',
          description: 'Tu cuenta ha sido creada con éxito.',
        });
        form.resetFields();
        // navigate('/');
      } else {
        notification.error({
          message: 'Registro fallido',
          description: response.data.error,
        });
      }
    } catch (error) {
      notification.error({
        message: 'Error en la carga de datos',
        description: error.response ? error.response.data.error : error.message,
      });
    }
  };

  return (
    <div className="form-container">
      <Form
        form={form}
        name="register"
        onFinish={handleSubmit}
        className="register-form"
        layout="vertical"
      >
        <h3 className="text-center">Formulario de Registro</h3>
        <Form.Item
          name="firstName"
          label="Nombre"
          rules={[{ required: true, message: 'Por favor ingresa tu nombre!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="lastName"
          label="Apellido"
          rules={[{ required: true, message: 'Por favor ingresa tu apellido!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="email"
          label="Correo electrónico"
          rules={[{ required: true, message: 'Por favor ingresa tu correo electrónico!' }]}
        >
          <Input type="email" />
        </Form.Item>
        <Form.Item
          name="password"
          label="Contraseña"
          rules={[{ required: true, message: 'Por favor ingresa tu contraseña!' }]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Registrarse
          </Button>
        </Form.Item>
      </Form>
      <p>¿Ya tienes una cuenta? <Link to="/login">Inicia sesión aquí</Link></p>
    </div>
  );
};
