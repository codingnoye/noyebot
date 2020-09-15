const Router = require('../../../libs/Router')
const bots = require('../../../libs/bots')
const pkgs = require('../../../libs/pkgs')
const { MessageEmbed } = require('discord.js')
const data = require('../../../libs/data')

const routes = {
    enable: (command, msg) => {
        const bot = bots[msg.guild.id]
        if (command in bot.pkgMap) {
            msg.channel.send('이미 활성화된 패키지입니다.')
        } else {
            if (command in pkgs) {
                const pkg = pkgs[command]
                bot.setting.pkgs.push(pkg.name)
                bot.load(pkg)
                msg.channel.send(`${pkg.name} 패키지가 활성화 되었습니다.`)
                data.guild.save(msg.guild.id, bot.setting)
            } else {
                msg.channel.send(`${pkgs.name} 패키지를 찾을 수 없습니다.`)
            }
        }
        return true
    },
    disable: (command, msg) => {
        const bot = bots[msg.guild.id]
        if (command in bot.pkgMap) {
            bot.setting.pkgs.splice(this.pkgMap[pkg.name], 1)
            msg.channel.send(`${bot.pkgs[bot.pkgMap[command]].name} 패키지가 비활성화 되었습니다.`)
            bot.unload(bot.pkgs[bot.pkgMap[command]])
            data.guild.save(msg.guild.id, bot.setting)
        } else {
            msg.channel.send('활성화되지 않았거나 존재하지 않는 패키지입니다.')
        }
        return true
    }
}

const operate = (command, msg) => {
    const bot = bots[msg.guild.id]
    const embed = new MessageEmbed()
        .setTitle(`패키지 목록`)
        .setColor(0x428bca)
        .setDescription(`${process.env.botName}에 적용 가능한 패키지 목록입니다.`)

    for (const pkgName of bot.setting.pkgs) {
        const pkg = pkgs[pkgName]
        embed.addField(
            `**[${pkg.name}]** - 적용됨`,
            `${pkg.desc}`
        )
    }

    for (const pkgName in pkgs) {
        const pkg = pkgs[pkgName]
        if (!(bot.setting.pkgs.includes(pkg.name))) {
            embed.addField(
                `**[${pkg.name}]**`,
                `${pkg.desc}`
            )
        }
    }

    embed.addField(
        `패키지 관리`,
        `패키지는 추가한 순서대로 작동합니다.\n\`${bot.setting.prefix}pkg enable <패키지이름>\`으로 활성화할 수 있습니다.\n\`${bot.setting.prefix}pkg disable <패키지이름>\`으로 비활성화할 수 있습니다.\n\`${bot.setting.prefix}pkg reset\`으로 기본 패키지 상태로 되돌릴 수 있습니다.\n\`${bot.setting.prefix}help <패키지명>\`으로 패키지 도움말을 볼 수 있습니다.`
    )

    msg.channel.send({embed})
    return true
}

module.exports = new Router(routes, operate)