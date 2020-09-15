const Router = require('../../libs/Router')
const add = require('./cmd/add')
const init = require('./cmd/init')
const prob = require('./cmd/prob')
const user = require('./cmd/user')
const users = require('./cmd/users')

const routes = {
    prob: prob,
    add: add,
    init: init,
    user: user,
    users: users
}
const operate = prob

module.exports = new Router(routes, operate)