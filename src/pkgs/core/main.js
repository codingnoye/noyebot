const Module = require('../../libs/Module')
const help = require('./cmd/help')
const echo = require('./cmd/echo')
const say = require('./cmd/say')
const pkg = require('./cmd/pkg')

const routes = {
    'help': help,
    'echo': echo,
    'say': say,
    'pkg': pkg
}
const operate = (command, msg) => {
    return false
}

module.exports = new Module(routes, operate)