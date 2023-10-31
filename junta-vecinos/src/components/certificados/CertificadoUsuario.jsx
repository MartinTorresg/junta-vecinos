import React from 'react';
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";

pdfMake.vfs = pdfFonts.pdfMake.vfs;

export const CertificadoUsuario = () => {
  const handleGeneratePDF = () => {
    const nombre = "Juan Pérez";
    const rut = "12.345.678-9";
    const direccion = "Calle Falsa 123";
    const region = "Región Metropolitana";
    const comuna = "Santiago";

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