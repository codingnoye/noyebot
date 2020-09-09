/**
 * @description prefix로 시작하는 문자열을 split해 반환. prefix로 시작하지 않으면 null
 * @param {String} content 
 * @param {String} prefix
 * @returns {String[]}
 */
const parse = (content, prefix) => {
    if (content.startsWith(prefix)) {
        return content.slice(prefix.length).split(' ')
    }
    return null
}
module.exports = parse