'use strict'
require('dotenv').config()

const Discord = require('discord.js')
const client = new Discord.Client()
const TOKEN = process.env.TOKEN
const Bot = require('./libs/Bot')
const bots = require('./libs/bots')
const data = require('./libs/data')

const pkgs = require('./libs/pkgs')

const pkg_modules = [
    //require('./pkgs/template'),
    require('./pkgs/core'),
    require('./pkgs/baekjoon'),
    require('./pkgs/conch'),
    require('./pkgs/timer')
]

for (const pkg of pkg_modules) {
    pkgs[pkg.name] = pkg
}

client.on('message', (msg) => {
    const gid = msg.guild.id
    if (!(gid in bots)) {
        console.log(`${msg.guild.name} 서버 로드 시작`)
        // 세팅 불러오기
        const setting = data.guild.load(gid)
        bots[gid] = new Bot(msg.guild, client, setting)
        // 활성화되어있던 패키지 로드
        for (const pkgName of setting.pkgs) {
            console.log(`${pkgName} 패키지 로드`)
            bots[gid].load(pkgs[pkgName])
        }
        console.log(`${msg.guild.name} 서버 로드 완료`)
    }
    const bot = bots[gid]
    bot.emit('message', msg)
})
client.once('ready', () => {
    console.log('서버 시작')
    client.user.setPresence({ activity: { name: `${data.guild.load('default').prefix}help | ${client.guilds.cache.array().length}개의 서버에서 노동` }, status: 'online' })
})
global.client = client
client.login(TOKEN)