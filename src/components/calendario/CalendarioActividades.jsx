import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import axios from 'axios';
import Modal from 'react-modal';
import 'react-calendar/dist/Calendar.css';
import { Global } from '../../helpers/Global';
import { Link } from 'react-router-dom';

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
                const actividadesAprobadas = response.data.actividades.filter(actividad => actividad.estado === 'aprobada');
                setActividades(actividadesAprobadas);
            })
            .catch(error => {
                console.error('Error al obtener actividades', error);
            });
    }, [fecha]);

    const convertirAFechaUTC = (fechaString) => {
        const [year, month, day] = fechaString.split('-').map(num => parseInt(num, 10));
        return new Date(Date.UTC(year, month - 1, day));
    };

    const abrirModal = (actividadesDelDia) => {
        setActividadesSeleccionadas(actividadesDelDia);
        setModalIsOpen(true);
    };

    const cerrarModal = () => {
        setModalIsOpen(false);
        setActividadesSeleccionadas([]);
    };

    const compararFechas = (fecha1, fecha2) => {
        return fecha1.getFullYear() === fecha2.getFullYear() &&
            fecha1.getMonth() === fecha2.getMonth() &&
            fecha1.getDate() === fecha2.getDate();
    };

    const tileContent = ({ date, view }) => {
        if (view === 'month') {
            const actividadesDelDia = actividades.filter(actividad =>
                compararFechas(convertirAFechaUTC(actividad.fecha), date)
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
                        compararFechas(convertirAFechaUTC(actividad.fecha), value)
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
                className="modal"
            >
                {actividadesSeleccionadas.length > 0 ? (
                    <div>
                        <h2 className="modal-titulo">Actividades del Día</h2>
                        <ul className="modal-lista">
                            {actividadesSeleccionadas.map((actividad, index) => (
                                <li key={index}>
                                    <Link to={"/admin/actividad/" + actividad._id}>{actividad.nombre}</Link> - {actividad.lugar} - {convertirAFechaUTC(actividad.fecha).toLocaleDateString()}
                                </li>
                            ))}
                        </ul>
                        <button onClick={cerrarModal} className="modal-boton">Cerrar</button>
                    </div>
                ) : (
                    <p>No hay actividades programadas para esta fecha.</p>
                )}
            </Modal>

        </div>
    );
};

export default CalendarioActividades;
