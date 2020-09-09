'use strict'
const Discord = require('discord.js');
require('dotenv').config()

const Module = require('./libs/Module')
const parse = require('./libs/parse');

const TOKEN = process.env.TOKEN
const client = new Discord.Client();

// for test
const baekjoon = require('./pkgs/baekjoon')
const mainRoutes = {
    'baekjoon': baekjoon
}
const mainOperate = (command, msg) => {
    
}
const main = new Module(mainRoutes, mainOperate)

client.on('message', msg => {
    if (msg.author.bot) return
    const parsed = parse(msg.content, '$')
    if (parsed) {
        main.call(parsed, msg)
    }
})

client.login(TOKEN)