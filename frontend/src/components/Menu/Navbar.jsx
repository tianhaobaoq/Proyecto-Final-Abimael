import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate} from 'react-router-dom'
import { loginActions } from '../store/storelogin';
import "./Navbar.css";

function Navbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userData = useSelector(state => state.login); 
  const email = userData.email;
  const [Menu, setMenu] = useState(false);
  
  const CerrarSesion = () => {
    dispatch(loginActions.logout())
    navigate('/')    
  }

  const AbrirCerrarMenu = () => {
    setMenu(!Menu);
  };

  return (
    <nav>
      
      <div className="MenuUsuario" onClick={AbrirCerrarMenu}>
        <FontAwesomeIcon icon={faUser} className="IconoUsuario" />
        {Menu && (
          <div className="dropdown-menu">
            <button onClick={CerrarSesion}>
              <FontAwesomeIcon icon={faSignOutAlt} className="logout-icon" />
               Cerrar sesión
            </button>
          </div>
        )}
        <span>{email.substring(0, email.indexOf('@'))}</span> 
      </div>

      <ul className="nav-links">
        <li>
          <NavLink to="/buscar">Buscar</NavLink>
        </li>
        <li>
          <NavLink to="/rotacion">Rotación</NavLink>
        </li>
        <li>
          <NavLink to="/ayuda">Ayuda</NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
