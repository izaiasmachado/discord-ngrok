const ngrok = require('../utils/ngrok')
const { Webhook } = require('discord-webhook-node')
const { WEBHOOK_URL } = process.env
const hook = new Webhook(WEBHOOK_URL)

module.exports = async () => {
    await ngrok.kill()
    const ip = await ngrok.connect()
    return await hook.send(`New ip generated **${ip}**`)    
}