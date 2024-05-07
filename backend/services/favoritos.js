const db = require('./db');
const helper = require('../helper');
const config = require('../config');

//Función para agregar un favorito a la BD
async function agregarFavorito(req, res) {
  const { id_usuario, perfil } = req.query;

  if (!id_usuario || !perfil) {
    return res.status(400).json({ message: 'Falta id_usuario y perfil' });
  }

  try {
    const result = await db.query('INSERT INTO favoritos (usuario_id, perfil) VALUES (?, ?)',[id_usuario, perfil]);
    return res.status(200).json({ message: 'Favorito agregado correctamente' });
  } catch (error) {
    return res.status(500).json({ message: 'Error al agregar el favorito' });
  }
}

//Función para obtener un favorito por id de la BD
async function obtenerFavoritosUsuario(req, res) {
  try {
    const { id_usuario } = req.query;
    const result = await db.query(`SELECT * FROM favoritos WHERE usuario_id = ?`, [id_usuario]);
    const data = helper.emptyOrRows(result);
    return {data: data};
  } catch (error) {
    throw new Error(`Error al obtener los favoritos: ${error.message}`);
  }
}

//Función para eliminar un favorito de la BD
async function eliminarFavorito(req, res) {
  const { perfil, id_usuario } = req.query;

  try {
    const result = await db.query(
      'DELETE FROM favoritos WHERE perfil = ? AND usuario_id = ?',[perfil, id_usuario]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'El favorito no existe para este usuario' });
    }
    return res.status(200).json({ message: 'Favorito eliminado correctamente' });
  } catch (error) {
    console.error('Error al eliminar el favorito:', error);
    return res.status(500).json({ error: 'Hubo un problema al eliminar el favorito' });
  }
}

module.exports = {
  agregarFavorito,
  obtenerFavoritosUsuario,
  eliminarFavorito
};
