const db = require('./db')
const helper = require('../helper')
const config = require('../config')

//Función para Iniciar Sesión
async function getUserData(email, password) {
    const rows = await db.query(`SELECT * FROM usuarios WHERE email = ? AND contraseña = ?`, [email, password]);
    const data = helper.emptyOrRows(rows[0]);
    return {data};
}

//Función para Registrarse
async function registerUser(email, password) {
    try {
      const result = await db.query('INSERT INTO usuarios (email, contraseña) VALUES (?, ?)', [email, password]);
      return { success: true, message: 'Usuario registrado correctamente' };
    } catch (error) {
      console.error('Error al registrar usuario:', error);
      return { success: false, message: 'Error al registrar usuario' };
    }
}

module.exports = {
    getUserData,
    registerUser
}
