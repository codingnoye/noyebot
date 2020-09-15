const main = require('../engine/main')

module.exports = (command, msg) => {
    if (command.length) {
        main.initUser(command, msg.guild.id)
        msg.channel.send(`${command} 사용자가 등록되었습니다.`)
        return true;
    }
    return false
}