const bots = require('../../../libs/bots')
const data = require('../../../libs/data')
module.exports = (command, msg) => {
    const gid = msg.guild.id
    if (command.length === 1) {
        bots[gid].setting.prefix = command
        bots[gid].prefix = command
        data.guild.save(gid, bots[gid].setting)
        msg.channel.send(`접두사가 ${command}로 변경되었습니다.`)
    } else {
        msg.channel.send('접두사는 1글자 문자여야 합니다.')
    }
    return true
}