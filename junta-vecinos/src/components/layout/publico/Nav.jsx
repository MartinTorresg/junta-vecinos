import React from 'react'
import avatar from '../../../assets/img/user.png'
import { NavLink } from 'react-router-dom'

export const Nav = () => {
    return (
        <nav className="navbar__container-lists">



            <ul className="container-lists__menu-list">
                <li className="menu-list__item">
                    <NavLink to="/login" className="menu-list__link">
                        <i className="fa-solid fa-user"></i>
                        <span className="menu-list__title">debo cambiar esto</span>
                    </NavLink>
                </li>

                <li className="menu-list__item">
                    <NavLink to="/inscripcion" className="menu-list__link">
                        <i className="fa-solid fa-users"></i>
                        <span className="menu-list__title">esto igual</span>
                    </NavLink>
                </li>
            </ul>

            <ul className="container-lists__list-end">
                <li className="menu-list__item">
                    <NavLink to="/login" className="menu-list__link">
                        <i className="fa-solid fa-user"></i>
                        <span className="menu-list__title">Login</span>
                    </NavLink>
                </li>

                <li className="menu-list__item">
                    <NavLink to="/inscripcion" className="menu-list__link">
                        <i className="fa-solid fa-users"></i>
                        <span className="menu-list__title">Inscripcion</span>
                    </NavLink>
                </li>
            </ul>

        </nav>
    )
}
