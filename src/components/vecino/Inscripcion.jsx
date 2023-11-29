import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Global } from '../../helpers/Global';
import { Peticion } from '../../helpers/Peticion';
import { Register } from '../user/Register';
import { useNavigate } from 'react-router-dom';

export const Inscripcion = () => {
    const [inscripcion, setInscripcion] = useState({});
    const [cargando, setCargando] = useState(true);
    const [mostrarPopup, setMostrarPopup] = useState(false);
    const [mensajeRechazo, setMensajeRechazo] = useState('');
    const params = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        conseguirInscripcion();
    }, []);

    const conseguirInscripcion = async () => {
        const { datos } = await Peticion(Global.url + "inscripcion/inscripcion/" + params.id, "GET");

        if (datos.status === "success") {
            setInscripcion(datos.inscripcion);
        }

        setCargando(false);
    };

    const rechazarInscripcion = async () => {
        try {
            // Llamada al backend para eliminar la inscripción
            const response = await fetch(Global.url + "inscripcion/borrar-inscripcion/" + params.id, {
                method: "DELETE",
                body: JSON.stringify({ mensajeRechazo: mensajeRechazo }),
                headers: {
                    "Content-Type": "application/json"
                }
            });

            const data = await response.json();

            if (data.status === "success") {
                // Enviar correo electrónico de rechazo
                await enviarCorreoRechazo(inscripcion.email, mensajeRechazo);
                navigate('/admin/inscripciones');
            } else {
                // Manejar errores
                console.log("Error al eliminar la inscripción");
            }
        } catch (error) {
            console.error("Error en rechazarInscripcion: ", error);
        }

        setMostrarPopup(false); // Cierra el popup después de rechazar
    };

    const enviarCorreoRechazo = async (email, mensaje) => {
        // Implementar la lógica para enviar un correo electrónico de rechazo
        const correoData = {
            email: email,
            mensaje: mensaje
        };

        const response = await fetch(Global.url + "inscripcion/enviarCorreo", {
            method: "POST",
            body: JSON.stringify(correoData),
            headers: {
                "Content-Type": "application/json"
            }
        });

        const data = await response.json();
        // Manejar respuesta del servidor
    };

    return (
        <div className='jumbo'>
            {cargando ? "Cargando..." :
                <>
                    <h1>{inscripcion.nombre}</h1>
                    <p>{inscripcion.apellido}</p>
                    <p>{inscripcion.run}</p>
                    <p>{inscripcion.email}</p>
                    <p>{inscripcion.fecha_nacimiento}</p>
                    <p>{inscripcion.direccion}</p>
                    <p><strong>Región: </strong>{inscripcion.region?.nombre || 'No especificado'}</p>
                    <p><strong>Comuna: </strong>{inscripcion.comuna?.nombre || 'No especificado'}</p>
                    {!cargando && <Register datosInscripcion={inscripcion} />}
                    <button onClick={() => setMostrarPopup(true)} className='btn btn-danger'>Rechazar Inscripción</button>
                </>
            }
            {mostrarPopup && (
                <div className='modal'>
                    <div className='modal-content'>
                        <span className='close' onClick={() => setMostrarPopup(false)}>&times;</span>
                        <h2>Motivo del Rechazo</h2>
                        <textarea
                            placeholder="Escribe el motivo del rechazo aquí"
                            value={mensajeRechazo}
                            onChange={(e) => setMensajeRechazo(e.target.value)}
                        />
                        <button onClick={() => rechazarInscripcion()} className='btn btn-primary'>Enviar Rechazo</button>
                    </div>
                </div>
            )}

        </div>
    );
};
