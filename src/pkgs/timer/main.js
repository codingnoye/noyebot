const Router = require('../../libs/Router')

const routes = {
    set: require("./cmd/set"),
    clear: require("./cmd/clear"),
    get: require("./cmd/get")
}
const operate = (cmd, msg) => {
    return false
}

module.exports = new Router(routes, operate)