import React, { useState } from "react";
import './formVisits.css';
import axios from 'axios';

export const FormAnecdotas = () => {
    const [anecdota, setAnecdota] = useState({ titulo: '', fecha: '', descripcion: '', media: null });
    const [error, setError] = useState('');

    const anecdotaHandler = (e) => {
        const { name, value } = e.target;
        setAnecdota({ ...anecdota, [name]: value });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setAnecdota({ ...anecdota, media: file });
    };

    const sendanecdotaHandler = async (e) => {
        e.preventDefault();
        const userToken = localStorage.getItem('userToken');
        const formData = new FormData();
        formData.append('titulo', anecdota.titulo);
        formData.append('fecha', anecdota.fecha);
        formData.append('descripcion', anecdota.descripcion);
        formData.append('media', anecdota.media);

        const config = {
            headers: {
                Authorization: `Bearer ${userToken}`,
                'Content-Type': 'multipart/form-data'
            }
        };
        
        try {
            await axios.post('http://localhost:8060/api/anecdota/new', formData, config);
            setAnecdota({ titulo: '', fecha: '', descripcion: '', media: null });
        } catch (error) {
            setError(error.response?.data?.error || "Error al enviar los datos. Por favor, intente nuevamente.");
        }
    };

    return (
        <div className='form-container' >
            <form className="form-form" onSubmit={sendanecdotaHandler}>
                <label>
                    Titulo:
                    <input
                        className="form-input"
                        type="text"
                        name="titulo"
                        value={anecdota.titulo}
                        onChange={anecdotaHandler}
                        required
                    />
                </label>
                <label>
                    Fecha:
                    <input
                        className="form-input"
                        type="date"
                        name="fecha"
                        value={anecdota.fecha}
                        onChange={anecdotaHandler}
                        required
                    />
                </label>
                <label>
                    Descripcion:
                    <input
                        className="form-input"
                        type="text"
                        name="descripcion"
                        value={anecdota.descripcion}
                        onChange={anecdotaHandler}
                        required
                    />
                </label>
                <label>
                    Media:
                    <input
                        type="file"
                        name="media"
                        onChange={handleFileChange}
                        required
                    />
                </label>
                <button type="submit" className="sendButton">Publicar anecdotas</button>
                {error && <span>{error}</span>}
            </form>
        </div>
    )
}
