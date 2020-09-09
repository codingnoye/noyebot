const EventEmitter = require('events');
const Discord = require('discord.js')

const parse = require('./parse')
const Module = require('./Module')

const defaultPkg = require('../pkgs/default')

class Bot extends EventEmitter {
    constructor (guild, client, setting) {
        super()
        this.guild = guild
        this.setting = setting
        const { prefix } = setting

        this.prefix = prefix
        this.pkgs = []
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
        this.load(defaultPkg)
    }
    load (pkg) {
        this.pkgMap[pkg.name] = this.pkgs.length
        this.pkgs.push(pkg)
        pkg.emit('load', this.guild.id)
    }
    unload (pkg) {
        this.pkgs.splice(this.pkgMap[pkg.name])
        this.pkgMap[pkg.name] = undefined
        pkg.emit('unload', this.guild.id)
    }
}

module.exports = Bot