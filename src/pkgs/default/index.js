const Package = require('../../libs/Package')
const Module = require('../../libs/Module')
const main = require('./main')

const package = new Package(
    main,
    '기본',
    '기본 기능들입니다.',
    `**@help**: 도움말`
)

module.exports = package