import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import { Global } from '../../helpers/Global';
import useAuth from '../../hooks/useAuth';
import { Peticion } from '../../helpers/Peticion';

export const Proyecto = () => {
    const [proyecto, setProyecto] = useState({});
    const [descripcionEditada, setDescripcionEditada] = useState("");
    const [presupuestoEditado, setPresupuestoEditado] = useState(0);
    const [presupuestoGastadoEditado, setPresupuestoGastadoEditado] = useState(0);
    const [estadoProyecto, setEstadoProyecto] = useState('');
    const [archivos, setArchivos] = useState([]);
    const [cargando, setCargando] = useState(true);
    const params = useParams();
    const [mensajeExito, setMensajeExito] = useState('');
    const [archivosSubidos, setArchivosSubidos] = useState([]);
    const { auth } = useAuth();

    useEffect(() => {
        conseguirProyecto();
        obtenerArchivosSubidos();
    }, []);

    const conseguirProyecto = async () => {
        const { datos } = await Peticion(Global.url + "proyecto/proyecto/" + params.id, "GET");
        console.log(auth)

        if (datos.status === "success") {
            setProyecto(datos.proyecto);
            setDescripcionEditada(datos.proyecto.descripcion);
            setPresupuestoEditado(datos.proyecto.presupuesto);
            setPresupuestoGastadoEditado(datos.proyecto.presupuestoGastado);
            setEstadoProyecto(datos.proyecto.estado);
        }

        setCargando(false);
    }

    const obtenerArchivosSubidos = async () => {
        try {
            console.log('Obteniendo archivos subidos para el proyecto con ID:', params.id);

            // Realiza la petición al backend
            const response = await fetch(Global.url + 'proyecto/proyecto/' + params.id + '/archivos');

            console.log('Respuesta recibida del servidor:', response);

            // Verifica si la respuesta del servidor fue exitosa
            if (response.ok) {
                const resData = await response.json();
                console.log('Archivos obtenidos del proyecto:', resData.archivos);
                setArchivosSubidos(resData.archivos); // Asume que la respuesta contiene un campo 'archivos'
            } else {
                console.log('Error en la respuesta del servidor:', response);
                throw new Error('No se pudieron obtener los archivos');
            }
        } catch (error) {
            console.error('Error al obtener los archivos:', error);
        }
    };


    const modificarProyecto = async (e) => {
        e.preventDefault(); // Previene el comportamiento por defecto del formulario

        // Verifica si el estado es "Finalizado" y si el presupuesto gastado no ha sido ingresado
        if (estadoProyecto === "Finalizado" && (!presupuestoGastadoEditado || presupuestoGastadoEditado <= 0)) {
            alert("Debes ingresar el presupuesto gastado para finalizar el proyecto.");
            return;
        }

        const datosActualizados = {
            descripcion: descripcionEditada,
            presupuesto: presupuestoEditado,
            estado: estadoProyecto,
            presupuestoGastado: presupuestoGastadoEditado // Asegúrate de enviar el presupuesto gastado al backend
        };

        const respuesta = await Peticion(Global.url + "proyecto/proyecto/modificar/" + proyecto._id, "PUT", datosActualizados);

        if (respuesta.status === "success") {
            console.log('Respuesta del servidor al modificar proyecto:', respuesta);
            setMensajeExito('El proyecto se ha modificado con éxito.');
            // Suponiendo que la respuesta del servidor contiene el proyecto actualizado en 'respuesta.proyecto'
            setProyecto(respuesta.proyecto);
            // Actualiza los estados de presupuestoEditado y estadoProyecto
            setPresupuestoEditado(respuesta.proyecto.presupuesto);
            setPresupuestoGastadoEditado(respuesta.proyecto.presupuestoGastado);
            setEstadoProyecto(respuesta.proyecto.estado);
        } else {
            console.error('Error al modificar el proyecto:', respuesta.message || 'Mensaje de error no proporcionado');
            setMensajeExito('El proyecto se ha modificado con éxito.');
        }

        setTimeout(() => setMensajeExito(''), 5000);
    };

    const handleChangeEstado = (e) => {
        const nuevoEstado = e.target.value;
        setEstadoProyecto(nuevoEstado);
    }

    const handleFileChange = (e) => {
        setArchivos(e.target.files);
    };

    const handleSubmitFiles = async () => {
        if (archivos.length === 0) {
            alert('Por favor, selecciona al menos un archivo para subir.');
            return;
        }

        const formData = new FormData();
        for (let i = 0; i < archivos.length; i++) {
            formData.append('archivos', archivos[i], archivos[i].name);
        }

        // Agrega el ID del proyecto a FormData
        formData.append('proyectoId', proyecto._id);

        try {
            const response = await fetch(Global.url + 'proyecto/subir', {
                method: 'POST',
                body: formData,
                // No necesitas especificar el Content-Type para FormData
                // No agregues headers: { 'Content-Type': 'multipart/form-data' }
            });

            if (response.ok) {
                // Verifica si la respuesta es JSON
                const contentType = response.headers.get("content-type");
                if (contentType && contentType.indexOf("application/json") !== -1) {
                    const resData = await response.json(); // Parsea la respuesta como JSON
                    alert('Archivos subidos con éxito: ' + resData.message);
                } else {
                    const resText = await response.text(); // Maneja la respuesta como texto plano
                    alert('Archivos subidos con éxito: ' + resText);
                }
                await obtenerArchivosSubidos();
                // ...
            } else {
                throw new Error(`Error al subir los archivos: ${response.status}`);
            }

        } catch (error) {
            console.error('Error en la subida de archivos:', error);
            alert('Hubo un problema al subir los archivos.');
        }
    };

    const descargarArchivo = (path) => {
        // Puedes utilizar window.open o crear un enlace y hacer click en él para descargar
        window.open(path);
    };

    const eliminarArchivo = async (archivoId, index) => {
        console.log("esta es la id: ", archivoId)
        // Confirmar la eliminación primero
        if (!window.confirm('¿Estás seguro de que deseas eliminar este archivo?')) {
            return;
        }

        try {
            const response = await fetch(`${Global.url}proyecto/proyecto/` + params.id + '/archivo/' + archivoId, {
                method: 'DELETE',
                // Aquí debes incluir cualquier configuración necesaria, como headers para la autenticación
            });

            if (response.ok) {
                // Elimina el archivo del estado si la eliminación fue exitosa
                setArchivosSubidos(prevArchivos => prevArchivos.filter((_, i) => i !== index));
                alert('Archivo eliminado con éxito.');
            } else {
                throw new Error('Error al eliminar el archivo.');
            }
            await obtenerArchivosSubidos();
        } catch (error) {
            console.error('Error al eliminar el archivo:', error);
            alert('Hubo un problema al eliminar el archivo.');
        }
    };


    return (
        <div className='jumbo-proyecto'>
            {cargando ? "Cargando..." : (
                <form onSubmit={modificarProyecto}>
                    {mensajeExito && <div className="alerta-exito-proyecto">{mensajeExito}</div>}
                    <h1>{proyecto.nombre}</h1>
                    <p>Descripción del proyecto:</p>
                    <textarea
                        value={descripcionEditada}
                        onChange={(e) => setDescripcionEditada(e.target.value)}
                    />
                    <p>Presupuesto:</p>
                    <input
                        type="number"
                        value={presupuestoEditado}
                        onChange={(e) => setPresupuestoEditado(e.target.value)}
                    />
                    {estadoProyecto === "Finalizado" && (
                        <>
                            <p>Presupuesto Gastado:</p>
                            <input
                                type="number"
                                value={presupuestoGastadoEditado}
                                onChange={(e) => setPresupuestoGastadoEditado(e.target.value)}
                                required
                            />
                        </>
                    )}
                    <p>Estado del proyecto:</p>
                    <select value={estadoProyecto} onChange={handleChangeEstado}>
                        <option value="Por Revisar">Por Revisar</option>
                        <option value="Rechazado">Rechazado</option>
                        <option value="En Proceso">En Proceso</option>
                        <option value="Finalizado">Finalizado</option>
                    </select>
                    <button type="submit">Modificar</button>
                </form>
            )}
            {/* Input para subir archivos */}
            <input
                type="file"
                multiple
                onChange={handleFileChange}
            />
            <button onClick={handleSubmitFiles}>Subir Archivos</button>

            {/* Visualizar archivos seleccionados */}
            {archivosSubidos.length > 0 && (
                <div className="archivos-subidos">
                    <h3>Archivos subidos:</h3>
                    {archivosSubidos.map((archivo, index) => (
                        <div key={index} className="archivo-item">
                            <span className="archivo-nombre">{archivo.nombre}</span>
                            {/* Botón para descargar el archivo */}
                            <button className="btn descargar-btn" onClick={() => descargarArchivo(archivo.path)}>
                                Descargar
                            </button>
                            {/* Botón para eliminar el archivo */}
                            <button className="btn eliminar-btn" onClick={() => eliminarArchivo(archivo._id, index)}>
                                Eliminar
                            </button>
                        </div>
                    ))}
                </div>
            )}

        </div>
    );
};
