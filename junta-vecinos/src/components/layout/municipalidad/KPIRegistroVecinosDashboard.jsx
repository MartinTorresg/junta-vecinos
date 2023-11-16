import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area } from 'recharts'
import { Global } from '../../../helpers/Global';

const KPIRegistroVecinosDashboard = () => {
    const [kpiData, setKpiData] = useState({
        valorActual: 'Cargando...',
        historial: []
    });

    useEffect(() => {
        const fetchKPIData = async () => {
            try {
                const response = await fetch(Global.url + 'user/kpi-registro-vecinos');
                const data = await response.json();
                setKpiData({
                    valorActual: data.valorActual,
                    historial: data.historial
                });
            } catch (error) {
                console.error('Error al obtener los datos del KPI:', error);
            }
        };

        fetchKPIData();
    }, []);

    return (
        <div>
            <h1>Tasa de Registro de Vecinos</h1>
            <p><strong>Valor Actual:</strong> {kpiData.valorActual}%</p>
            <div style={{ width: '100%', height: 300 }}>
                <ResponsiveContainer>
                    <AreaChart data={kpiData.historial}>
                        <defs>
                            <linearGradient id="colorTasa" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                                <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
                            </linearGradient>
                        </defs>
                        <XAxis dataKey="fecha" />
                        <YAxis />
                        <CartesianGrid strokeDasharray="3 3" />
                        <Tooltip />
                        <Area type="monotone" dataKey="tasa" stroke="#8884d8" fillOpacity={1} fill="url(#colorTasa)" />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default KPIRegistroVecinosDashboard;
