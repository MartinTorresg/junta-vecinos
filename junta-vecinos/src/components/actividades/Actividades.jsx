import React, { useState, useEffect } from 'react';
import { Global } from '../../helpers/Global';
import { Peticion } from '../../helpers/Peticion';
import { ListadoActividades } from './ListadoActividades';  // Asegúrate de tener este componente

export const Actividades = () => {

    const [actividades, setActividades] = useState([]);
    const [cargando, setCargando] = useState(true);

    useEffect(() => {
        conseguirActividades();
    }, []);

    const conseguirActividades = async () => {
        // Asumiendo que la ruta para obtener las actividades es "actividades"
        const { datos, cargando } = await Peticion(Global.url + "actividad/actividades", "GET");

        if (datos.status === "success") {
            setActividades(datos.actividades);
        }

        setCargando(false);
    }

    return (
        <>
            <header className="content__header">
                <h1 className="content__title">Actividades</h1>
            </header>

            {cargando ? "Cargando..." :
                actividades.length >= 1 ? 
                        <ListadoActividades actividades={actividades} setActividades={setActividades}/>
                        : <h1>No hay actividades</h1>
            }
        </>
    );
};
