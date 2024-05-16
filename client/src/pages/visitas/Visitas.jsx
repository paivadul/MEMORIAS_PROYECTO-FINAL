import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FormVisits, NotasData } from '../../components';

import './visitas.css';

export const Visitas = () => {
    const [ notas, setNotas] = useState([])

    
    const getAllNotas = () => {
        axios.get('http://localhost:8060/api/visita/all')
        .then((response) => {
            setNotas(response.data);
        })
        .catch((error) => {
            console.log(error);
            if (error.response && error.response.status === 401) {
                console.log('Refrescar token y reintentar');
            }
        });
    };
    
    useEffect(() => {
        getAllNotas();
    }, []);
    console.log('esto es notas:',notas)

    return (
        <>
            <div className='cont-all-visit'>
                <div className='form-visit'>
                    <FormVisits />
                </div>
                <div className='all-notas'>
                    {notas ? (
                        <div className="cont-notas">
                            {Object.keys(notas).map((key, i) => (
                                <NotasData notas={notas[key]} key={i} />
                            ))}
                        </div>
                    ) : (
                        <div className="vacio">
                            <h1>No hay notas disponibles</h1>
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}