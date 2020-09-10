const fs = require('fs')
const base = '../data/'

const guildExist = (gid) => {
    const guilds = fs.readdirSync(base+'guilds')
    return guilds.includes(gid)
}

const guildLoad = (gid) => {
    if (guildExist(gid)) {
        return JSON.parse(fs.readFileSync(base+'guilds/'+gid+'.json'))
    } else {
        return JSON.parse(fs.readFileSync(base+'guilds/default.json'))
    }
}

const guildSave = (gid, data) => {
    const str = JSON.stringify(data, null, 2)
    fs.writeFileSync(base+'guilds/'+gid+'.json', str)
}

module.exports = {
    guild: {
        load: guildLoad,
        save: guildSave
    }
}