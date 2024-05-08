import React, { useState } from 'react';
// import { Form, Input, Button} from 'antd';

import axios from 'axios';
// import { Link, useNavigate } from 'react-router-dom';
const token = localStorage.getItem('token');

const Visitas = () => {
    const { data, setData } = useState([])
    const { error, setError } = useState([])
    const { events, setEvents } = useState([])
    // const navigate = useNavigate()

    const visitHandler = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        });
        setError({ ...error, [e.target.name]: '' });
    }

    const publicarNota = () => {
        if (!token) {
            console.log('No se encontró un token en el localStorage');
            return;
        }

        axios.get('http://localhost:8000/api/visita/all', {
            withCredentials: true,
            headers: {
                Authorization: `Bearer ${token}` // Incluir el token en el encabezado de autorización
            }
        })
            .then((response) => {
                setEvents(response.data);
            })
            .catch((error) => {
                console.log(error);
                if (error.response && error.response.status === 401) {
                    console.log('Refrescar token y reintentar');
                }
            });
    };


    return (
        <>
            <div className='cont-nota'>
                <form>
                    <label>
                        Nombre:
                        <input
                            type="text"
                            name="nombre"
                            value={data.nombre || ""}
                            onChange={visitHandler}
                            rules={[{ required: true, message: 'Por favor ingrese su nombre!' }]}
                        />
                        {error.firstName && <span>{error.firstName}</span>}
                    </label>
                    <label>
                        Nota:
                        <input
                            type="text"
                            name="nota"
                            value={data.nota || ""}
                            onChange={visitHandler}
                            rules={[{ required: true, message: 'Por favor ingrese su nota!' }]}
                        />
                        {error.firstName && <span>{error.firstName}</span>}
                    </label>
                    <label>
                        Media:
                        <input
                            type="file"
                            name="media"
                            value={data.media || ""}
                            onChange={visitHandler}
                        />
                        {error.firstName && <span>{error.firstName}</span>}
                    </label>
                    <button onClick={publicarNota} className="sendButton">Publicar nota</button>
                </form>
            </div>

            <div className='all-notas'>
                {
                    data && data.length > 0 ? (
                        <div className="cont-data">
                            {Object.keys(data).map((key, i) => (
                                <notaData nota={data[key]} key={i} />
                            ))}
                        </div>
                    ) : (
                        <div className="vacio">
                            <h1>No hay data disponibles</h1>
                        </div>
                    )
                }
            </div>
        </>
    )
}

export default Visitas;