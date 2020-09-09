const Module = require('../../libs/Module')
const prob = require('./prob')
const routes = {
    'prob': prob
}
const operate = (command, msg) => {
    msg.channel.send(`${msg.content}를 이해할 수 없습니다.`)
}
const md = new Module(routes, operate)

module.exports = md