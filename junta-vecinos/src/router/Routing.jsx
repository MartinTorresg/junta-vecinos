import React from 'react';
import { Routes, Route, BrowserRouter, Navigate } from 'react-router-dom';
import { PublicLayout } from '../components/layout/publico/PublicLayout';
import { Register } from '../components/user/Register';
import { Login } from '../components/user/Login';
import { PrivateLayout } from '../components/layout/private/PrivateLayout';
import { Feed } from '../components/noticias/Feed';
import { AuthProvider } from '../context/AuthProvider';
import { Logout } from '../components/user/Logout';
import { CrearNoticias } from '../components/noticias/CrearNoticias';
import { Noticia } from '../components/noticias/Noticia';
import { AdminLayout } from '../components/layout/admin/AdminLayout'

export const Routing = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>

          <Route path="/" element={<PublicLayout />}>
            <Route index element={<Login />} />
            <Route path="login" element={<Login />} />
            <Route path="registro" element={<Register />} />
          </Route>

          <Route path="/social" element={<PrivateLayout />}>
            <Route index element={<Feed />} />
            <Route path="feed" element={<Feed />} />
            <Route path="articulo/:id" element={<Noticia />} />
            <Route path="logout" element={<Logout />} />
          </Route>

          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Feed />} />
            <Route path="feed" element={<Feed />} />
            <Route path="crear-noticias" element={<CrearNoticias />} />
            <Route path="articulo/:id" element={<Noticia />} />
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
