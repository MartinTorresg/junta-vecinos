import React from 'react';
import { Routes, Route, BrowserRouter, Navigate } from 'react-router-dom';
import { PublicLayout } from '../components/layout/publico/PublicLayout';
import { Login } from '../components/user/Login';
import { PrivateLayout } from '../components/layout/private/PrivateLayout';
import { Feed } from '../components/noticias/Feed';
import { AuthProvider } from '../context/AuthProvider';
import { Logout } from '../components/user/Logout';
import { CrearNoticias } from '../components/noticias/CrearNoticias';
import { Noticia } from '../components/noticias/Noticia';
import { AdminLayout } from '../components/layout/admin/AdminLayout'
import { Proyectos } from '../components/proyectos/Proyectos';
import { CrearInscripcion } from '../components/vecino/CrearInscripcion';
import { Inscripciones } from '../components/vecino/Inscripciones';
import { Inscripcion } from '../components/vecino/Inscripcion';
import { Actividades } from '../components/actividades/Actividades';
import { ProyectoYActividades } from '../components/layout/admin/ProyectoYActividades';
import { Proyecto } from '../components/proyectos/Proyecto';
import { MuniLayout } from '../components/layout/municipalidad/MuniLayout';
import { CrearCertificados } from '../components/certificados/CrearCertificados';
import { Certificados } from '../components/certificados/Certificados';
import { Certificado } from '../components/certificados/Certificado';
import { Actividad } from '../components/actividades/Actividad';
import { CrearCertificadoUsuario } from '../components/certificados/CrearCertificadoUsuario';
import CambioContraseña from '../components/user/CambioContraseña';
import KPIDashboard from '../components/layout/municipalidad/KPIDashboard';
import KPIRegistroVecinosDashboard from '../components/layout/municipalidad/KPIRegistroVecinosDashboard'

export const Routing = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>

          <Route path="/" element={<PublicLayout />}>
            <Route index element={<Login />} />
            <Route path="login" element={<Login />} />
            <Route path="inscripcion" element={<CrearInscripcion />} />
            <Route path="crear-certificados" element={<CrearCertificados/>} />
          </Route>

          <Route path="/social" element={<PrivateLayout />}>
            <Route index element={<Feed />} />
            <Route path="feed" element={<Feed />} />
            <Route path="articulo/:id" element={<Noticia />} />
            <Route path="proyecto/crear" element={<ProyectoYActividades />} />
            <Route path="logout" element={<Logout />} />
            <Route path="certificados" element={<CrearCertificadoUsuario />} />
            <Route path="cambio-contrasena" element={<CambioContraseña />} />
          </Route>

          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Feed />} />
            <Route path="feed" element={<Feed />} />
            <Route path="inscripciones" element={<Inscripciones />} />
            <Route path="inscripcion/:id" element={<Inscripcion />} />
            <Route path="crear-noticias" element={<CrearNoticias />} />
            <Route path="articulo/:id" element={<Noticia />} />
            <Route path="proyecto/proyectos" element={<Proyectos />} />
            <Route path="proyecto/proyectos" element={<Actividades />} />
            <Route path="proyecto/:id" element={<Proyecto />} />
            <Route path="actividad/:id" element={<Actividad />} />
            <Route path="certificados" element={<Certificados />} />
            <Route path="certificados/:id" element={<Certificado />} />

            <Route path="logout" element={<Logout />} />
          </Route>

          <Route path="/municipalidad" element={<MuniLayout />}>
            <Route index element={<Feed />} />
            <Route path="feed" element={<Feed />} />
            <Route path="logout" element={<Logout />} />
            <Route path="proyecto/proyectos" element={<Proyectos />} />
            <Route path="proyecto/proyectos" element={<Actividades />} />
            <Route path="proyecto/:id" element={<Proyecto />} />
            <Route path="actividad/:id" element={<Actividad />} />
            <Route path="kpis" element={<KPIDashboard />} />
            <Route path="kpis/registro-vecinos" element={<KPIRegistroVecinosDashboard />} />

            <Route path="logout" element={<Logout />} />
          </Route>

          <Route path="*" element={
            <>
              <h1>Error 404</h1>
            </>
          } />


        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}
