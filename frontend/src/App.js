import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom'; 
import BuscadorPerfil from './components/BuscadorPerfil';
import RotacionCampeones from './components/RotacionCampeones';
import PreguntasRespuestas from './components/PreguntasRespuestas';
import Login from './components/Login/Login';
import './App.css';


const router = createBrowserRouter([
  {
    path: '/',
    children: [
      {
        index: true,
        element: <Login />
      },
      {
        path: 'buscar',
        element: <BuscadorPerfil />
      },
      {
        path: 'rotacion',
        element: <RotacionCampeones />
      },
      {
        path: 'ayuda',
        element: <PreguntasRespuestas/>
      }
      
    ]
  }
]);


function App() {
  return (
    <RouterProvider router={router} />
  );
}



export default App;
