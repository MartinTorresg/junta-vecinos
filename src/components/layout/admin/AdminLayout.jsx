import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { Header } from './Header';
import useAuth from '../../../hooks/useAuth';
import { SideBar } from '../private/SideBar';

export const AdminLayout = () => {

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
          {auth.role === 'admin' ? (
            <Outlet />
          ) : (
            <Navigate to="/login" />
          )}
        </section>

        <SideBar />
      </>
    );

  }
}
