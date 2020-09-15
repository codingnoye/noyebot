// 서버의 설정을 가져오거나 저장하는 모듈

const fs = require('fs')
const base = '../data/'

// 서버가 존재하는지 확인
const guildExist = (gid) => {
    const guilds = fs.readdirSync(base+'guilds')
    return guilds.includes(gid+'.json')
}

// 서버의 정보를 가져오고 Object로 반환
const guildLoad = (gid) => {
    if (guildExist(gid)) {
        return JSON.parse(fs.readFileSync(base+'guilds/'+gid+'.json'))
    } else {
        return JSON.parse(fs.readFileSync(base+'guilds/default.json'))
    }
}

// 서버의 정보를 저장함
const guildSave = (gid, data) => {
    const str = JSON.stringify(data, null, 2)
    fs.writeFileSync(base+'guilds/'+gid+'.json', str)
}

// 패키지 정보 파일이 존재하는지 확인
const pkgExist = (pkgName) => {
    const pkgs = fs.readdirSync(base+'pkgs')
    return pkgs.includes(pkgName+'.json')
}

// 패키지의 정보를 가져오고 Object로 반환
const pkgLoad = (pkgName) => {
    return JSON.parse(fs.readFileSync(base+'pkgs/'+pkgName+'.json'))
}

// 서버의 정보를 저장함
const pkgSave = (pkgName, data) => {
    const str = JSON.stringify(data, null, 2)
    fs.writeFileSync(base+'pkgs/'+pkgName+'.json', str)
}

module.exports = {
    guild: {
        load: guildLoad,
        save: guildSave
    },
    pkg: {
        exist: pkgExist,
        load: pkgLoad,
        save: pkgSave
    }
}