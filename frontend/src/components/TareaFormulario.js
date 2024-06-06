import React, {useState} from 'react'
import '../stylesheets/TareaFormulario.css'
import { v4 as uuidv4 } from 'uuid';

function TareaFormulario(props){
    const [input, setInput] = useState('');
    const [Nuevadescripcion, setNuevaDescripcion] = useState('');

    const ManejarCambio= e =>{
        setInput(e.target.value);
    }
    const ManejarDescripcion= e =>{
        setNuevaDescripcion(e.target.value)
    }
    const ManejarEnvio= e =>{
        e.preventDefault();
        const TareaNueva = {
            id: uuidv4(),
            //generar ID'S unicos para las tareas con un paquete externo: paquete UUID
            texto: input,
            descripcion: Nuevadescripcion,
            completada: false
        };
        props.onSubmit(TareaNueva);
    }
    return (
        <form onSubmit={ManejarEnvio} className='tarea-formulario'>
            <input className='tarea-input'
            type="text"
            placeholder="Escribe una tarea"
            name="texto"
            onChange={ManejarCambio} />

            <input className='tarea-input' name="descripcion"
            type="text" placeholder="descripcion de la tarea" onChange={ManejarDescripcion}>
            </input>

            <button type="submit"
            className='tarea-boton'> Agregar tarea</button>
        </form>
    );
}

export default TareaFormulario;