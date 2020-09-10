// 작동중인 bot들의 저장소
// {guildId: Bot}
// 어디서든 봇 객체에 접근할 수 있게 해주는 모듈
// 원하는 곳에서 require를 한 뒤, bots[guildId]같은 형태로 사용
// pkgs와 유사함
const bots = {}
module.exports = bots