import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import axios from 'axios';
import Modal from 'react-modal';
import 'react-calendar/dist/Calendar.css';
import { Global } from '../../helpers/Global';

// Configuración básica para el modal
Modal.setAppElement('#root'); // Reemplaza '#root' con el ID de tu elemento raíz

const CalendarioActividades = () => {
    const [fecha, setFecha] = useState(new Date());
    const [actividades, setActividades] = useState([]);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [actividadSeleccionada, setActividadSeleccionada] = useState(null);

    useEffect(() => {
        const fechaFormato = fecha.toISOString().split('T')[0];
        axios.get(Global.url + `actividad/actividades/${fechaFormato}`)
            .then(response => {
                setActividades(response.data.actividades);
            })
            .catch(error => {
                console.error('Error al obtener actividades', error);
            });
    }, [fecha]);

    const abrirModal = (actividad) => {
        setActividadSeleccionada(actividad);
        setModalIsOpen(true);
    };

    const cerrarModal = () => {
        setModalIsOpen(false);
        setActividadSeleccionada(null);
    };

    return (
        <div>
            <Calendar
                onChange={setFecha}
                value={fecha}
                onClickDay={(value, event) => {
                    const actividadesDelDia = actividades.filter(actividad => 
                        new Date(actividad.fecha).toDateString() === value.toDateString()
                    );
                    if (actividadesDelDia.length > 0) {
                        abrirModal(actividadesDelDia[0]); // Abrir modal con la primera actividad del día
                    }
                }}
            />
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={cerrarModal}
                contentLabel="Detalle de Actividad"
            >
                {actividadSeleccionada && (
                    <div>
                        <h2>{actividadSeleccionada.nombre}</h2>
                        <p>Lugar: {actividadSeleccionada.lugar}</p>
                        <p>Fecha: {actividadSeleccionada.fecha}</p>
                        {/* Otros detalles de la actividad */}
                        <button onClick={cerrarModal}>Cerrar</button>
                    </div>
                )}
            </Modal>
        </div>
    );
}

export default CalendarioActividades;