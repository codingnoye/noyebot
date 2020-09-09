class Module {
    /** @description 모듈
     * @param {Object[]} Routes '명령어': '모듈'로 구성된 하위 모듈들
     * @param {function} Operate 하위 모듈로 전달되지 않고 호출되었을 때 실행될 함수
     */
    constructor (routes, operate = (command, msg) => {return false}) {
        this.routes = routes
        this.operate = operate
    }
    /** @description 모듈 호출
     * @param {String[]} command 공백으로 구분된 명령어 단어 목록
     * @param {Message} msg 원본 msg 객체
     */
    call (command, msg) {
        const keyword = command[0]
        if (keyword in this.routes) {
            return this.routes[keyword].call(command.slice(1), msg)
        } else {
            const params = command.join(' ')
            return this.operate(params, msg)
        }
    }
}

module.exports = Module