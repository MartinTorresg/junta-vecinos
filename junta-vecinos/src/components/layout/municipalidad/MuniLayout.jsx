import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { Header } from './Header';
import useAuth from '../../../hooks/useAuth';

export const MuniLayout = () => {

  const { auth, loading } = useAuth();

  if (loading) {
    return <h1>Cargando...</h1>
  } else {


    return (
      <>
        {/*LAYOUT*/}

        {/* Cabecera y navegacion */}
        <Header />

        {/* Contenido principal */}
        <section className='layout_content'>
          {auth.email === 'municipalidad@gmail.com' ?
            <Outlet />
            :
            <Navigate to="/login" />
          }
        </section>
      </>
    );

  }
}