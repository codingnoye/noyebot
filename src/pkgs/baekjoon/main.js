const Module = require('../../libs/Module')
const prob = require('./prob')

const routes = {
    'prob': prob
}
const operate = (command, msg) => {
    return false
}

module.exports = new Module(routes, operate)