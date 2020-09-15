const Router = require('../../libs/Router')
const help = require('./cmd/help')
const echo = require('./cmd/echo')
const say = require('./cmd/say')
const pkg = require('./cmd/pkg')
const prefix = require('./cmd/prefix')

const routes = {
    'help': help,
    'echo': echo,
    'say': say,
    'pkg': pkg,
    'prefix': prefix
}
const operate = (command, msg) => {
    return false
}

module.exports = new Router(routes, operate)