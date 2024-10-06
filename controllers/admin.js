const db = require('../models/db');

// Listar usuarios
exports.getUsers = (req, res) => {
  const users = db.getUsers();
  res.json(users);
};

// Crear nuevo usuario
exports.createUser = (req, res) => {
  const { name, password, server } = req.body;
  const newUser = db.addUser({ name, password, server });
  res.status(201).json(newUser);
};

// Eliminar usuario
exports.deleteUser = (req, res) => {
  const userId = req.params.id;
  db.deleteUser(userId);
  res.status(204).send();
};

// Listar servidores remotos
exports.getServers = (req, res) => {
  const servers = db.getServers();
  res.json(servers);
};

// Añadir servidor remoto
exports.addServer = (req, res) => {
  const { url } = req.body;
  const newServer = db.addServer({ url });
  res.status(201).json(newServer);
};