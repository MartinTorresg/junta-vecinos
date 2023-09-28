import React from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from './Header';
import { SideBar } from './SideBar';

export const PrivateLayout = () => {
  return (
    <>
        {/*LAYOUT*/}

        {/* Cabecera y navegacion */}
        <Header />

        {/* Contenido principal */}
        <section className='layout_content'>
            <Outlet />
        </section>

        {/* Barra lateral */}
        <SideBar />

    </>
  )
}
