const ngrok = require("ngrok");
const axios = require("axios");

const { NGROK_PORT, NGROK_AUTH, NGROK_AUTH_TOKEN, NGROK_REGION } = process.env;

async function connect() {
  await ngrok.connect({
    proto: NGROK_PROTOCOL,
    addr: Number(NGROK_PORT),
    auth: NGROK_AUTH,
    authtoken: NGROK_AUTH_TOKEN,
    region: NGROK_REGION,
  });

  return await getIp();
}

function kill() {
  return ngrok.kill();
}

async function getIp() {
  const apiUrl = ngrok.getUrl();
  const response = await axios.get(`${apiUrl}/api/tunnels`);
  const tunnelIp = response.data.tunnels[0].public_url;
  return tunnelIp.slice(6);
}

module.exports = { connect, kill, getIp };
