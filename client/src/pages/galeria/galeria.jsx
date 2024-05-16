import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './galeria.css'

export const Galeria = () => {
    const [data, setData] = useState([]);

    const getAlldata = async () => {
        const userToken = localStorage.getItem('userToken');
        const config = {
            headers: {
                Authorization: `Bearer ${userToken}`
            }
        };
        try {
            const response = await axios.get('http://localhost:8060/api/anecdota/all', config);
            setData(response.data);
        } catch (error) {
            console.log(error);
            if (error.response && error.response.status === 401) {
                console.log('Refrescar token y reintentar');
            }
        }
    };

    useEffect(() => {
        getAlldata();
    }, []);

    return (
        <>
            <div className='cont-media'>
                <div className='all-media'>
                    {data.length > 0 ? (
                        <div className="cont-media">
                            {data.map((item, i) => (
                                <div className="card-media" key={i}>
                                    <h2>{item.titulo}</h2>
                                    <img src={item.media} alt={item.titulo} className="anecdota-media" />
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="vacio">
                            <h1>No hay media disponibles</h1>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};
