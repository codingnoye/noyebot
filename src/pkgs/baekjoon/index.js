const Package = require('../../libs/Package')
const Module = require('../../libs/Module')
const main = require('./main')

const help = (msg) => {

}
const helpSimple = [
    '그냥 백준풀면 알려주고 그런거 함'
]

const package = new Package(
    {'bj': main},
    '백준',
    '백준 알림 & 문제 정보',
    help,
    helpSimple
)

module.exports = package