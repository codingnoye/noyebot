const Module = require('../../libs/Module')
const routes = {

}
const operate = (command, msg) => {
    msg.channel.send('난 도움말이다')
    return true
}

module.exports = new Module(routes, operate)