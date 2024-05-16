import React, { useState } from "react";
import './formVisits.css';
import axios from 'axios';


export const FormVisits = () => {
    const [nota, setNota] = useState({
        nombre: '',
        nota: '',
        media: ''
    });
    const [errors, setErrors] = useState({});

    const visitHandler = (e) => {
        const { name, value } = e.target;
        setNota({ ...nota, [name]: value });
        setErrors({ ...errors, [name]: '' });
        console.log(nota);
    };

    const sendNotaHandler = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:8060/api/visita/new', nota);
            setNota({
                nombre: '',
                nota: '',
                media: ''
            });
        } catch (error) {
            if (error.response && error.response.data && error.response.data.errors) {
                setErrors(error.response.data.errors);
            } else {
                console.error('Error al enviar los datos de la nota:', error.message);
                setErrors({ general: "Error al enviar los datos. Por favor, intente nuevamente." });
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
                    {errors.nombre && <span>{errors.nombre}</span>}
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
                    {errors.nota && <span>{errors.nota}</span>}
                </label>
                <label>
                    Media:
                    <input
                        type="file"
                        name="media"
                        value={nota.media || ""}
                        onChange={visitHandler}
                    />
                    {errors.media && <span>{errors.media}</span>}
                </label>
                <button type="submit" className="sendButton">Publicar notas</button>
            </form>
        </div>
    )
}