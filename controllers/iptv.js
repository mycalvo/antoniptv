const db = require('../models/db');
const { fetchRemoteServerStatus, fetchM3UList } = require('../utils/iptvUtils');

// Generar lista M3U para el usuario
exports.getPlaylist = async (req, res) => {
  const user = req.params.user;
  const userData = db.getUser(user);

  if (!userData) {
    return res.status(404).send('User not found');
  }

  const server = await fetchRemoteServerStatus(userData.server);
  
  if (!server.isActive) {
    // Si el servidor falla, busca uno alternativo
    const alternateServer = db.getAlternateServer();
    return res.status(200).send(await fetchM3UList(alternateServer.url));
  }

  const playlist = await fetchM3UList(server.url);
  res.status(200).send(playlist);
};

// API Xtream
exports.getXtreamAPI = async (req, res) => {
  const user = req.params.user;
  const userData = db.getUser(user);

  if (!userData) {
    return res.status(404).send('User not found');
  }

  // Generar respuesta tipo Xtream
  res.json({
    user: userData.name,
    playlist: await fetchM3UList(userData.server),
  });
};