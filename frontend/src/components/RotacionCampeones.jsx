import React, { useState, useEffect } from 'react';
import { Paper, Typography } from '@mui/material';
import Footer from './Menu/Footer';
import Navbar from './Menu/Navbar';
import { obtenerRotacionCampeones, obtenerNombreDeCampeonDesdeAPI, obtenerDescripcionCampeonDesdeAPI, obtenerTituloCampeonDesdeAPI, obtenerHabilidadesCampeonDesdeAPI } from '../ScriptsAPI/BuscarCampeones';
import '../components/Styles/Rotacion.css';
import '../App.css';



function ComponenteDeCampeones() {
  
  //Variables para almacenar
  const [idsDeCampeones, setIdsDeCampeones] = useState([]);
  const [nombresDeCampeones, setNombresDeCampeones] = useState([]);
  const [URLsDeImagenes, setURLsDeImagenes] = useState([]);
  const [descripcion, setDescripcion] = useState("");
  const [nombreSeleccionado, setNombreSeleccionado] = useState("");
  const [tituloSeleccionado, setTituloSeleccionado] = useState("");
  const [habilidades, setHabilidades] = useState([]);

  //Obtener la rotación de campeones al iniciarse la página (ids)
  useEffect(() => {
    async function cargarIdsDeCampeones() {
      try {
        const ids = await obtenerRotacionCampeones();
        setIdsDeCampeones(ids);
      } catch (error) {
        console.error("Error al obtener los IDs de los campeones:", error);
      }
    }
    cargarIdsDeCampeones();
  }, []);

  //Obtener nombres de campeones por los ids obtenidos anteriormente
  useEffect(() => {
    async function cargarNombresDeCampeones() {
      try {
        const nombres = await Promise.all(idsDeCampeones.map(id => obtenerNombreDeCampeonDesdeAPI(id)));
        setNombresDeCampeones(nombres);
      } catch (error) {
        console.error("Error al obtener los nombres de los campeones:", error);
      }
    }
    cargarNombresDeCampeones();
  }, [idsDeCampeones]);

  //Otener imagenes de campeones por nombres de campeones
  useEffect(() => {
    async function cargarImagenesDeCampeones() {
      try {
        const mapeoNombresImagenes = {
          "kai'sa": "Kaisa",
          "wukong": "MonkeyKing",
          "bel'veth": "BelVeth",
          "kha'zix": "Khazix",
        };
        const urls = nombresDeCampeones.map(nombre => {
          const nombreLowerCase = nombre.toLowerCase();
          const nombreFormateado = mapeoNombresImagenes[nombreLowerCase] || nombre;
          const nombreFormateadoSinEspacios = nombreFormateado.replace(/[^\w\s]/gi, '').replace(/\s/g, '');
          return `https://ddragon.leagueoflegends.com/cdn/14.4.1/img/champion/${nombreFormateadoSinEspacios}.png`;
        });
        setURLsDeImagenes(urls);
      } catch (error) {
        console.error("Error al obtener las URL de las imágenes de los campeones:", error);
      }
    }
    cargarImagenesDeCampeones();
  }, [nombresDeCampeones]);

  //Al hacer click en la imagen del campeón, se obtiene el nombre y se muestra el título, descripción y habilidades
  async function handleClick(nombreCampeon) {
    try {
      const excepciones = {
        "Kai'Sa": "Kaisa",
        "Wukong": "MonkeyKing",
        "Bel'Veth": "BelVeth",
        "Kha'Zix": "Khazix",
      };
      const nombreFormateado = excepciones[nombreCampeon] || nombreCampeon;
      const nombreSinEspacios = nombreFormateado.replace(/\s/g, '');
      const descripcionObtenida = await obtenerDescripcionCampeonDesdeAPI(nombreSinEspacios);
      const tituloObtenido = await obtenerTituloCampeonDesdeAPI(nombreSinEspacios);
      const habilidadesObtenidas = await obtenerHabilidadesCampeonDesdeAPI(nombreSinEspacios);

      setDescripcion(descripcionObtenida);
      setNombreSeleccionado(nombreCampeon);
      setTituloSeleccionado(tituloObtenido);
      setHabilidades(habilidadesObtenidas);
    } catch (error) {
      console.error('Error al obtener la descripción del campeón:', error);
      setDescripcion("Descripción no disponible");
    }
  }

  return (
    <div className="App">
      <Navbar />
      <h2>Nombres de Campeones</h2>

      <div className="campeon-container">
        <ul className="campeon-list">
          {nombresDeCampeones && nombresDeCampeones.map((nombre, index) => (
            <li key={index}>
              <img
                src={URLsDeImagenes[index]}
                alt={`Imagen del campeón ${nombre}`}
                className="campeon-image"
                onClick={() => handleClick(nombre)}
              />
              <div className="campeon-nombre">{nombre}</div>
            </li>
          ))}
        </ul>
      </div>

      <div className="campeon-detalles">
        {nombreSeleccionado && (

          <div className="paper-container">
            <Paper elevation={3} className='paper'>
              <Typography id='nombre' variant="h3">{nombreSeleccionado}</Typography>
              <Typography id='titulo' variant="h4">{tituloSeleccionado}</Typography>
              <br/>
              <Typography id='descripcion' variant="body1">{descripcion}</Typography>
              
              <div className="habilidades-container">
                {habilidades.map((habilidad, index) => (
                  <div key={index} className="habilidad">
                    <img src={`https://ddragon.leagueoflegends.com/cdn/14.4.1/img/spell/${habilidad.image.full}`} alt={habilidad.name} />
                    <Typography variant="body1">{habilidad.name}</Typography>
                  </div>
                ))}
              </div>
            </Paper>
          </div>

        )}
      </div>
      <Footer/>
    </div>
  );
}

export default ComponenteDeCampeones;
