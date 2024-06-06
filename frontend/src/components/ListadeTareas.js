import React, {useState, useEffect } from 'react'
import TareaFormulario from './TareaFormulario';
import '../stylesheets/ListadeTareas.css'
import Tarea from './Tarea';
import axios from "axios"
import { v4 as uuidv4 } from 'uuid';

function ListadeTareas(){

    const [Tareas, setTareas] = useState([]);

    const fetchTareas= async() => {
      try{
        const responseTareas= await fetch('http://localhost:5000/api/tarea');
        if(!responseTareas.ok){
          throw new Error("error al obtener los datos!");
        }
        const Tareas= await responseTareas.json();
        setTareas(Tareas);
       }catch{
        console.log("Error al obtener las tareas");
  
      }
    }
  
    useEffect(()=>{
      fetchTareas();
    },[]);


    const AgregarTarea= tarea => {
        if(tarea.texto.trim()){
            tarea.texto= tarea.texto.trim();
            const nuevoDocumento= {
                titulo: tarea.texto,
                descripcion: tarea.descripcion,
                completada: false
            }

            const TareaNueva= async(nuevoDocumento) => {
                try{
                  const creatTarea= await fetch('http://localhost:5000/api/crearTarea',
                    {
                        method:'POST',
                        headers:{
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(nuevoDocumento)
                    });
                  if(!creatTarea.ok){
                    throw new Error("Error al crear la tarea");
                  }


                  const tareaCreada = await creatTarea.json();
                  
                // Actualiza el estado del frontend inmediatamente
                setTareas(Tareas => [tareaCreada, ...Tareas ]);


                }catch{
                  console.log("Error al crear las tareas");
                }
            }
            TareaNueva(nuevoDocumento);
        }
    };
    const eliminarTarea = async (id) => {
        try {
            const response = await fetch(`http://localhost:5000/api/eliminarTarea/${id}`, {
                method: 'delete'
            });
    
             if (!response.ok) {
                throw new Error('FRONTEND: ERROR AL ELIMINAR');
            }
    
            const result = await response.json();
            
    
            // Actualizar el estado del frontend para reflejar la eliminación
            setTareas(prevTareas => prevTareas.filter(tarea => tarea._id !== id));
        } catch (error) {
            console.log('Error al eliminar la tarea:', error);
        }
    };
    const completarTarea = async (id) =>{
      

    const tacharTarea= async(nuevoDocumento) => {
        try{
          const TareaActualizada= await fetch(`http://localhost:5000/api/completarTarea/${id}`,
            {
                method:'POST',
                headers:{
                    'Content-Type': 'application/json'
                }
                //body: JSON.stringify({completada:true})
            });
          if(!TareaActualizada.ok){
            throw new Error("Error al crear la tarea");
          }

          const actualizada = await TareaActualizada.json();

        // Actualiza el estado del frontend inmediatamente
        setTareas(Tareas => 
          Tareas.map(tarea =>
          tarea._id === id ? { ...tarea, completada: actualizada.completada } : tarea
      ));


        }catch{
          console.log("Error al crear las tareas");
        }
    }
    tacharTarea();
    };

    const actualizarTarea = (id, nuevoTexto, nuevaDescripcion) => {
      setTareas((Tareas) =>
        Tareas.map((tarea) =>
          tarea._id === id
            ? { ...tarea, titulo: nuevoTexto, descripcion: nuevaDescripcion }
            : tarea
        )
      );
    };

    return (
        <>
            <TareaFormulario onSubmit={AgregarTarea} />
            <div className='tareas-lista-contenedor'>
                {
                    Tareas.map(
                        tarea => (
                            <Tarea
                                key={tarea._id}
                                id={tarea._id}
                                texto={tarea.titulo}
                                descripcion={tarea.descripcion}
                                completada={tarea.completada}
                                eliminarTarea={() => eliminarTarea(tarea._id)}
                                completarTarea={() => completarTarea(tarea._id)}
                                actualizarTarea={actualizarTarea}
                                
                            />
                        )
                    )
                }
            </div>
        </>
    )
}

export default ListadeTareas;