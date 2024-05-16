import React, { useState } from 'react';
import axios from 'axios';
import { FormVisits } from '../../components/formVisits';

export const Visitas = () => {
    const [notas, setNotas] = useState([]);
    const [error, setError] = useState('');

    const visitHandler = (e) => {
        const { name, value } = e.target;
        setNotas((prevNotas) => ({ ...prevNotas, [name]: value }));
    };

    const publicarNotas = () => {
        const userToken = localStorage.getItem('userToken');
        const config = {
            headers: {
                Authorization: `Bearer ${userToken}`
            }
        };

        axios.post('http://localhost:8060/api/visita/new', notas, config)
            .then((response) => {
                // setNotas(response.data.notas);
                setError('');
                console.log(notas);
            })
            .catch((error) => {
                console.log(error);
                if (error.response && error.response.status === 401) {
                    console.log('Refrescar token y reintentar');
                }
                setError('Error al obtener las notas');
            });
    };


    return (
        <>
            <div className='form-visit'>
                <FormVisits notas={notas} error={error} visitHandler={visitHandler} />
                <button onClick={publicarNotas} className="sendButton">Publicar notas</button>
            </div>
            <div className='all-notas'>
                {notas && notas.length > 0 ? (
                    <div className="cont-notas">
                        {notas.map((nota, index) => (
                            <div key={index}>
                                <p>Nombre: {nota.nombre}</p>
                                <p>Nota: {nota.nota}</p>
                                {/* Aquí puedes mostrar la media si la necesitas */}
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="vacio">
                        <h1>No hay notas disponibles</h1>
                    </div>
                )}
            </div>
        </>
    );
};
