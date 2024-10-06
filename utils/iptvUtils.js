const fetch = require('node-fetch');

// Verificar el estado de un servidor remoto
exports.fetchRemoteServerStatus = async (serverUrl) => {
  try {
    const response = await fetch(serverUrl);
    if (response.ok) {
      return { isActive: true };
    } else {
      return { isActive: false };
    }
  } catch (error) {
    console.error('Error fetching remote server status:', error);
    return { isActive: false };
  }
};

// Obtener una lista M3U desde un servidor remoto
exports.fetchM3UList = async (serverUrl) => {
  try {
    const response = await fetch(serverUrl);
    if (response.ok) {
      return await response.text();
    } else {
      return 'Error fetching M3U list';
    }
  } catch (error) {
    console.error('Error fetching M3U list:', error);
    return 'Error fetching M3U list';
  }
};