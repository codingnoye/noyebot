const Module = require('../../libs/Module')
const routes = {

}
const operate = (command, msg) => {
    if (!isNaN(command)) msg.channel.send(`${command}번 문제`)
    else msg.channel.send(`${msg.content}를 이해할 수 없습니다.`)
}
const md = new Module(routes, operate)

module.exports = md