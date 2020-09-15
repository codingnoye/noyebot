const { MessageEmbed } = require('discord.js')
const crawler = require('../engine/crawler')
const main = require('../engine/main')
module.exports = (command, msg) => {
    (async () => {
        const gid = msg.guild.id
        if (gid in main.setting.guilds) {
            const embed = new MessageEmbed()
                .setColor(0x428bca)
                .setTitle('백준 사용자 목록')
                .setDescription('알림을 받는 사용자들의 목록입니다.')
            const rawUsers = []
            for (const username of main.setting.guilds[gid].users) {
                const userdata = await crawler.user(username)
                rawUsers.push([username, userdata])
            }
            const users = rawUsers.sort((a, b) => b[1].rawXp - a[1].rawXp)
            for (const user of users) {
                const username = user[0]
                const userdata = user[1]
                embed.addField(
                    `${userdata.solved} 문제 (${userdata.xp} xp)`,
                    `**${userdata.tier}** ${userdata.emoji}\n**${username}**`
                )
            }
            msg.channel.send({embed})
        } else {
            msg.channel.send('init을 먼저 해야 유저 목록을 볼 수 있습니다.')
        }
    }) ()
    return true
}