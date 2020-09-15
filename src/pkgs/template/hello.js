const Router = require('../../libs/Router')
module.exports = new Router({
    world: (command, msg) => {
        msg.channel.send(`Hello, world!`)
        return true
    }
    // world 부분은 Router가 들어가야 하는 위치지만,
    // Function을 넣어도 new Router({}, Function) 형태로 변환되어 동작하도록 되어 있습니다.
}, (command, msg) => {
    // world가 아닌 다른 것이 입력되었을때 처리하는 부분
    msg.channel.send(`Hi, ${command}`)
    return true
})