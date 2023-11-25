import React, { useState, useEffect } from 'react';
import { Global } from '../../helpers/Global';
import { Peticion } from '../../helpers/Peticion';
import { Listado } from './Listado';

export const Certificados = () => {
    const [certificados, setCertificados] = useState([]);
    const [cargando, setCargando] = useState(true);

    useEffect(() => {
        obtenerCertificados();
    }, []);

    const obtenerCertificados = async () => {
        const { datos, cargando } = await Peticion(Global.url + "certificado/certificados", "GET");

        if (datos.status === "success") {
            setCertificados(datos.certificados);
        }

        setCargando(false);
    };

    return (
        <>
            <header className="content__header">
                <h1 className="content__title">Certificados</h1>
            </header>
            {cargando ? "Cargando..." :
                certificados.length >= 1 ? 
                    <Listado certificados={certificados} setCertificados={setCertificados} />
                    : <h1>No hay certificados</h1>
            }
        </>
    );
};
