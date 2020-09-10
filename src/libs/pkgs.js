// require한 패키지 객체들의 Object
// {pkgName: Package}
// 어디서든 패키지 객체에 접근하도록 해주는 모듈
// 원하는 곳에서 require를 한 뒤, pkgs[pkgName]같은 형태로 사용
// bots와 유사함
const pkgs = {}
module.exports = pkgs