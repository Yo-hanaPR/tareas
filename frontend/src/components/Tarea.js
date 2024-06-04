import React, {useState, useEffect} from 'react'
import '../stylesheets/Tarea.css'
import {AiOutlineCloseCircle} from 'react-icons/ai'
import { CiEdit } from "react-icons/ci";


function Tarea({id, texto, descripcion, completada, completarTarea, eliminarTarea}){
    const [editando, setEditando] = useState(false);
    const [nuevoTexto, setNuevoTexto] = useState(texto);
    const [nuevaDescripcion, setNuevaDescripcion] = useState(descripcion);

    /*
    
    PARA EDITAR LAS TAREAS: EN CHATGPT ESTÄ COMO... en la conversacion Conseguir Alumnos sin internet
    const handleEditClick = () => {
        setEditando(true);
    };

    const handleSaveClick = () => {
        editarTarea(id, nuevoTexto, nuevaDescripcion);
        setEditando(false);
    };*/
    
    
    return (
        <div className={completada ? 'tarea-contenedor completada': 'tarea-contenedor'}>
            <div className='tarea-texto'
            onClick={()=>completarTarea(id)}>
                <h2>{texto}</h2>
                <p>
                {descripcion}</p>
            </div>
            <div className='tarea-contenedor-iconos'
            onClick={()=> eliminarTarea(id)}>
                <AiOutlineCloseCircle className='tarea-icono'/>
                <CiEdit className='tarea-icono'/>
            </div>
        </div>
    )
}
export default Tarea;