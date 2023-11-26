import React from 'react';
import { Global } from '../../helpers/Global';
import { Peticion } from '../../helpers/Peticion';
import { useParams } from 'react-router-dom';

export const CertificadoUsuario = ({ certificado, onEliminar }) => {
  const params = useParams();
  // Función para enviar el correo electrónico
  const handleSendEmail = async () => {
    console.log("Iniciando el proceso de envío de correo electrónico");
    console.log(params.id)
    // Preparar los datos del certificado
    const datosCertificado = {
      nombre: certificado.nombre,
      rut: certificado.rut,
      direccion: certificado.direccion,
      region: certificado.region?.nombre,
      comuna: certificado.comuna?.nombre,
      email: certificado.email
    };

    // Enviar el correo electrónico
    const respuesta = await Peticion(Global.url + "certificado/enviar_certificado", "POST", datosCertificado);
    console.log("Respuesta de la API:", respuesta);
    console.log("Datos de respuesta:", respuesta.datos);

    console.log("Función onEliminar:", onEliminar);
    
    if (respuesta.datos.status === "success") {
      console.log("Certificado enviado con éxito");
      await onEliminar(params.id); // Llama a la función de eliminación
    } else {
      console.error("Error al enviar el certificado");
    }
  };

  return (
    <div>
      <button onClick={handleSendEmail}>Enviar Certificado por Correo</button>
    </div>
  );
};
