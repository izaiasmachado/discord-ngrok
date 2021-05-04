const { CronJob } = require('cron')
const generateIp = require('./services/ip')
const { RESET_MINUTE, RESET_HOUR } = process.env

const run = async () => {
    await generateIp()
    const tunnel = new CronJob(`${RESET_MINUTE} ${RESET_HOUR} * * *`, generateIp, null, true, 'Europe/London')
    tunnel.start()
}

run()
