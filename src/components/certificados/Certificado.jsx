import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Global } from '../../helpers/Global';
import { Peticion } from '../../helpers/Peticion';
import { CertificadoUsuario } from './CertificadoUsuario';
import { useNavigate } from 'react-router-dom';


export const Certificado = () => {
    const [certificado, setCertificado] = useState({});
    const [cargando, setCargando] = useState(true);
    const [mostrarPopup, setMostrarPopup] = useState(false);
    const [mensajeRechazo, setMensajeRechazo] = useState('');
    const params = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        obtenerCertificado();
    }, []);

    const obtenerCertificado = async () => {
        const { datos, cargando } = await Peticion(Global.url + "certificado/certificado/" + params.id, "GET");
        console.log(params.id)

        if (datos.status === "success") {
            setCertificado(datos.certificado);
        }

        setCargando(false);
    };

    // Función para eliminar el certificado
    const eliminarCertificado = async (id) => {
        const { datos } = await Peticion(Global.url + "certificado/borrar_certificado/" + params.id, "DELETE");

        if (datos.status === "success") {
            console.log("Certificado eliminado con éxito");
            navigate("/admin/certificados");
            // Aquí puedes manejar cualquier actualización de estado o UI
        } else {
            console.error("Error al eliminar el certificado");
        }
    };

    const rechazarCertificado = async () => {
        // Eliminar el certificado
        const eliminarRespuesta = await Peticion(Global.url + "certificado/borrar_certificado/" + params.id, "DELETE");
        if (eliminarRespuesta.datos.status === "success") {
            // Envío de correo de rechazo
            enviarCorreoRechazo(certificado.email, mensajeRechazo);
            // Redirigir al listado de certificados
            navigate("/admin/certificados");
        } else {
            console.error("Error al rechazar el certificado");
        }
    };

    const enviarCorreoRechazo = async (email, mensaje) => {
        try {
            const response = await fetch(Global.url + "certificado/enviarCorreoRechazoCertificado", {
                method: "POST",
                body: JSON.stringify({
                    email: email,
                    mensaje: mensaje
                }),
                headers: {
                    "Content-Type": "application/json"
                }
            });

            const data = await response.json();
            if (data.status === "success") {
                console.log("Correo de rechazo enviado con éxito");
            } else {
                console.error("Error al enviar el correo de rechazo");
            }
        } catch (error) {
            console.error("Error en enviarCorreoRechazo: ", error);
        }
    };



    return (
        <div className='jumbo'>
            {cargando ? "Cargando..." :
                <>
                    <h1>{certificado.nombre}</h1>
                    <p><strong>RUT: </strong>{certificado.rut}</p>
                    <p><strong>Dirección: </strong>{certificado.direccion}</p>
                    <p><strong>Región: </strong>{certificado.region?.nombre || 'No especificado'}</p>
                    <p><strong>Comuna: </strong>{certificado.comuna?.nombre || 'No especificado'}</p>
                    <CertificadoUsuario certificado={certificado} onEliminar={eliminarCertificado} />
                    <button onClick={() => setMostrarPopup(true)} className='btn btn-danger'>Rechazar Certificado</button>
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
                        <button onClick={() => {
                            rechazarCertificado();
                            setMostrarPopup(false);
                        }} className='btn btn-primary'>Enviar Rechazo</button>
                    </div>
                </div>
            )}
        </div>
    );
};
