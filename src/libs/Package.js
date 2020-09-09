const EventEmitter = require('events');
const { Message } = require('discord.js');
class Package extends EventEmitter {
    /** @description 패키지
     * @param {Module} module 메시지를 처리할 모듈
     * @param {String} name 패키지의 이름
     * @param {String} desc 패키지의 설명
     * @param {Message} help 도움말을 호출했을때 전달할 메시지
     */
    constructor (module, name, desc, cmd, help) {
        super()
        this.module = module
        this.name = name
        this.desc = desc
        this.help = help
    }
}
// pkg.on('message', (msg)=>{}) 같은 형태로 구현 (EventEmitter 상속)
// message(msg): 메시지 전달 이벤트
// load(guildId): 서버에 로드될 때 이벤트
// unload(guildId): 서버에서 언로드될 때 이벤트
module.exports = Package