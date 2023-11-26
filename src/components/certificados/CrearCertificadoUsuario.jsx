import React, { useState } from 'react';
import { Peticion } from '../../helpers/Peticion';
import { Global } from '../../helpers/Global';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { DescargarCertificadoButton } from '../user/DescargarCertificadoButton';

pdfMake.vfs = pdfFonts.pdfMake.vfs;

export const CrearCertificadoUsuario = () => {

  return (
    <div className='jumbo'>
      <h1>Crear certificado</h1>
      <DescargarCertificadoButton />
    </div>
  );
};
