import React from 'react';
import avatar from '../../../assets/img/user.png';
import { NavLink } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth';

export const Nav = () => {

    const { auth, loading } = useAuth();
    return (
        <nav className="navbar__container-lists">

            <ul className="container-lists__menu-list">
                <li className="menu-list__item">
                    <NavLink to="/social" className="menu-list__link">
                        <i className="fa-solid fa-house"></i>
                        <span className="menu-list__title">Inicio</span>
                    </NavLink>
                </li>

                <li className="menu-list__item">
                    <NavLink to="/social/certificados" className="menu-list__link">
                        <i className="fa-solid fa-images"></i>
                        <span className="menu-list__title">Certificado</span>
                    </NavLink>
                </li>

                <li className="menu-list__item">
                    <NavLink to="/social/proyecto/crear" className="menu-list__link">
                        <i className="fa-solid fa-users"></i>
                        <span className="menu-list__title">Proyectos y actividades</span>
                    </NavLink>
                </li>

                <li className="menu-list__item">
                    <NavLink to="/social/espacios" className="menu-list__link">
                        <i className="fa-solid fa-users"></i>
                        <span className="menu-list__title">Espacios</span>
                    </NavLink>
                </li>

                <li className="menu-list__item">
                    <NavLink to="/social/reservas" className="menu-list__link">
                        <i className="fa-solid fa-users"></i>
                        <span className="menu-list__title">Mis Reservas</span>
                    </NavLink>
                </li>

            </ul>

            <ul className="container-lists__list-end">
                {/* Condición para mostrar el enlace de Admin o Municipalidad */}
                {auth.email === 'admin@gmail.com' && (
                    <li className="menu-list__item">
                        <NavLink to="/admin" className="menu-list__link">
                            <i className="fa-solid fa-user-shield"></i>
                            <span className="menu-list__title">Admin</span>
                        </NavLink>
                    </li>
                )}
                {auth.email === 'municipalidad@gmail.com' && (
                    <li className="menu-list__item">
                        <NavLink to="/municipalidad" className="menu-list__link">
                            <i className="fa-solid fa-building"></i>
                            <span className="menu-list__title">Municipalidad</span>
                        </NavLink>
                    </li>
                )}
                <li className="list-end__item">
                    <NavLink to="/social/logout" className="list-end__link">
                        <i className='fa-solid fa-arrow-right-from-bracket'></i>
                        <span className="list-end__name">Cerrar sesión</span>
                    </NavLink>
                </li>
            </ul>

        </nav>
    )
}
