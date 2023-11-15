import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import axios from 'axios';
import Modal from 'react-modal';
import 'react-calendar/dist/Calendar.css';
import { Global } from '../../helpers/Global';

Modal.setAppElement('#root');

const CalendarioActividades = () => {
    const [fecha, setFecha] = useState(new Date());
    const [actividades, setActividades] = useState([]);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [actividadesSeleccionadas, setActividadesSeleccionadas] = useState([]);

    useEffect(() => {
        const fechaFormato = fecha.toISOString().split('T')[0];
        axios.get(Global.url + `actividad/actividades/${fechaFormato}`)
            .then(response => {
                // Filtrar solo las actividades aprobadas
                const actividadesAprobadas = response.data.actividades.filter(actividad => actividad.estado === 'aprobada');
                setActividades(actividadesAprobadas);
            })
            .catch(error => {
                console.error('Error al obtener actividades', error);
            });
    }, [fecha]);

    const abrirModal = (actividadesDelDia) => {
        setActividadesSeleccionadas(actividadesDelDia);
        setModalIsOpen(true);
    };

    const cerrarModal = () => {
        setModalIsOpen(false);
        setActividadesSeleccionadas([]);
    };

    const tileContent = ({ date, view }) => {
        if (view === 'month') {
            const actividadesDelDia = actividades.filter(actividad => 
                new Date(actividad.fecha).toDateString() === date.toDateString()
            );
            if (actividadesDelDia.length > 0) {
                return <div className="day-with-activities">{actividadesDelDia.length}</div>;
            }
        }
        return null;
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
                        abrirModal(actividadesDelDia);
                    }
                }}
                tileContent={tileContent}
            />
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={cerrarModal}
                contentLabel="Detalle de Actividades"
            >
                {actividadesSeleccionadas.length > 0 ? (
                    <div>
                        <h2>Actividades del Día</h2>
                        <ul>
                            {actividadesSeleccionadas.map((actividad, index) => (
                                <li key={index}>
                                    {actividad.nombre} - {actividad.lugar} - {new Date(actividad.fecha).toLocaleDateString()}
                                </li>
                            ))}
                        </ul>
                        <button onClick={cerrarModal}>Cerrar</button>
                    </div>
                ) : (
                    <p>No hay actividades programadas para esta fecha.</p>
                )}
            </Modal>
        </div>
    );
};

export default CalendarioActividades;
