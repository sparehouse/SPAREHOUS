// ngrok-api.js

const axios = require('axios');

async function getNgrokPublicUrl() {
  try {
    const response = await axios.get('http://127.0.0.1:4040/api/tunnels');
    const tunnels = response.data.tunnels;
    // Assuming you want the first HTTP tunnel
    const httpTunnel = tunnels.find(tunnel => tunnel.proto === 'http');
    if (httpTunnel) {
      const publicUrl = httpTunnel.public_url;
      console.log('Ngrok public URL:', publicUrl);
      return publicUrl;
    } else {
      console.log('No HTTP tunnel found.');
      return null;
    }
  } catch (error) {
    console.error('Error fetching Ngrok public URL:', error);
    return null;
  }
}

module.exports ={getNgrokPublicUrl};
