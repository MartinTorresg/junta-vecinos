import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import dayGridPlugin from '@fullcalendar/daygrid';
import { Peticion } from '../../helpers/Peticion';
import { Global } from '../../helpers/Global';

const CalendarioActividades = () => {
    const [eventos, setEventos] = useState([]);

    useEffect(() => {
        // Hacer una solicitud para obtener las actividades desde el backend
        const obtenerActividades = async () => {
            try {
                const { datos } = await Peticion(Global.url + 'actividad', 'GET');
                if (datos.status === 'success') {
                    const eventosActividades = datos.actividades.map((actividad) => ({
                        title: actividad.nombre,
                        date: actividad.fecha,
                    }));
                    setEventos(eventosActividades);
                }
            } catch (error) {
                console.error('Error al obtener las actividades: ', error);
            }
        };

        obtenerActividades();
    }, []);

    return (
        <div>
            <h1>Calendario de Actividades</h1>
            <Calendar
                plugins={[dayGridPlugin]}
                initialView="dayGridMonth"
                events={eventos}
            />
        </div>
    );
};

export default CalendarioActividades;
