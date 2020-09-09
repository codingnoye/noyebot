const parse = (content, callsign) => {
    if (content.startsWith(callsign)) {
        return content.slice(callsign.length).split(' ')
    }
    return null
}
module.exports = parse