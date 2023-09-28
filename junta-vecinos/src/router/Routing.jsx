import React from 'react';
import { Routes, Route, BrowserRouter, Navigate } from 'react-router-dom';
import { PublicLayout } from '../components/layout/publico/PublicLayout';
import { Register } from '../components/user/Register';
import { Login } from '../components/user/Login';
import { PrivateLayout } from '../components/layout/private/PrivateLayout';
import { Feed } from '../components/noticias/Feed';

export const Routing = () => {
  return (
    <BrowserRouter>
        <Routes>

            <Route path="/" element={<PublicLayout />}>
                <Route index element={<Login />} />
                <Route path="login" element={<Login />} />
                <Route path="registro" element={<Register />} />
            </Route>

            <Route path="/social" element={<PrivateLayout />}>
                <Route index element={<Feed />} />
                <Route path="feed" element={<Feed />} />
            </Route>

            <Route path="*" element={
              <>
                <h1>Error 404</h1>
              </>
            } />


        </Routes>
    </BrowserRouter>
  )
}
