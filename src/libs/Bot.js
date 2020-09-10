const EventEmitter = require('events');

const parse = require('./parse')
const { Guild, Client } = require('discord.js');

class Bot extends EventEmitter {
    /** @description 서버당 하나인 봇 객체
     * @param {Guild} guild 서버
     * @param {Client} client Discord 클라이언트
     * @param {Object} setting 서버의 설정 (파일로부터 불러옴)
     */
    constructor (guild, client, setting) {
        super()
        this.guild = guild
        this.setting = setting
        const { prefix } = setting

        this.prefix = prefix
        // Package들이 적용된 순서로 들어있는 배열
        this.pkgs = []
        // 어떤 패키지가 this.pkgs에 몇번째로 들어있는지
        // {Package.name: index}
        // 따라서 이름으로 객체에 접근하려면 this.pkgs[this.pkgMap[pkgName]]
        // 이건 내부적으로만 쓸거라 살짝 지저분한데 나중에 고치자
        this.pkgMap = {}
        this.client = client

        this.on('message', (msg) => {
            // (자신 메시지 포함))봇의 메시지 무시
            if (msg.author.bot) return
            
            // 명령어 처리
            const parsed = parse(msg.content, prefix)
            let worked = false
            if (parsed) {
                for (const pkg of this.pkgs) {
                    worked = pkg.module.call(parsed, msg)
                    if (worked) break
                }
                if (!worked) {
                    msg.channel.send(`${msg.content}를 이해할 수 없습니다.`)
                }
            }

            // message 이벤트 전달
            for (const pkg of this.pkgs) {
                pkg.emit('message', msg)
            }
        })
    }
    load (pkg) {
        // 패키지 로드
        this.pkgMap[pkg.name] = this.pkgs.length
        this.pkgs.push(pkg)
        pkg.emit('load', this.guild.id)
    }
    unload (pkg) {
        // 패키지 언로드
        this.pkgs.splice(this.pkgMap[pkg.name], 1)
        this.pkgMap[pkg.name] = undefined
        pkg.emit('unload', this.guild.id)
    }
}

module.exports = Bot