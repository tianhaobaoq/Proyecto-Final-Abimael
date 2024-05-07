import { useSelector } from 'react-redux'
import { useEffect,useState} from 'react'
import { useNavigate} from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faSearch, faArrowUp, faArrowDown,faExclamationTriangle} from '@fortawesome/free-solid-svg-icons';
import recibirDatosInvocador from '../ScriptsAPI/BuscarInvocador';
import Navbar from './Menu/Navbar';
import Footer from './Menu/Footer';
import logo from '../logo.svg';
import '../fonts.css';
import '../components/Styles/Buscador.css';


function App() {

  //Variables para navegar entre páginas y mover datos
  const userData = useSelector(state => state.login);
  const Logueado = userData.isAutenticated
  const navigate = useNavigate()

  //Variables para almacenar datos
  const [invocador, setInvocador] = useState("");
  const [error, setError] = useState(false);
  const [favoritos, setFavoritos] = useState([]);
  const [mostrarFavoritos, setMostrarFavoritos] = useState(true);

  useEffect(() => {
    if (!Logueado) {
      navigate('/')
    }
    obtenerFavoritos()
  }, [Logueado, navigate])

  //Obtener favoritos del usuario
  const obtenerFavoritos = async () => {
    try {
      const response = await fetch(`http://localhost:3030/mostrarfavoritos?id_usuario=${userData.userId}`);
      const data = await response.json();
      setFavoritos(data.data);
    } catch (error) {
      console.error('Error al obtener los favoritos:', error);
    }
  };

  //Mostrar/Ocultar favoritos
  const toggleMostrarFavoritos = () => {
    setMostrarFavoritos(!mostrarFavoritos);
  };

  //Llamar a la función recibirDatosInvocador para buscar datos de invocador
  const buscarInvocador = async (nombreBuscar) => {
    await recibirDatosInvocador(setInvocador, setError,nombreBuscar);
  };

  //Tras buscarlo, limpiar y volver a buscar (favoritos)
  const limpiarYBuscarInvocador = async (nombre) => {
    setInvocador("");
    document.getElementById("nombreinvocador").value = nombre;
    await buscarInvocador();
  };

  //Recoge el nombre y lo busca
  const buscarInvocadorButton = async () => {
    const nombreBuscar = document.getElementById("nombreinvocador").value;
    await buscarInvocador(nombreBuscar);
  };

  //Añadir el perfil a favoritos o borrarlo
  const toggleFavorito = async (nombre) => {
    try {
      const isFavorito = favoritos.some(favorito => favorito.perfil === nombre);

      if (isFavorito) {
        await fetch(`http://localhost:3030/eliminarfavorito?perfil=${nombre}&id_usuario=${userData.userId}`);
        await obtenerFavoritos();
      } else {
        console.log(userData.userId,nombre);
        await fetch(`http://localhost:3030/agregarfavoritos?id_usuario=${userData.userId}&perfil=${nombre}`);
        await obtenerFavoritos();
      }
    } catch (error) {
      console.error('Error al actualizar los favoritos:', error);
    }
  };
  
  return (
    <div className="App">

      <Navbar />

      <img src={logo} className="App-logo" alt="logo" style={{ zIndex: -1 }} />
      <div className="EstiloLogo">
        Search.gg
      </div>

      <div className="favoritos-container">
        <h2 onClick={toggleMostrarFavoritos}>Favoritos <FontAwesomeIcon className="flecha" icon={mostrarFavoritos ? faArrowUp : faArrowDown} /></h2>
        {mostrarFavoritos && (
          <ul>
            {favoritos.map((favorito, index) => (
              <li key={index}>
                <span className="favorito-nombre" style={{ marginRight: '10px' }}>{favorito.perfil}</span>
                <FontAwesomeIcon className="buscar-icon" style={{ marginRight: '10px' }} icon={faSearch} onClick={() => limpiarYBuscarInvocador(favorito.perfil)} />
                <FontAwesomeIcon className="borrar-icon" icon={faTrashAlt} onClick={() => toggleFavorito(favorito.perfil)} />
              </li>
            ))}
          </ul>
        )}
      </div>

      <h1>Buscar Invocador</h1>

      <div className="buscador-container">
        <input type="text" id="nombreinvocador" placeholder="Buscar..." />
        <button type="submit" onClick={buscarInvocadorButton}>
          <FontAwesomeIcon icon={faSearch} />
        </button>
      </div>

      {error && <div className='error-container'>
        <p className='error-message'>
          <FontAwesomeIcon icon={faExclamationTriangle} className='error-icon' />
          El invocador no existe
        </p>
      </div>}

      {invocador && (
        <div className='perfil'>

          <h2>
            Perfil de {invocador.name}
            <span className="favorito-icon" role="img" aria-label="Agregar a favoritos" onClick={() => toggleFavorito(invocador.name)}>
              {favoritos.find(favorito => favorito.perfil === invocador.name  ) ? "★" : "☆"}
            </span>
          </h2>

          <div className='imagen'>
            <img src={`http://ddragon.leagueoflegends.com/cdn/11.4.1/img/profileicon/${invocador.profileIconId}.png`} alt="Icono de perfil" />
          </div>
          <p>Nivel: {invocador.summonerLevel}</p>
        </div>
      )}

      <Footer />

    </div>
  );
}

export default App;
