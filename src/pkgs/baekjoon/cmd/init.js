const main = require('../engine/main')

module.exports = (command, msg) => {
    if (command.length) {
        main.initSchool(command, msg.guild.id, msg.channel.id)
    } else {
        main.initSchool(-1, msg.guild.id, msg.channel.id)
    }
    return true
}