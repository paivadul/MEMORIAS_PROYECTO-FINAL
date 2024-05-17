import React, { useState } from "react";
import './formVisits.css';
import axios from 'axios';

export const FormVisits = () => {
    const [nota, setNota] = useState({ nombre: '', nota: '', media: null });
    const [error, setError] = useState('');

    const visitHandler = (e) => {
        const { name, value } = e.target;
        setNota({ ...nota, [name]: value });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setNota({ ...nota, media: file });
    };

    const sendNotaHandler = async (e) => {
        e.preventDefault();
        const userToken = localStorage.getItem('userToken');
        const formData = new FormData();
        formData.append('nombre', nota.nombre);
        formData.append('nota', nota.nota);
        formData.append('media', nota.media);

        const config = {
            headers: {
                Authorization: `Bearer ${userToken}`,
                'Content-Type': 'multipart/form-data'
            }
        };

        try {
            await axios.post('http://localhost:8060/api/visita/new', formData, config);
            setNota({ nombre: '', nota: '', media: null });
        } catch (error) {
            setError(error.response?.data?.error || "Error al enviar los datos. Por favor, intente nuevamente.");
        }
    };

    return (
        <div className='form-container' >
            <form className="form-form" onSubmit={sendNotaHandler}>
                <label>
                    Nombre:
                    <input
                        className="form-input"
                        type="text"
                        name="nombre"
                        value={nota.nombre}
                        onChange={visitHandler}
                        required
                    />
                </label>
                <label>
                    Nota:
                    <input
                        className="form-input"
                        type="text"
                        name="nota"
                        value={nota.nota}
                        onChange={visitHandler}
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
                <button type="submit" className="sendButton">Publicar notas</button>
                {error && <span>{error}</span>}
            </form>
        </div>
    )
}

console.log("onichan para que se acualite el componente")