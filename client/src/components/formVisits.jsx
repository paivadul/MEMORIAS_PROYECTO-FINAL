import React, { useState } from "react";
import './formVisits.css';
import axios from 'axios';

export const FormVisits = () => {
    const [nota, setNota] = useState([]);
    const [error, setError] = useState('');

    const visitHandler = (e) => {
        const { name, value } = e.target;
        setNota({ ...nota, [name]: value });
        setError({ ...error, [name]: '' });
    };

    const sendNotaHandler = async (e) => {
        e.preventDefault();
        const userToken = localStorage.getItem('userToken');
        const config = {
            headers: {
                Authorization: `Bearer ${userToken}`
            }
        };
        try {
            await axios.post('http://localhost:8060/api/visita/new', nota, config);
            setNota(nota);
            console.log(nota)
        } catch (error) {
            if (error.response && error.response.data && error.response.data.error) {
                setError(error.response.data.error);
            } else {
                setError({ general: "Error al enviar los datos. Por favor, intente nuevamente." });
            }
        }
    };

    return (
        <div className='form-container'>
            <form className="form-form" onSubmit={sendNotaHandler}>
                <label>
                    Nombre:
                    <input
                        className="form-input"
                        type="text"
                        name="nombre"
                        value={nota.nombre || ""}
                        onChange={visitHandler}
                        rules={[{ required: true, message: 'Por favor ingrese su nombre!' }]}
                    />
                    {error.nombre && <span>{error.nombre}</span>}
                </label>
                <label>
                    Nota:
                    <input
                        className="form-input"
                        type="text"
                        name="nota"
                        value={nota.nota || ""}
                        onChange={visitHandler}
                        rules={[{ required: true, message: 'Por favor ingrese su nota!' }]}
                    />
                    {error.nota && <span>{error.nota}</span>}
                </label>
                <label>
                    Media:
                    <input
                        type="file"
                        name="media"
                        value={nota.media || ""}
                        onChange={visitHandler}
                    />
                    {error.media && <span>{error.media}</span>}
                </label>
                <button type="submit" className="sendButton">Publicar notas</button>
            </form>
        </div>
    )
}