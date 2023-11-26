import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Global } from '../../helpers/Global';
import { Peticion } from '../../helpers/Peticion';
import { CertificadoUsuario } from './CertificadoUsuario';
import { useNavigate } from 'react-router-dom';


export const Certificado = () => {
    const [certificado, setCertificado] = useState({});
    const [cargando, setCargando] = useState(true);
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
                </>
            }
        </div>
    );
};
