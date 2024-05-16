import React from 'react'

export const NotasData = ({ notas }) => {
    return (
        <div className='notas-card'>
            <div className='notas-info'>
                <h4 className='notas-name'>{notas.nombre}</h4>
                <p className='notas-description'>{notas.nota}</p>
            </div>
            {
                notas.media ? (
                    <img src={notas.media} alt={notas.nombre} className='notas-image'></img>
                ) : ''
            }
        </div>
    )
}
