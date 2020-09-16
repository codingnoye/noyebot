const bots = require('../../../libs/bots')
const { MessageEmbed } = require('discord.js')

const help = (command, msg) => {
    const gid = msg.guild.id
    const bot = bots[gid]
    if (command.length == 0) {
        const embed = new MessageEmbed()
            .setColor(0x428bca)
            .setTitle(`${process.env.botName} 도움말`)
        for (const pkg of bot.pkgs) {
            const helps = [`${pkg.desc}`]
            for (const help of pkg.helpSimple) {
                helps.push(help.replace('@', bot.setting.prefix))
            }
            embed.addField(`${pkg.name}`, helps.join('\n'))
        }
        msg.channel.send({embed})
    } else {
        if (command in bot.pkgMap) {
            const pkg = bot.pkgs[bot.pkgMap[command]]
            if (pkg.help instanceof Array) {
                const embed = new MessageEmbed()
                    .setColor(0x428bca)
                const helps = [`${pkg.desc}`]
                for (const help of pkg.help) {
                    helps.push(help.replace(/@/g, bot.setting.prefix))
                }
                embed.addField(`${pkg.name}`, helps.join('\n'))
                msg.channel.send({embed})
            } else {
                pkg.help(msg)
            }
        } else {
            msg.channel.send(`${command} 패키지를 찾을 수 없습니다.`)
        }
    }

    return true
}

module.exports = help