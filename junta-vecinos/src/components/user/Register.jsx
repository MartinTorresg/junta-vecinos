import React from 'react'
import { useForm } from '../../hooks/useForm';
import { Global } from '../../helpers/Global';
import { useState } from 'react';

export const Register = () => {

  const { form, changed } = useForm({});
  const [saved, setSaved] = useState("not_sended")

  const saveUser = async (e) => {
    // Prevenir actualizacion de pantalla
    e.preventDefault();

    // Recoger datos del formulario
    let newUser = form;

    // Guardar usuario en el backend
    const request = await fetch(Global.url + "user/register", {
      method: "POST",
      body: JSON.stringify(newUser),
      headers: {
        "Content-Type": "application/json"
      }
    });

    const data = await request.json();

    if (data.status == "success") {
      setSaved("saved");
    } else {
      setSaved("error");
    }

  } // fin del metodo de guardar

  const formatearRut = (rutSinFormato) => {
    // Quitar puntos y guión
    let rutLimpio = rutSinFormato.replace(/\./g, '').replace('-', '');

    // Cortar si la longitud excede 9 (8 números + dígito verificador)
    if (rutLimpio.length > 9) {
        rutLimpio = rutLimpio.substring(0, 9);
    }

    // Formatear solo si la longitud es adecuada
    if (rutLimpio.length > 1) {
        rutLimpio = rutLimpio.substring(0, rutLimpio.length - 1) + '-' + rutLimpio.substring(rutLimpio.length - 1);
    }
    return rutLimpio.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
};

  const handleChangeRut = (e) => {
    const rutFormateado = formatearRut(e.target.value);
    changed({ target: { name: 'rut', value: rutFormateado } });
  };


  return (
    <>
      <header className='content__header content__header--public'>
        <h1 className='content__title'>Registro</h1>
      </header>
      <div className='content__post'>
        {saved == "saved" ?
          <strong className='alert alert-success'>Usuario registrado correctamente !!</strong>
          : ''}

        {saved == "error" ?
          <strong className='alert alert-success'>Usuario no se registro !!</strong>
          : ''}

        <form className='register-form' onSubmit={saveUser}>

          <div className='form-group'>
            <label htmlFor="name">Nombre</label>
            <input type="text" name="name" onChange={changed} />
          </div>

          <div className='form-group'>
            <label htmlFor="surname">Apellidos</label>
            <input type="text" name="surname" onChange={changed} />
          </div>

          <div className='form-group'>
            <label htmlFor="rut">Rut</label>
            <input type="text" name="rut" value={form.rut} onChange={handleChangeRut} />
          </div>

          <div className='form-group'>
            <label htmlFor="email">Correo electrónico</label>
            <input type="email" name="email" onChange={changed} />
          </div>

          <div className='form-group'>
            <label htmlFor="password">Contraseña</label>
            <input type="password" name="password" onChange={changed} />
          </div>

          <input type="submit" value="Registrate" className='btn btn-success' />

        </form>

      </div>
    </>
  )
}
