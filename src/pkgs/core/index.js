const Package = require('../../libs/Package')
const main = require('./main')
const { MessageEmbed } = require('discord.js')

/*
const help = (msg) => {
    const embed = new MessageEmbed()
    embed.addField('뭔가 상세한 도움말이', '나오겠지?')
    msg.channel.send({embed})
}
*/
const helpSimple = [
    '`@help` 도움말을 봅니다.',
    '`@echo <message>` message를 따라 말합니다.',
    '`@say <message>` message를 대신 말합니다.',
    '`@pkg` 패키지 목록을 봅니다.',
    '`@prefix <prefix>` 호출 접두사를 변경합니다.'
]

const package = new Package(
    main,
    '기본',
    `${process.env.botName}의 기본 패키지입니다.`,
    helpSimple,
    helpSimple
)

module.exports = package