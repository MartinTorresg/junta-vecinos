import React from 'react';
import { useState, useEffect } from "react";
import { Global } from '../../helpers/Global';
import { Peticion } from '../../helpers/Peticion';
import { Listado } from './Listado';
// aqui se veran todas las noticias en general
export const Feed = () => {

    const [articulos, setArticulos] = useState([]);
    const [cargando, setCargando] = useState(true);

    useEffect(() => {
        conseguirArticulos();
    }, [])

    const conseguirArticulos = async () => {

        const { datos, cargando } = await Peticion(Global.url + "articulos", "GET");

        if (datos.status === "success") {
            setArticulos(datos.articulos);
        }

        setCargando(false)
    }

    return (
        <>
            <header className="content__header">
                <h1 className="content__title">Noticias</h1>
            </header>
            {cargando ? "Cargando..." :
                articulos.length >= 1 ? 
                        <Listado articulos={articulos} setArticulos={setArticulos}/>
                        : <h1>No hay articulos</h1>
            }

        </>
    )
}
