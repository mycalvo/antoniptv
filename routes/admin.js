const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin');

// Middleware para autenticación básica
const basicAuth = (req, res, next) => {
  const auth = { login: 'admin', password: 'password123' }; // Credenciales por defecto

  // Parse Header
  const b64auth = (req.headers.authorization || '').split(' ')[1] || '';
  const [login, password] = Buffer.from(b64auth, 'base64').toString().split(':');

  // Verifica las credenciales
  if (login && password && login === auth.login && password === auth.password) {
    return next();
  }

  // Si falla la autenticación
  res.set('WWW-Authenticate', 'Basic realm="Admin Panel"');
  return res.status(401).send('Authentication required.');
};

// Aplicar autenticación a todas las rutas del panel
router.use(basicAuth);

// Gestión de usuarios
router.get('/users', adminController.getUsers);
router.post('/user', adminController.createUser);
router.delete('/user/:id', adminController.deleteUser);

// Gestión de servidores remotos
router.get('/servers', adminController.getServers);
router.post('/server', adminController.addServer);

module.exports = router;
