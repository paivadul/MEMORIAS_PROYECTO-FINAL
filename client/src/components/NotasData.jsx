import React from 'react'
import './notasData.css';

export const NotasData = ({ notas }) => {

    return (
        <div className='notas-card'>
            <div>
                <h4>{notas.nombre}</h4>
                <p>{notas.nota}</p>
            </div>
            {
                notas.media ? (
                    <img src={`http://localhost:8060/static/${notas.media}`} alt={notas.nombre} className='media'></img>
                ) : ''
            }
        </div>
    )
}