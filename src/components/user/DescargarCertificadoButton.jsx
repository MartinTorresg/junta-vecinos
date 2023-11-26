import React from 'react';
import axios from 'axios';
import { Global } from '../../helpers/Global';
import { Peticion } from '../../helpers/Peticion';

export const DescargarCertificadoButton = () => {
    const tokenDeUsuario = localStorage.getItem('token');
    console.log("Token de Usuario en el frontend:", tokenDeUsuario);

    const handleDownload = async () => {
        try {
            console.log("Haciendo petición para descargar certificado");

            const response = await axios.get(Global.url + 'user/descargar-certificado', {
                headers: {
                    'Authorization': `Bearer ${tokenDeUsuario}`,
                    'Content-Type': 'application/json'
                },
                responseType: 'blob' // Importante para recibir el archivo correctamente
            });

            console.log("Respuesta recibida del servidor:", response);

            // Crear un enlace para descargar el archivo
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'certificado.pdf'); // o el nombre que prefieras
            document.body.appendChild(link);
            link.click();
            link.parentNode.removeChild(link)
        } catch (error) {
            console.error('Error al descargar el certificado', error);
            // Manejar el error (mostrar mensaje, etc.)
        }
    };

    return (
        <button onClick={handleDownload}>
            Descargar Certificado
        </button>
    );
};
