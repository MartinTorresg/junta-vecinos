import React, { useState, useEffect } from 'react';
import { Global } from '../../helpers/Global';

export const Register = ({ datosInscripcion }) => {
  const saveUser = async () => {
      let newUser = {
          name: datosInscripcion.nombre,
          surname: datosInscripcion.apellido,
          rut: datosInscripcion.run,
          email: datosInscripcion.email,
          // region y comuna, si son necesarios y están disponibles
          region: datosInscripcion.region?._id,
          comuna: datosInscripcion.comuna?._id,
          // La contraseña se generará en el backend
      };

      const response = await fetch(Global.url + "user/register", {
          method: "POST",
          body: JSON.stringify(newUser),
          headers: {
              "Content-Type": "application/json"
          }
      });

      const data = await response.json();
      // Manejo de la respuesta
  };

  return (
      // JSX del componente
      <button onClick={saveUser} className='btn btn-success'>Crear Usuario</button>
  );
};

