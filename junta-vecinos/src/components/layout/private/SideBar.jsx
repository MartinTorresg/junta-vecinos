import React from 'react'
import useAuth from '../../../hooks/useAuth';
import Calendario from '../../calendario/Calendario';
// Esto se supone que va a ser un calendario
export const SideBar = () => {

    const {auth} = useAuth();

    console.log(auth);


  return (
    <aside className="layout__aside">

        <Calendario />

        </aside>
  )
}
