const Module = require('../../libs/Module')
const routes = {

}
const operate = (command, msg) => {
    if (!isNaN(command)) {
        msg.channel.send(`${command}번 문제`)
        return true
    }
    return false
}

module.exports = new Module(routes, operate)