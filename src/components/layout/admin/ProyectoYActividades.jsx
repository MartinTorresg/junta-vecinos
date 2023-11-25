import React from 'react'
import { CrearProyecto } from '../../proyectos/CrearProyecto'; // Asegúrate de que la ruta de importación sea la correcta
import { CrearActividad } from '../../actividades/CrearActividad';

export const ProyectoYActividades = () => {
    return (
        <div>
            <div className="crear-proyecto">
                <h2>Crear Proyecto</h2>
                <CrearProyecto />
            </div>
            <div className="crear-actividad">
                <h2>Crear Actividad</h2>
                <CrearActividad />
            </div>
        </div>
    )
}
