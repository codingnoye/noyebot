const EventEmitter = require('events');
const { Message } = require('discord.js');
const Module = require('./Module');
class Package extends EventEmitter {
    /** @description 패키지
     * @param {Module|Object} module 메시지를 처리할 모듈
     * @param {String} name 패키지의 이름
     * @param {String} desc 패키지의 설명, 간단한 도움말.
     * @param {Function} help 도움말을 호출했을 때 동작하는 함수
     * @param {String[]} helpSimple 간단한 텍스트 도움말
     */
    constructor (module, name, desc, help, helpSimple) {
        super()
        if (!(module instanceof Module)) {
            if (module instanceof Function) module = new Module({}, module)
            else module = new Module(module)
        }
        this.module = module
        this.name = name
        this.desc = desc
        this.help = help
        this.helpSimple = helpSimple
    }
}
// pkg.on('message', (msg)=>{}) 같은 형태로 구현 (EventEmitter 상속)
// message(msg): 메시지 전달 이벤트
// load(guildId): 서버에 로드될 때 이벤트
// unload(guildId): 서버에서 언로드될 때 이벤트
module.exports = Package