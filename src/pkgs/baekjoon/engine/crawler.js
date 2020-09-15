const axios = require('axios').default
const cheerio = require('cheerio')
const tier = require('../tier')
const {comma} = require('../../../libs/utils')

const makeClass = (num, decoration) => {
    let decoTable = ['', 's', 'g']

    return `c${num}${decoTable[decoration]}`
}

module.exports = {
    problem: async (problem) => {
        const data = (await axios.get(`https://api.solved.ac/problem_level.php?id=${problem}`)).data
        const bjdata = (await axios.get(`https://www.acmicpc.net/problem/${problem}`)).data
        const $ = cheerio.load(bjdata)
        const emoji = client.emojis.cache.find(
            (emoji) =>
                emoji.name ===
                (data.level == 0
                    ? 'unranked'
                    : tier.prefix[Math.floor((data.level - 1) / 5)].toLowerCase() +
                      (5 - ((data.level - 1) % 5)))
        )
        return {
            num: problem,
            tier:
                data.level == 0
                    ? 'Unranked'
                    : tier.prefix[Math.floor((data.level - 1) / 5)] + ' ' + tier.number[(data.level - 1) % 5],
            level: data.level,
            emoji: emoji ? emoji : '',
            title: $('title').text(),
            users: $('#problem-info td:nth-child(4)').text(),
            users_percent: $('#problem-info td:nth-child(6)').text()
        }
    },
    school: async (schoolId) => {
        const data = (await axios.get(`https://www.acmicpc.net/status?result_id=4&school_id=${schoolId}`)).data
        const $ = cheerio.load(data)
        const solutions = []
        $('tr').each((index, item) => {
            if (index == 0) return
            const solutionId = parseInt($(item).find('td:nth-child(1)').text())
            const user = $(item).find('td:nth-child(2)').text()
            const problem = parseInt($(item).find('td:nth-child(3)').text())
            const name = $(item).find('td:nth-child(3) .problem_title').attr('title')
            const solution = {id: solutionId, user: user, problem: problem, name: name}
            solutions.push(solution)
        })
        return solutions
    },
    user: async (user) => {
        const data = (await axios.get(`https://api.solved.ac/user_information.php?id=${user}`)).data
        const emoji = client.emojis.cache.find(
            (emoji) =>
                emoji.name ===
                (data.level == 0
                    ? 'unranked'
                    : tier.prefix[Math.floor((data.level - 1) / 5)].toLowerCase() +
                      (5 - ((data.level - 1) % 5)))
        )
        return {
            user: data.user_id,
            name: data.user_id,
            tier:
                data.level == 0
                    ? 'Unranked'
                    : tier.prefix[Math.floor((data.level - 1) / 5)] + ' ' + tier.number[(data.level - 1) % 5],
            level: data.level,
            rawXp: data.exp,
            xp: comma(data.exp),
            solved: data.solved,
            class: makeClass(data.class, data.class_decoration),
            emoji: emoji ? emoji : '',
        }
    }
}
