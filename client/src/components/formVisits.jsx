import React from "react";
import './formVisits.css';

export const FormVisits = ({ notas, error, visitHandler }) => {
    return (
        <div className='form-container'>
            <form className="form-form">
                <label>
                    Nombre:
                    <input
                        className="form-input"
                        type="text"
                        name="nombre"
                        value={notas.nombre || ''}
                        onChange={visitHandler}
                        rules={[{ required: true, message: 'Por favor ingrese su nombre!' }]}
                    />
                    {error.nombre && <span>{error.nombre}</span>}
                </label>
                <label>
                    Nota:
                    <input
                        className="form-input"
                        type="text"
                        name="nota"
                        value={notas.nota || ''}
                        onChange={visitHandler}
                        rules={[{ required: true, message: 'Por favor ingrese su nota!' }]}
                    />
                    {error.nota && <span>{error.nota}</span>}
                </label>
                <label>
                    Media:
                    <input
                        type="file"
                        name="media"
                        value={notas.media || ''}
                        onChange={visitHandler}
                    />
                    {error.media && <span>{error.media}</span>}
                </label>
            </form>
        </div>
    )
}
