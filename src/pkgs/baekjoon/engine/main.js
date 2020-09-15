const crawler = require('./crawler.js')
const {MessageEmbed} = require('discord.js')
const tier = require('../tier')
const data = require('../../../libs/data')

const defaultSetting = {
    schools: {},
    guilds: {},
    userLevels: {}
}
// schools: {
//     schoolId: lastChecked
// }
// guilds: {
//     guildId: {
//          users: [],
//          channel: 알림 받을 채널
//     }
// }
// userLevels: {
//     username: userLevel
// }
if (!data.pkg.exist('백준')) data.pkg.save('백준', defaultSetting)

const setting = data.pkg.load('백준')

const daemon = {
    problem: async (schoolId) => {
        const lastChecked = setting.schools[schoolId]
        const solutions = await crawler.school(schoolId)

        if (lastChecked === -1) {
            for (const solution of solutions) {
                setting.schools[schoolId] = lastChecked >= solution.id ? lastChecked : solution.id
            }
            return
        }
        // 문제 알림
        for (const solution of solutions.filter((solution) => solution.id > lastChecked)) {
            setting.schools[schoolId] = lastChecked >= solution.id ? lastChecked : solution.id
            const {user, problem, name} = solution
            const problemData = await crawler.problem(problem)
            const embed = new MessageEmbed()
                .setTitle(`**${user}**님이 ${problem}번 문제를 풀었습니다!`)
                .setDescription(`${problem}번 문제 : ${name}`)
                .addField('나도 풀러 가기', `https://www.acmicpc.net/problem/${problem}`)
                .addField('Solved.ac', '**' + problemData.tier + '**')
            embed
                .attachFiles([`pkgs/baekjoon/res/${problemData.level}.png`])
                .setThumbnail(`attachment://${problemData.level}.png`)
                .setColor(tier.color[Math.floor((problemData.level - 1) / 5)])
            for (guildId in setting.guilds) {
                const guild = setting.guilds[guildId]
                if (guild.users.includes(user)) {
                    client.channels.fetch(guild.channel).then((channel)=>{
                        channel.send({embed})
                    })
                }
            }
        }
        data.pkg.save('백준', setting)
    },
    // 레벨업 체커
    levelup: async () => {
        for (userId in setting.userLevels) {
            const userLevel = setting.userLevels[userId]
            const user = await crawler.user(userId)
            if (userLevel == -1) {
                setting.userLevels[userId] = user.level
                continue
            }
            if (user.level > userLevel) {
                const embed = new MessageEmbed()
                    .setTitle(`**${user.name}**님의 승급을 축하해주세요!`)
                    .setColor(tier.color[Math.floor((user.level - 1) / 5)])
                    .setDescription(`**${user.name}**님이 **${user.tier}**으로 승급하셨습니다.`)
                    .attachFiles([`pkgs/baekjoon/res/${user.level}.png`])
                    .setThumbnail(`attachment://${user.level}.png`)
                for (guildId in setting.guilds) {
                    const guild = setting.guilds[guildId]
                    if (guild.users.includes(user.name)) {
                        client.channels.fetch(guild.channel).then((channel)=>{
                            channel.send({embed})
                        })
                    }
                }
                setting.userLevels[user.name] = user.level
            }
        }
        data.pkg.save('백준', setting)
    },
}

const queue = []
const init = () => {
    for (schoolId in setting.schools) queue.push(schoolId)
    setInterval(() => {
        if (queue.length) {
            const school = queue.shift()
            daemon.problem(school)
            queue.push(school)
        }
    }, 15000)
    setInterval(daemon.levelup, 10000)
}
init()
module.exports = {
    initSchool: (schoolId, guildId, channel) => {
        if (!(schoolId in setting.schools) && schoolId != -1) {
            setting.schools[schoolId] = -1
            if (guildId in setting.guilds) {
                setting.guilds[guildId].channel = channel
            } else {
                setting.guilds[guildId] = {
                    users: [],
                    channel: channel
                }
            }
            client.channels.fetch(channel).then((channel)=>{
                channel.send(`단체를 크롤링 리스트에 등록하였고 이 채널을 알림 채널로 설정했습니다.`)
            })
        } else {
            if (guildId in setting.guilds) {
                setting.guilds[guildId].channel = channel
            } else {
                setting.guilds[guildId] = {
                    users: [],
                    channel: channel
                }
            }
            client.channels.fetch(channel).then((channel)=>{
                channel.send(`이 채널을 알림 채널로 설정했습니다.`)
            })
        }
        if (schoolId != -1) queue.push(schoolId)

        data.pkg.save('백준', setting)
    },
    initUser: (user, guildId) => {
        if (!setting.guilds[guildId].users.includes(user)) {
            setting.userLevels[user] = -1
            setting.guilds[guildId].users.push(user)
            
            data.pkg.save('백준', setting)
        }
    },
    setting: setting
}
