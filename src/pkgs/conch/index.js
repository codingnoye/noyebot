const Package = require('../../libs/Package')

const magic = (command, msg) => {
    msg.channel.send('마법의 소라고동: 안녕!')
    return true
}

const helpSimple = [
    '`@magic` <question> 마법의 소라고동님께 질문을 합니다.',
    '`마법의 소라고동님` <question> 마법의 소라고동님께 질문을 합니다.'
]

const package = new Package(
    {'magic': magic},
    '마법의 소라고동',
    `마법의 소라고동님은 모든 것을 알고 계십니다.`,
    helpSimple,
    helpSimple
)

package.on('message', (msg) => {
    if (msg.content.startsWith('마법의 소라고동님 ')) {
        magic('', msg)
    }
})

module.exports = package