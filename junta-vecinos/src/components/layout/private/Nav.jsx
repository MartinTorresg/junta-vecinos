import React from 'react'
import avatar from '../../../assets/img/user.png'
import { NavLink } from 'react-router-dom'

export const Nav = () => {
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
                        <span className="menu-list__title">Certificados</span>
                    </NavLink>
                </li>

                <li className="menu-list__item">
                    <NavLink to="/social/proyecto/crear" className="menu-list__link">
                        <i className="fa-solid fa-users"></i>
                        <span className="menu-list__title">Proyectos y actividades</span>
                    </NavLink>
                </li>

            </ul>

            <ul className="container-lists__list-end">
                <li className="list-end__item">
                    <a href="#" className="list-end__link-image">
                        <img src={avatar} className="list-end__img" alt="Imagen de perfil" />
                    </a>
                </li>
                <li className="list-end__item">
                    <a href="#" className="list-end__link">
                        <span className="list-end__name">nick</span>
                    </a>
                </li>
                <li className="list-end__item">
                    <a href="#" className="list-end__link">
                        <i className='fa-solid fa-gear'></i>
                        <span className="list-end__name">Ajustes</span>
                    </a>
                </li>
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
