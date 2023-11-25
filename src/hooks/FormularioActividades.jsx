import { useState } from "react";

export const FormularioActividades = (objetoInicial = {}) => {
    const [formulario, setFormulario] = useState(objetoInicial);

    const serializarFormulario = (formulario) => {
        const formData = new FormData(formulario);
        const objetoCompleto = {};

        for (let [name, value] of formData) {
            objetoCompleto[name] = value;
        }

        return objetoCompleto;
    };

    const enviado = (e) => {
        e.preventDefault();
        const actividad = serializarFormulario(e.target);
        setFormulario(actividad);

        // Aquí puedes añadir cualquier lógica adicional que necesites cuando el formulario se envíe.
    };

    const cambiado = ({ target }) => {
        const { name, value } = target;

        setFormulario({
            ...formulario,
            [name]: value,
        });
    };

    return {
        formulario,
        enviado,
        cambiado,
    };
};
