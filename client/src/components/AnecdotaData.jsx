import React from 'react';
import './anecdotaData.css';
import { DeleteButton } from './DeleteButton';

export const AnecdotaData = ({ anecdotas }) => {
    return (
        <table className='nota-table'>
            <thead>
                <tr>
                    <th>Título</th>
                    <th>Fecha</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                {anecdotas.map((anecdota) => (
                    <tr key={anecdota._id}>
                        <td>{anecdota.titulo}</td>
                        <td>{new Date(anecdota.fecha).toLocaleDateString()}</td>
                        <td><DeleteButton id={anecdota._id} /></td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}
