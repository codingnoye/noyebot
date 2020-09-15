const Package = require('../../libs/Package')
const main = require("./main")

const helpSimple = [
    '`@timer set <num>` 주어진 시간 뒤에 울립니다.',
    '`@timer clear` 알람을 초기화합니다.'
]

const package = new Package(
    {'timer': main},
    '타이머',
    `타이머 모르는 사람 없쥬?`,
    helpSimple, // 상세한 도움말을 넣으려면 이 부분에 위의 help를 넣으면 됨.
    helpSimple
)

module.exports = package