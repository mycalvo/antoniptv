const express = require('express');
const router = express.Router();
const iptvController = require('../controllers/iptv');

// Rutas de IPTV para listas y API Xtream
router.get('/playlist/:user', iptvController.getPlaylist);
router.get('/xtream/:user', iptvController.getXtreamAPI);

module.exports = router;