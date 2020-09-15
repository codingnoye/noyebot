const EventEmitter = require('events');
const Router = require('./Router');
class Package extends EventEmitter {
    /** @description 패키지
     * @param {Router|Object} router 메시지를 처리할 라우터
     * @param {String} name 패키지의 이름
     * @param {String} desc 패키지의 설명, 간단한 도움말.
     * @param {Function|String[]} help 도움말을 호출했을 때 동작하는 함수 또는 helpSimple
     * @param {String[]} helpSimple 인라인 도움말
     */
    constructor (router, name, desc, help, helpSimple) {
        super()
        if (!(router instanceof Router)) {
            if (router instanceof Function) router = new Router({}, router)
            else router = new Router(router)
        }
        this.router = router
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