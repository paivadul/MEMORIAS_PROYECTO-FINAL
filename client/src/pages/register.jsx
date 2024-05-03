import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
  const [data, setData] = useState({});
  const [error, setError] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
    setError({ ...error, [e.target.name]: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8060/api/register', data);
      console.log('response: ', response)
      if (response.data.data) {
        console.log('Registro exitoso!', response.data.data);
        setData({});
        // navigate('/');
      } else {
        console.error("Registro fallido: ", response.data.error);
        setError(response.data.error)
      }
    } catch (error) {
      if (error.response) {
        setError( 'Error en la carga de datos: ', error.response.data.error);
      } else {
        console.error(error.message);
      }
    }
  };

  return (
    <div className="form-container">
      <form className="register-form" onSubmit={handleSubmit}>
        <h3 className="text-center">Formulario de Registro</h3>

        <label htmlFor="name">
          Nombre: 
            <input
              required
              type="text" 
              value={data.firstName || ""}
              name="firstName"
              className="form-control"
              onChange={handleChange} />
        </label>
        <label htmlFor="name">
          Apellido: 
            <input
              required
              type="text" 
              value={data.lastName || ""}
              name="lastName"
              className="form-control"
              onChange={handleChange} />
        </label>
        <label htmlFor="email">
          Correo electrónico
            <input
              required
              type="email" 
              value={data.email || ""}
              name="email"
              className="form-control"
              onChange={handleChange} />
        </label>
        <label htmlFor="password">
          Contraseña
            <input
              required
              type="password" 
              value={data.password || ""}
              name="password"
              className="form-control"
              onChange={handleChange} />
        </label>

        <button type="submit" className="btn btn-primary">Registrarse</button>
        <Link to={`/login`} className="m-2">¿Ya tienes una cuenta? Inicia sesión aquí</Link>
      </form>
    </div>
  );
};

export default Register;
