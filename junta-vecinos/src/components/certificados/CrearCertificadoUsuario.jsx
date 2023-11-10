import React, { useState } from 'react';
import { Peticion } from '../../helpers/Peticion';
import { Global } from '../../helpers/Global';
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";

pdfMake.vfs = pdfFonts.pdfMake.vfs;

export const CrearCertificadoUsuario = () => {
  const [formularioData, setFormularioData] = useState({
    nombre: "",
    rut: "",
    direccion: "",
    region: "",
    comuna: ""
  });
  const [resultado, setResultado] = useState("no_enviado");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormularioData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleGeneratePDF = () => {
    const { nombre, rut, direccion, region, comuna } = formularioData;

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

  const guardarCertificado = async (e) => {
    e.preventDefault();

    // Guardar certificado en el backend
    const { datos } = await Peticion(Global.url + "certificado/crear_certificado", "POST", formularioData);

    if (datos.status === "success") {
      setResultado("guardado");
    } else {
      setResultado("error");
    }
  }

  return (
    <div className='jumbo'>
      <h1>Crear certificado</h1>
      <p>Formulario para crear un certificado</p>

      {/* Formulario */}
      <div className='formulario'>
        <div className='form-group'>
          <label htmlFor="nombre">Nombre</label>
          <input type="text" name="nombre" onChange={handleInputChange} />
        </div>

        <div className='form-group'>
          <label htmlFor="rut">RUT</label>
          <input type="text" name="rut" onChange={handleInputChange} />
        </div>

        <div className='form-group'>
          <label htmlFor="direccion">Dirección</label>
          <input type="text" name="direccion" onChange={handleInputChange} />
        </div>

        <div className='form-group'>
          <label htmlFor="region">Región</label>
          <input type="text" name="region" onChange={handleInputChange} />
        </div>

        <div className='form-group'>
          <label htmlFor="comuna">Comuna</label>
          <input type="text" name="comuna" onChange={handleInputChange} />
        </div>
      </div>

      {/* Botón para generar el PDF */}
      <div className='boton-generar-pdf'>
        <button onClick={handleGeneratePDF}>Generar PDF</button>
      </div>
    </div>
  );
}
