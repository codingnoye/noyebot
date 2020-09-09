'use strict'
require('dotenv').config()

const Discord = require('discord.js')
const client = new Discord.Client()
const TOKEN = process.env.TOKEN
const Bot = require('./libs/Bot')

const bots = {}

client.on('message', (msg) => {
    const gid = msg.guild.id
    if (!(gid in bots)) {
        // 서버 정보 불러오기
        // 패키지 로드하기
        console.log(`${msg.guild.name} 서버 로드됨`)
        bots[gid] = new Bot(msg.guild, client, {prefix: '!'})
    }
    const bot = bots[gid]
    bot.emit('message', msg)
})
client.login(TOKEN)