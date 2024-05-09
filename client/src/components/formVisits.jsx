import React from "react";
import './formVisits.css';

const FormVisits = (notas, error) => {
    const {nombre, nota, media} = notas;

    const visitHandler = (e) => {
        notas[e.target.name] = e.target.value;
    }

    return (
        <div className='form-container'>
                <form className="form-form">
                    <label>
                        Nombre:
                        <input
                            className="form-input"
                            type="text"
                            name="nombre"
                            value={nombre || ""}
                            onChange={visitHandler}
                            rules={[{ required: true, message: 'Por favor ingrese su nombre!' }]}
                        />
                        {error.firstName && <span>{error.firstName}</span>}
                    </label>
                    <label>
                        Nota:
                        <input
                            className="form-input"
                            type="text"
                            name="nota"
                            value={nota || ""}
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
                            value={media || ""}
                            onChange={visitHandler}
                        />
                        {error.firstName && <span>{error.firstName}</span>}
                    </label>
                </form>
            </div>
    )
}

export default FormVisits;