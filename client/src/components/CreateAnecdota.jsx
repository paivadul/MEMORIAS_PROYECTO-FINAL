import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../styles/components/createAnecdota.css'; // Asegúrate de importar tu archivo de estilos CSS

export const CreateAnecdota = () => {
  const [formData, setFormData] = useState({
    titulo: '',
    descripcion: '',
    fecha: '',
    media: null
  });
    const [error, setError] = useState('');
    

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setFormData({ ...formData, media: file });
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      const userToken = localStorage.getItem('userToken');
      const data = new FormData();
      data.append('titulo', formData.titulo);
      data.append('descripcion', formData.descripcion);
      data.append('fecha', formData.fecha);
      data.append('media', formData.media);
  
      const config = {
          headers: {
              Authorization: `Bearer ${userToken}`,
              'Content-Type': 'multipart/form-data'
          }
      };
      
      try {
          await axios.post('http://localhost:8060/api/anecdota/new', data, config);
          setFormData({ titulo: '', descripcion: '', fecha: '', media: null});
      } catch (error) {
          setError(error.response?.data?.error || "Error al enviar los datos. Por favor, intente nuevamente.");
      }
  };
  
  
  

  return (
    <>
      <header className='header_crear'>
        <h1>Crear Anécdota</h1>
      </header>
      <form className='form_anecdota' onSubmit={handleSubmit}>
        <div className='form-group'>
          <label htmlFor='titulo'>Título</label>
          <input type='text' id='titulo' name='titulo' className='form-control' value={formData.titulo} onChange={handleChange} />
        </div>
        <div className='form-group'>
          <label htmlFor='descripcion'>Descripción</label>
          <textarea id='descripcion' name='descripcion' className='form-control' value={formData.descripcion} onChange={handleChange} />
        </div>
        <div className='form-group'>
          <label htmlFor='fecha'>Fecha</label>
          <input type='date' id='fecha' name='fecha' className='form-control' value={formData.fecha} onChange={handleChange} />
        </div>
        <div className='form-group'>
          <label htmlFor='media'>Imagen</label>
          <input type='file' id='media' name='media' className='form-control-file' onChange={handleFileChange} />
        </div>
        <div className='formbuttons'>
        <button type='submit' className='btn'>Crear Anécdota</button>
        <Link to="/anecdotas" className="link-anecdotas">Ver Anécdotas</Link>
        </div>
        {error && <span>{error}</span>}
      </form>
    </>
  );
}
