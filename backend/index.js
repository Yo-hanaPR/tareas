import express from "express"
import cors from "cors"
import mongoose from "mongoose"

const app= express();
const PORT= 5000;
app.use(express.json());

app.use(cors());

/** CONEXION MONGO DB */

    const URI= 'mongodb://yohannap:Tar345YP.@localhost:27017/Tareas';

    mongoose.connect(URI, {
        useNewUrlparser: true,
        useUnifiedTopology:true
    })
    .then(()=> console.log("MongoDB connected"))
    .catch(err=> console.log("Hubo un errror: "+err));

    const tareaSchema= new mongoose.Schema({
        titulo: String,
        descripcion: String,
        completada: Boolean
    });

    //Hace un middleware para la peticion SAVE supuestamente asigna ID'S autoincrementables
    tareaSchema.pre('save', function (next) {
        if (!this.id) {
            // Encuentra el valor máximo actual de ID y aumenta uno
            Tarea.findOne().sort().then(doc => {
                const maxId = doc ? doc.id : 0;
                this.id = maxId + 1;
                next();
            }).catch(err => {
                next(err);
            });
        } else {
            next();
        }
    });

    const Tarea= mongoose.model('tareas', tareaSchema);
/** CONEXION MONGO DB */

app.get('/api/tarea', async (req,res)=>{
    try{
        const tareas= await Tarea.find().sort({ _id: -1 });
        res.json(tareas);
    }
    catch(err){
        res.status(500).send(err);
    }
});
app.post('/api/crearTarea', async(req,res)=>{
    try{
        const nuevaTarea= req.body;
        const tareaCreada= new Tarea(nuevaTarea)
        await tareaCreada.save();
        res.status(201).json(tareaCreada);

    }catch{
        console.error(err);
        res.status(500).json({ message: "Error al crear la tarea" });
    }
});

app.post('/api/completarTarea/:id', async(req,res)=>{
    try{
        const tarea = await Tarea.findById(req.params.id);
        if (!tarea) {
            return res.status(404).json({ message: 'Tarea no encontrada' });
        }
        tarea.completada = !tarea.completada;
        await tarea.save();
        res.json(tarea);
    }catch{
        console.error(err);
        res.status(500).json({ message: "Error al crear la tarea" });
    }
});

app.delete('/api/eliminarTarea/:id', async(req, res)=>{
    
    try {
        
        const tareaEliminada = await Tarea.findByIdAndDelete(req.params.id);
        if (!tareaEliminada) {
            return res.status(404).json({ message: 'Tarea no encontrada' });
        }
        res.status(200).json(tareaEliminada);
    } catch (err) {
        res.status(500).json({ message: 'BACKEND: Error al eliminar la tarea' });
    }
});

app.put('/api/editarTarea/:id', async (req, res) => {
    try {
      const tareaActualizada = await Tarea.findByIdAndUpdate(
        req.params.id,
        {
          titulo: req.body.texto,
          descripcion: req.body.descripcion
        },
        { new: true }
      );
      res.status(200).json(tareaActualizada);
    } catch (err) {
      res.status(500).json({ message: 'Error al actualizar la tarea' });
    }
  });


app.listen(PORT, ()=> console.log(`App is running on port ${PORT}`))