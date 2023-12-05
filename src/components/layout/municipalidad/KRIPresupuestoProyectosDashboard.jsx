import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Global } from '../../../helpers/Global';

const DashboardDesviacionPresupuesto = () => {
  const [dataDesviacion, setDataDesviacion] = useState({
    desviacion: 'Cargando...',
    proyectos: []
  });

  useEffect(() => {
    const fetchDatosDesviacion = async () => {
      try {
        const response = await fetch(`${Global.url}proyecto/datos-desviacion-presupuesto`);
        if (!response.ok) {
          throw new Error('Error en la petición HTTP:', response.statusText);
        }
        const data = await response.json();
        setDataDesviacion({
          desviacion: data.desviacion,
          proyectos: data.proyectos
        });
      } catch (error) {
        console.error('Error al obtener los datos del KRI:', error);
      }
    };
    
    fetchDatosDesviacion();
  }, []);

  return (
    <div>
      <h1>Tasa de Desviación del Presupuesto de Proyectos</h1>
      <p><strong>Desviación Actual:</strong> {dataDesviacion.desviacion}%</p>
      <ResponsiveContainer width='100%' height={400}>
        <BarChart
          data={dataDesviacion.proyectos}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="nombre" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="desviacion" fill="#8884d8" name="Desviación Presupuestaria" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default DashboardDesviacionPresupuesto;
