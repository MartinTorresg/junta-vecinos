import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Global } from '../../helpers/Global';
import { Peticion } from '../../helpers/Peticion';

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

  const handleSendEmail = async () => {
    const datosCertificado = {
      nombre: certificado.nombre,
      rut: certificado.rut,
      direccion: certificado.direccion,
      region: certificado.region?.nombre,
      comuna: certificado.comuna?.nombre,
      email: certificado.email // Asegúrate de que este campo se esté estableciendo correctamente
    };

    const respuesta = await Peticion(Global.url + "certificado/enviar_certificado", "POST", datosCertificado);
    
    if (respuesta.status === "success") {
      // Manejar respuesta exitosa (p. ej., mostrar mensaje de confirmación)
      console.log("Certificado enviado con éxito");
    } else {
      // Manejar errores
      console.error("Error al enviar el certificado");
    }
  };

  if (cargando) {
    return <div>Cargando...</div>;
  }

  return (
    <div>
      <button onClick={handleSendEmail}>Enviar Certificado por Correo</button>
    </div>
  );
};
