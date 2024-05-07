import React, { useState } from 'react';
import {toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginActions } from '../store/storelogin';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightToBracket } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';
import './Login.css';

function Login() {

  //Variables para navegar entre páginas y mover datos
  const navigate = useNavigate();
  const dispatch = useDispatch();

  //Variables para almacenar datos
  const [email, setEmail] = useState('');
  const [contraseña, setContraseña] = useState('');
  const [accion, setAccion] = useState('Iniciar Sesión');


//Variable que modifica si el usuario se quiere registrar, o Iniciar Sesion
  const handleRegistroInicio = () => {
    if (accion === 'Registrarse') {
      registrarUsuario();
    } else {
      iniciarSesion();
    }
  };


//Registrar un usuario
  const registrarUsuario = () => {
  if (email.length === 0 || contraseña.length === 0) {
    Swal.fire('Error', 'Por favor complete todos los campos', 'error');
    return;
  }
  fetch(`http://localhost:3030/register?email=${email}&password=${contraseña}`)
    .then(response => response.json())
    .then(response => {
      if (response) {
        if (!response.success) {
          Swal.fire('Error', 'Usuario ya registrado', 'error');
        } else {
          console.log('Usuario registrado correctamente:', response.data);
          Swal.fire({
            title: '¡Registro exitoso!',
            text: '¡Usuario registrado correctamente! Ahora puedes iniciar sesión.',
            icon: 'success',
            confirmButtonText: 'Ok',
            timer:4000
          });
        }
      }
    })
    .catch(error => {
      console.error('Error en la solicitud de registro:', error);
    });
};



  
//Variable para iniciar sesión
  const iniciarSesion = () => {
    if (email.length === 0 || contraseña.length === 0) {
      Swal.fire('Error', 'Por favor complete todos los campos', 'error');
      return;
    }
    fetch(`http://localhost:3030/login?user=${email}&password=${contraseña}`)
      .then(response => response.json())
      .then(response => {
        if (response) {
          if (Object.keys(response.data).length === 0) {
            Swal.fire('Error', 'Los datos introducidos son incorrectos', 'error');
            console.log('Datos incorrectamente');
          } else {
            console.log(response);
            if (response.data !== undefined) {
              console.log('Dispatch');
              dispatch(loginActions.login({
                id: response.data.id,
                email: response.data.email,
              }));
              navigate('/buscar');
            }
          }
        }
      })
      .catch(error => {
        console.error('Error en la solicitud de inicio de sesión:', error);
      });
  };

  return (

    //Diseño de apartado de login
    <div className="ContenedorLogin">
      <div className="ContenidoLogin">
        <h2 className="TituloLogin">{accion}</h2>
        <div className='Raya'/>

        <div className="Input">
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="E-Mail"
            required
          />
        </div>
        <div className="Input">
          <input
            type="password"
            value={contraseña}
            onChange={(e) => setContraseña(e.target.value)}
            placeholder="Contraseña"
            required
          />
        </div>
        <div className='ContenedorSubmit'>
          <button className={accion === 'Iniciar Sesión' ? 'submit gray' : 'submit'} onClick={() => { setAccion("Registrarse") }}>Registrarse</button>
          <button className={accion === 'Registrarse' ? 'submit gray' : 'submit'} onClick={() => { setAccion("Iniciar Sesión"); }}>Iniciar Sesión</button>
        </div>
        <div className="icon" onClick={handleRegistroInicio}>
            <FontAwesomeIcon icon={faRightToBracket}/>
        </div>
      </div>
    </div>
  );
}

export default Login;
