import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Global } from '../../helpers/Global';
import { Peticion } from '../../helpers/Peticion';
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";

pdfMake.vfs = pdfFonts.pdfMake.vfs;

export const CertificadoUsuario = () => {
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

  const handleGeneratePDF = () => {
    const nombre = certificado.nombre;
    const rut = certificado.rut;
    const direccion = certificado.direccion;
    const region = certificado.region;
    const comuna = certificado.comuna;

    const documentDefinition = {
      content: [
        `Nombre: ${nombre}`,
        `RUT: ${rut}`,
        `Dirección: ${direccion}`,
        `Región: ${region}`,
        `Comuna: ${comuna}`
      ]
    };

    pdfMake.createPdf(documentDefinition).download("Certificado.pdf");
  };

  return (
    <div>
      <button onClick={handleGeneratePDF}>Solicitar Certificado</button>
    </div>
  );
};