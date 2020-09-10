module.exports = (command, msg) => {
    if (command.length != 0) msg.channel.send(command)
    else msg.channel.send('인자를 입력해 주세요.')
    return true
}