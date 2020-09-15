const crawler = require('../engine/crawler')
const tier = require('../tier')
const {comma} = require('../../../libs/utils')
const { MessageEmbed } = require('discord.js')

module.exports = (command, msg) => {
    if (!isNaN(command)) {
        crawler.problem(command).then((problemData) => {
            const embed = new MessageEmbed()
                .setTitle(`**${problemData.title}** ${problemData.emoji}`)
                .setURL(`https://www.acmicpc.net/problem/${command}`)
                .setDescription(
                    `${comma(problemData.users)}명 (${problemData.users_percent})`,
                    true
                )
                .setColor(tier.color[Math.floor((problemData.level - 1) / 5)])
            msg.channel.send(embed)
        })
        return true;
    }
    return false
}