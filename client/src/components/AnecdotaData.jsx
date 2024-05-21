import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import { DeleteButton } from './DeleteButton';
import { Link } from 'react-router-dom'; // Importa Link desde react-router-dom

export const AnecdotaData = ({ anecdotas }) => {
    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Título</TableCell>
                        <TableCell>Fecha</TableCell>
                        <TableCell>Acciones</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {anecdotas.map((anecdota) => (
                        <TableRow key={anecdota._id}>
                            <TableCell>{anecdota.titulo}</TableCell>
                            <TableCell>{new Date(anecdota.fecha).toLocaleDateString()}</TableCell>
                            <TableCell>
                                {/* Utiliza Link para redirigir a la página de edición */}
                                <Button component={Link} to={`/anecdotas/edit/${anecdota._id}`} variant="contained" color="primary">Editar</Button>
                                <DeleteButton id={anecdota._id} />
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
