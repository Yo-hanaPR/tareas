import logo from './logo.svg';
import react, {useState, useEffect} from "react"
import './App.css';
import ListadeTareas from './components/ListadeTareas';

function App() {



  return (
    <div className="aplicacion-tareas">
      <header className="App-header">
        <img 
          src={logo} 
          className="App-logo" 
          alt="logo" 
          width="100" 
          height="100"
        />
      </header>
      <div className='tareas-lista-principal'>
        
        <h1>Mis tareas</h1>
        
        <ListadeTareas />
      </div>
    </div>
  );
}

export default App;
