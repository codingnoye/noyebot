const { Message } = require("discord.js")

class Timer {
    constructor() {
        this.runningTimer = {
            /**
             * time: Timeout
             * endAt: Date
             */
        }
    }

    /**
     * @param { Message } msg 
     */
    clear(msg) {
        const uid = msg.author.id
        if (this.runningTimer[uid]) {
            clearTimeout(this.runningTimer[uid].time)
            this.runningTimer[uid] = null
            msg.channel.send(`알람이 초기화됩니다.`)
        } else {
            msg.channel.send(`초기화할 알람이 없습니다.`)
        }
        return true
    }

    /**
     * @param { Message } msg 
     */
    set(cmd, msg) {
        if (cmd.length) {
            if (isNaN(cmd)) {
                msg.channel.send("제대로된 시간이 아닙니다.")
                return true
            } 
            const time = parseInt(cmd)

            const uid = msg.author.id
            if (this.runningTimer[uid]) {
                this.clear(msg)
                msg.channel.send(`${time}초로 업데이트 되었습니다.`)
            } else {
                msg.channel.send(`${time}초 뒤에 알람이 울립니다.`)
            }

            this.runningTimer[uid] = {
                time: setTimeout(() => {
                    msg.channel.send(`<@${uid}> 시간이 다 됐습니다.`)
                    this.runningTimer[uid] = null
                }, 1000 * time),
                endAt: new Date().getTime() + 1000 * time
            }
            return true
        }
        return false
    }

    /**
     * @param { Message } msg 
     */
    get(msg) {
        const uid = msg.author.id

        if (this.runningTimer[uid]) {
            const currentAt = new Date().getTime()
            const remain = parseInt((this.runningTimer[uid].endAt - currentAt)/1000)
            msg.channel.send(`${remain}초 남았습니다.`)
        } else {
            msg.channel.send(`설정된 알람이 없습니다.`)
        }
        return true
    }
}

module.exports = new Timer()