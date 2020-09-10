const pkgs = {}

const package_modules = [
    require('../pkgs/core'),
    require('../pkgs/baekjoon'),
    require('../pkgs/conch')
]

for (const pkg of package_modules) {
    pkgs[pkg.name] = pkg
}
module.exports = pkgs