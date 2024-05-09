import React, { useState } from 'react';
// import { Form, Input, Button} from 'antd';
import FormVisits from '../../components/formVisits';
import NavBar from '../../components/navbar';

import axios from 'axios';
// import { Link, useNavigate } from 'react-router-dom';
const token = localStorage.getItem('token');

const Visitas = () => {
    const { notas, setNotas } = useState([])
    const { error, setError } = useState([])
    // const navigate = useNavigate()

    const publicarNotas = () => {
        if (!token) {
            console.log('No se encontró un token en el localStorage');
            return;
        }

        axios.get('http://localhost:8000/api/visita/new', {
            withCredentials: true,
            headers: {
                Authorization: `Bearer ${token}` // Incluir el token en el encabezado de autorización
            }
        })
            .then((response) => {
                setNotas(response.notas)
                setError()
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
        <NavBar token={token}/>
        <div className='form-visit'>
            <FormVisits notas={notas} error={error}/>
            <button onClick={publicarNotas} className="sendButton">Publicar notas</button>
        </div>
            <div className='all-notas'>
                {
                    notas && notas.length > 0 ? (
                        <div className="cont-notas">
                            {Object.keys(notas).map((key, i) => (
                                <notasData notas={notas[key]} key={i} />
                            ))}
                        </div>
                    ) : (
                        <div className="vacio">
                            <h1>No hay notas disponibles</h1>
                        </div>
                    )
                }
            </div>
        </>
    )
}

export default Visitas;