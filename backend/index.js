const express = require('express')
const cors = require('cors')
const login = require('./services/login')
const favoritos = require('./services/favoritos')
const port = 3030
const app = express()
app.use(express.json())
app.use(
    express.urlencoded({
        extended: true
    })
)
app.use(cors())

//Endpoint de Prueba
app.get('/', function (req, res) {
    res.json({ message: 'Hola Mundo!' })
})

//Endpoint para Iniciar Sesión
app.get('/login', async function(req, res, next) {
    console.log(req.query)
    try {
        res.json(await login.getUserData(req.query.user, req.query.password))
    } catch (err) {
        console.error(`Error while getting data `, err.message);
        next(err);
    }
})

//Endpoint para registrarse
app.get('/register', async function(req, res, next) {
    const { email, password } = req.query;
    try {
      const result = await login.registerUser(email, password);
      res.json(result);
    } catch (err) {
      res.status(500).json({ success: false, message: 'Error al registrar usuario' });
    }
  });

//Endpoint para agregar un favorito
app.get('/agregarfavoritos', async function(req, res, next) {
    try {
        const result = await favoritos.agregarFavorito(req, res);
    } catch (err) {
        console.error(`Error al agregar favorito: `, err.message);
        next(err);
    }
});

//Endpoint para mostrar favoritos
app.get('/mostrarfavoritos', async function(req, res, next) {
    try {
        res.json(await favoritos.obtenerFavoritosUsuario(req,res));
    } catch (err) {
        console.error(`Error al obtener favoritos: `, err.message);
        next(err);
    }
});

//Endpoint para eliminar favoritos
app.get('/eliminarfavorito', async function(req, res, next) {
    try {
        const result = await favoritos.eliminarFavorito(req, res);
        res.json({ message: 'Favorito eliminado correctamente' });
    } catch (err) {
        console.error(`Error al eliminar favorito: `, err.message);
        next(err);
    }
});

//Iniciar el backend
app.listen(port)
console.log('API escuchando en el puerto ' + port)
