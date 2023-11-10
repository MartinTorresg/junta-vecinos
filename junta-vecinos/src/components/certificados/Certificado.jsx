import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Global } from '../../helpers/Global';
import { Peticion } from '../../helpers/Peticion';
import { CertificadoUsuario } from './CertificadoUsuario';

export const Certificado = () => {
    const [certificado, setCertificado] = useState({});
    const [cargando, setCargando] = useState(true);
    const params = useParams();

    useEffect(() => {
        obtenerCertificado();
    }, []);

    const obtenerCertificado = async () => {
        const { datos, cargando } = await Peticion(Global.url + "certificado/certificado/" + params.id, "GET");

        if (datos.status === "success") {
            setCertificado(datos.certificado);
        }

        setCargando(false);
    };

    return (
        <div className='jumbo'>
            {cargando ? "Cargando..." :
                <>
                    <h1>{certificado.nombre}</h1>
                    <p><strong>RUT: </strong>{certificado.rut}</p>
                    <p><strong>Dirección: </strong>{certificado.direccion}</p>
                    <p><strong>Región: </strong>{certificado.region}</p>
                    <p><strong>Comuna: </strong>{certificado.comuna}</p>
                </>
            }
            < CertificadoUsuario />
        </div>
    );
};
