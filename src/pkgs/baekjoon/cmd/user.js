const { MessageEmbed } = require('discord.js')
const crawler = require('../engine/crawler')
const tier = require('../tier')
module.exports = (command, msg) => {
    if (command.length) {
        crawler.user(command).then((user)=>{
            const embed = new MessageEmbed()
            .setColor(tier.color[Math.floor((user.level - 1) / 5)])
            .setTitle(`**${user.user}**`)
            .setDescription(`**${user.tier}** ${user.emoji}`)
            .attachFiles([`pkgs/baekjoon/res/${user.class}.png`])
            .setThumbnail(`attachment://${user.class}.png`)
            .addField(`**총 경험치**`, `${user.xp}XP`)
            .addField(`**푼 문제**`, `${user.solved}문제`, true)
            .setURL(`https://solved.ac/${user.user}`)

            msg.channel.send(embed)
        })
        return true;
    }
    return false
}