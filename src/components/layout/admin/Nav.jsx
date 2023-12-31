import React from 'react'
import avatar from '../../../assets/img/user.png'
import { NavLink } from 'react-router-dom'

export const Nav = () => {
    return (
        <nav className="navbar__container-lists">

            <ul className="container-lists__menu-list">
                <li className="menu-list__item">
                    <NavLink to="/admin" className="menu-list__link">
                        <i className="fa-solid fa-house"></i>
                        <span className="menu-list__title">Inicio</span>
                    </NavLink>
                </li>

                <li className="menu-list__item">
                    <NavLink to="/admin/inscripciones" className="menu-list__link">
                        <i className="fa-solid fa-list"></i>
                        <span className="menu-list__title">Inscripciones</span>
                    </NavLink>
                </li>

                <li className="menu-list__item">
                    <NavLink to="/admin/certificados" className="menu-list__link">
                        <i className="fa-solid fa-images"></i>
                        <span className="menu-list__title">Certificados</span>
                    </NavLink>
                </li>

                <li className="menu-list__item">
                    <NavLink to="/admin/proyecto/proyectos" className="menu-list__link">
                        <i className="fa-solid fa-users"></i>
                        <span className="menu-list__title"> Crear proyectos y actividades</span>
                    </NavLink>
                </li>

                <li className="menu-list__item">
                    <NavLink to="/admin/crear-noticias" className="menu-list__link">
                        <i className="fa-regular fa-message"></i>
                        <span className="menu-list__title">Crear noticias</span>
                    </NavLink>
                </li>

                <li className="menu-list__item">
                    <NavLink to="/admin/formulario-espacios" className="menu-list__link">
                        <i className="fa-solid fa-users"></i>
                        <span className="menu-list__title"> Crear Espacios publicos</span>
                    </NavLink>
                </li>

                <li className="menu-list__item">
                    <NavLink to="/admin/crear-reservas" className="menu-list__link">
                        <i className="fa-solid fa-users"></i>
                        <span className="menu-list__title"> Crear Reservas </span>
                    </NavLink>
                </li>
    
                <li className="menu-list__item">
                    <NavLink to="/admin/reservas" className="menu-list__link">
                        <i className="fa-solid fa-users"></i>
                        <span className="menu-list__title"> Reservas </span>
                    </NavLink>
                </li>

            </ul>

            <ul className="container-lists__list-end">
                <li className="list-end__item">
                    <NavLink to="/admin/logout" className="list-end__link">
                        <i className='fa-solid fa-arrow-right-from-bracket'></i>
                        <span className="list-end__name">Cerrar sesión</span>
                    </NavLink>
                </li>
            </ul>

        </nav>
    )
}
