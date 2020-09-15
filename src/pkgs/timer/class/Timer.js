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
        const ID = msg.author.id
        if (this.runningTimer[ID]) {
            clearTimeout(this.runningTimer[ID].time)
            this.runningTimer[ID] = null
            msg.channel.send(`<@${ID}> 알람이 초기화됩니다.`)
        } else {
            msg.channel.send(`<@${ID}> 초기화할 알람이 없습니다.`)
        }
        return true
    }

    /**
     * @param { Message } msg 
     */
    set(cmd, msg) {
        if (cmd.length) {
            let time;
            try {
                time = eval(cmd)
            } catch {
                msg.channel.send("제대로된 시간이 아닙니다.")
                return true
            }

            
            const ID = msg.author.id
            if (this.runningTimer[ID]) {
                this.clear(msg)
                msg.channel.send(`<@${ID}> ${time}초로 업데이트 되었습니다.`)
            } else {
                msg.channel.send(`<@${ID}> ${time}초 뒤에 알람이 울립니다.`)
            }

            this.runningTimer[ID] = {
                time: setTimeout(() => {
                    msg.channel.send(`<@${ID}> 시간이 다됬습니다.`)
                    this.runningTimer[ID] = null
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
        const ID = msg.author.id

        if (this.runningTimer[ID]) {
            const currentAt = new Date().getTime()
            let remain = this.runningTimer[ID].endAt - currentAt
            remain /= 1000
            remain = parseInt(remain)
            msg.channel.send(`<@${ID}> ${remain}초 남았습니다.`)
        } else {
            msg.channel.send(`<@${ID}> 설정된 알람이 없습니다.`)
        }
        return true
    }
}

module.exports = new Timer()