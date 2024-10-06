const express = require('express');
const adminRoutes = require('./routes/admin');
const iptvRoutes = require('./routes/iptv');

const app = express();
const port = process.env.PORT || 3000;

// Logs para ver si el servidor está corriendo correctamente
console.log("Iniciando servidor...");

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rutas
app.use('/admin', adminRoutes);  // Ruta del panel de administración
app.use('/iptv', iptvRoutes);    // Ruta del servidor IPTV

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error("Error detectado:", err.stack);
  res.status(500).send('Something went wrong!');
});

// Ruta de prueba para verificar que el servidor está vivo
app.get('/', (req, res) => {
  res.send('Servidor IPTV está funcionando correctamente.');
});

// Inicio del servidor
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
