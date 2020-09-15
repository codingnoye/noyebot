const Package = require('../../libs/Package')
const hello = require('./hello')

/*
const { MessageEmbed } = require('discord.js')
const help = (msg) => {
    const embed = new MessageEmbed()
    embed.addField('뭔가 상세한 도움말을', '만드려면 이런 형태를 이용하세요.')
    msg.channel.send({embed})
}
*/
const helpSimple = [
    '`@hello world` "Hello, world!"를 출력합니다.',
    '`@hello <message>` "Hi, <message>"를 출력합니다.'
]

const package = new Package(
    {'hello': hello},
    '템플릿',
    `템플릿 패키지의 설명입니다.`,
    helpSimple, // 상세한 도움말을 넣으려면 이 부분에 위의 help를 넣으면 됨.
    helpSimple
)

module.exports = package