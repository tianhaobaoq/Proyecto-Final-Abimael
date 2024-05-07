import React, { useState } from 'react';
import Navbar from './Menu/Navbar';
import FAQ from '../ScriptsAPI/FAQ';
import Footer from './Menu/Footer';
import '../components/Styles/FAQ.css';

//Preguntas y respuestas
function PreguntasRespuestas () {
  const [faqs, setfaqs] = useState([
    {
      pregunta: '¿Cuál es el objetivo principal de la web?',
      respuesta: 'Proporcionar al usuario un sistema de gestión donde puede consultar tanto los campeones que hay disponibles dentro del juego, como los diferentes perfiles de millones ' +
      'de jugadores dentro del videojuego League of Legends de forma gratuita y eficiente',
      open: false
    },
    {
      pregunta: '¿Puedo guardar jugadores como favoritos para un acceso rápido?',
      respuesta: 'Sí, puedes guardar jugadores como favoritos para acceder rápidamente a ellos más tarde en la seccion llamada "Favoritos" dentro de la web de búsqueda.' +
      'Simplemente, haz clic en el icono de la estrella junto al nombre del jugador para agregarlo a tus favoritos.Cabe recalcar, que estos favoritos se quedaran almacenados ' +
      'en cada cuenta de cada usuario de forma PERSONAL.',
      open: false
    },
    {
      pregunta: '¿La web está disponible en varios idiomas?',
      respuesta: 'Por ahora solo se encuentra disponible en castellano',
      open: false
    },
    {
      pregunta: '¿La información de la web se actualiza automáticamente con las últimas estadísticas y cambios en el juego?',
      respuesta: 'Gracias a la conexion con los servidores de Riot API, la web se actualizara de forma automática cuando se actualize el propio juego',
      open: false
    },{
      pregunta: '¿Que hago si encuentro un "bug" en la web, o necesito contactar con el soporte?',
      respuesta: 'Ante cualquier duda/consulta, no dude en contactar con nosotros en la direccion de correo "searchgg@support.com".',
      open: false
    }
  ]);

  const toggleFAQ = index => {
    setfaqs(faqs.map((faq, i) => {
      if (i === index) {
        faq.open = !faq.open
      } else {
        faq.open = false;
      }
      return faq;
    }))
  }

  return (
    <div className="App">
      <Navbar />
      <h1 style={{fontSize: '60px', fontWeight: 'bold'}}>Preguntas frecuentes</h1>
      <div className="faqs">
        {faqs.map((faq, i) => (
          <FAQ faq={faq} index={i} toggleFAQ={toggleFAQ} />
        ))}
      </div>
      <Footer />
    </div>
  );
}

export default PreguntasRespuestas;