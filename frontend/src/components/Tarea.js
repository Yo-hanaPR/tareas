import React, {useState, useEffect} from 'react'
import '../stylesheets/Tarea.css'
import {AiOutlineCloseCircle} from 'react-icons/ai'
import { CiEdit } from "react-icons/ci";
import { FaSave } from "react-icons/fa";


function Tarea({id, texto, descripcion, completada, completarTarea, eliminarTarea, actualizarTarea }){
    const [editando, setEditando] = useState(false);
    const [nuevoTexto, setNuevoTexto] = useState(texto);
    const [nuevaDescripcion, setNuevaDescripcion] = useState(descripcion);

    const editarTarea = async (id, nuevoTexto, nuevaDescripcion) => {
        try {
          const response = await fetch(`http://localhost:5000/api/editarTarea/${id}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ texto: nuevoTexto, descripcion: nuevaDescripcion })
          });
          if (!response.ok) {
            throw new Error('Error al editar la tarea');
          }
        actualizarTarea(id, nuevoTexto, nuevaDescripcion);
        }  catch (error) {
        console.log('Error al editar la tarea:', error);
        }
        setEditando(false);
    };

    const handleEditClick = () => {
        setEditando(true);
    };

    return (
    <div className={completada ? 'tarea-contenedor completada' : 'tarea-contenedor'}>
      {editando ? (
        <div className='tarea-texto'>
          <input
            type='text'
            className='tarea-input-edit'
            value={nuevoTexto}
            onChange={(e) => setNuevoTexto(e.target.value)}
          />
          <input
            type='text'
            className='tarea-input-edit'
            value={nuevaDescripcion}
            onChange={(e) => setNuevaDescripcion(e.target.value)}
          />
          <FaSave className='tarea-icono' onClick={() => editarTarea(id, nuevoTexto, nuevaDescripcion)} />
     
        </div>
      ) : (
        <div className='tarea-texto' onClick={() => completarTarea()}>
          <h2>{texto}</h2>
          <p>{descripcion}</p>
        </div>
      )}
      <div className='tarea-contenedor-iconos'>
        <AiOutlineCloseCircle className='tarea-icono' onClick={() => eliminarTarea()} />
        <CiEdit className='tarea-icono' onClick={handleEditClick} />
         </div>
    </div>
  );
}
export default Tarea;