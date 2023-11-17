import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Global } from '../../../helpers/Global';

const KPITasaFinalizacionProyectosDashboard = () => {
    const [proyectosEstado, setProyectosEstado] = useState([]);
    const [porcentajeFinalizados, setPorcentajeFinalizados] = useState('Cargando...');

    useEffect(() => {
        const fetchProyectosPorEstado = async () => {
            try {
                const response = await fetch(`${Global.url}proyecto/proyectos-por-estado`);
                const jsonResponse = await response.json();
                
                if (jsonResponse.status === 'success') {
                    const { porRevisar, enProceso, finalizado } = jsonResponse.datos;
                    const totalProyectos = porRevisar + enProceso + finalizado;
                    const porcentaje = totalProyectos > 0 ? (finalizado / totalProyectos * 100).toFixed(2) : 0;
                    
                    setProyectosEstado([
                        { name: 'Por Revisar', cantidad: porRevisar },
                        { name: 'En Proceso', cantidad: enProceso },
                        { name: 'Finalizado', cantidad: finalizado }
                    ]);
                    
                    setPorcentajeFinalizados(`${porcentaje}%`);
                } else {
                    throw new Error('La respuesta del servidor no fue exitosa');
                }
            } catch (error) {
                console.error('Error al obtener los datos:', error);
                setPorcentajeFinalizados('Error al cargar');
            }
        };

        fetchProyectosPorEstado();
    }, []);

    return (
        <div>
            <h1>Estado de los Proyectos</h1>
            <p><strong>Porcentaje de Proyectos Finalizados:</strong> {porcentajeFinalizados}</p>
            <ResponsiveContainer width="100%" height={300}>
                <BarChart data={proyectosEstado}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="cantidad" fill="#8884d8" name="Cantidad de Proyectos" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default KPITasaFinalizacionProyectosDashboard;

