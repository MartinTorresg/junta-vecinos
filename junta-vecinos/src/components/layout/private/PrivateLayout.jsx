import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { Header } from './Header';
import { SideBar } from './SideBar';
import useAuth from '../../../hooks/useAuth';

export const PrivateLayout = () => {

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
          {auth._id ?
            <Outlet />
            :
            <Navigate to="/login" />
          }
        </section>

        {/* Barra lateral */}
        <SideBar />

      </>
    );

  }
}
