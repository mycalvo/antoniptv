const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database(':memory:');

// Inicializar base de datos
db.serialize(() => {
  db.run("CREATE TABLE users (id INT, name TEXT, password TEXT, server TEXT)");
  db.run("CREATE TABLE servers (id INT, url TEXT, status TEXT)");
});

exports.getUser = (username) => {
  return new Promise((resolve, reject) => {
    db.get("SELECT * FROM users WHERE name = ?", [username], (err, row) => {
      if (err) reject(err);
      resolve(row);
    });
  });
};

exports.getUsers = () => {
  return new Promise((resolve, reject) => {
    db.all("SELECT * FROM users", [], (err, rows) => {
      if (err) reject(err);
      resolve(rows);
    });
  });
};

exports.addUser = (user) => {
  db.run("INSERT INTO users (name, password, server) VALUES (?, ?, ?)", [user.name, user.password, user.server]);
};

exports.deleteUser = (userId) => {
  db.run("DELETE FROM users WHERE id = ?", [userId]);
};

exports.getServers = () => {
  return new Promise((resolve, reject) => {
    db.all("SELECT * FROM servers", [], (err, rows) => {
      if (err) reject(err);
      resolve(rows);
    });
  });
};

exports.addServer = (server) => {
  db.run("INSERT INTO servers (url, status) VALUES (?, 'active')", [server.url]);
};

exports.getAlternateServer = () => {
  return new Promise((resolve, reject) => {
    db.get("SELECT * FROM servers WHERE status = 'active'", [], (err, row) => {
      if (err) reject(err);
      resolve(row);
    });
  });
};