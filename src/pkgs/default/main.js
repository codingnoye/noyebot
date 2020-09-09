const Module = require('../../libs/Module')
const help = require('./help')

const routes = {
    'help': help
}
const operate = (command, msg) => {
    return false
}

module.exports = new Module(routes, operate)