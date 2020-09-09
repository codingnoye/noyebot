const Package = require('../../libs/Package')
const Module = require('../../libs/Module')
const main = require('./main')

const package = new Package(
    new Module({'bj': main}),
    'baekjoon',
    '백준 알림 & 문제 정보',
    `**@bj prob <num>**: 백준 문제 정보` // @는 도움말 내보낼 때 prefix 처리
)

module.exports = package