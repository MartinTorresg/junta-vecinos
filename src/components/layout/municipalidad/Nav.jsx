import React from 'react'
import avatar from '../../../assets/img/user.png'
import { NavLink } from 'react-router-dom'

export const Nav = () => {
    return (
        <nav className="navbar__container-lists">

            <ul className="container-lists__menu-list">
                <li className="menu-list__item">
                    <NavLink to="/municipalidad" className="menu-list__link">
                        <i className="fa-solid fa-house"></i>
                        <span className="menu-list__title">Inicio</span>
                    </NavLink>
                </li>
                <li className="menu-list__item">
                    <NavLink to="/municipalidad/proyecto/proyectos" className="menu-list__link">
                        <i className="fa-solid fa-users"></i>
                        <span className="menu-list__title">proyectos y actividades</span>
                    </NavLink>
                </li>
                <li className="menu-list__item">
                    <NavLink to="/municipalidad/kpi1" className="menu-list__link">
                        <i className="fa-solid fa-users"></i>
                        <span className="menu-list__title">Tasa de Registro de Vecinos</span>
                    </NavLink>
                </li>
                <li className="menu-list__item">
                    <NavLink to="/municipalidad/kpi2" className="menu-list__link">
                        <i className="fa-solid fa-users"></i>
                        <span className="menu-list__title">Tasa de presupuesto de proyectos por gastos</span>
                    </NavLink>
                </li>


            </ul>

            <ul className="container-lists__list-end">
                <li className="list-end__item">
                    <NavLink to="/municipalidad/logout" className="list-end__link">
                        <i className='fa-solid fa-arrow-right-from-bracket'></i>
                        <span className="list-end__name">Cerrar sesión</span>
                    </NavLink>
                </li>
            </ul>

        </nav>
    )
}
