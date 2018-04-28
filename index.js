const keypress = require('keypress')
const isOk = (str) => /^y|yes|ok|true|好|是$/i.test(str)

/**
 * @description Give a hint and get an answer
 * @param {String} msg 
 * @returns 
 */
const prompt = (msg) => {
    return new Promise((resolve, reject) => {
        let input = process.stdin
        if (typeof msg === 'string') {
            process.stdout.write(msg + '\r\n')
        }
        input.setEncoding('utf8')
        input.on('data', val => {
            if (/\r\n?/.test(val)) {
                resolve(val.trim())
                input.pause()
            }
        })
        input.on('error', reject)
    })
}

/**
 * @description Confirm a message
 * @param {any} msg 
 * @returns 
 */
const confirm = async (msg) => {
    const userInput = await prompt(msg)
    return isOk(userInput)
}

/**
 * @description Multiple answers
 * @param {String} msgs
 * @returns 
 */
const mutil = (msgs) => {
    if (!Array.isArray(msgs) && msgs.every(msg => typeof msg === 'string')) {
        throw 'msgs should be a string array!!!'
    }
    if (!msgs.length) {
        return Promise.resolve({})
    }
    return new Promise((resolve, reject) => {
        let anwsers = []
        let hasAnwserIndex = 0
        let input = process.stdin
        input.setEncoding('utf8')
        process.stdout.write(msgs[hasAnwserIndex] + '\r\n')
        input.on('data', val => {
            if (/\r\n?/.test(val)) {
                anwsers.push({ [msgs[hasAnwserIndex]]: val.trim()})
                hasAnwserIndex++
                if (hasAnwserIndex < msgs.length) {
                    process.stdout.write(msgs[hasAnwserIndex] + '\r\n')
                    input.resume()
                } else {
                    resolve(anwsers)
                    input.pause()
                }
            }
        })
    })
}

/**
 * @description password enter
 * @param {String} msg 
 * @param {String} mask 
 * @returns 
 */
const password = (msg,mask)=>{
    return new Promise((resolve, reject) => {
        const input = process.stdin
        let password = ''
        if (typeof mask !== 'string') {
            throw 'mask should be a character'
        }
        if (typeof msg === 'string') {
            process.stdout.write(msg + '\r\n')
        }
        
        mask = mask[0] || '*'
        keypress(process.stdin)
        input.setRawMode(true)
        input.on('keypress',(c,key)=>{
            process.stdout.write(mask)
            if (key && key.ctrl && key.name === 'c') {
                process.exit()
            }
            password += c
            if(/\r\n?/.test(c)){
                resolve(password)
                input.pause()
            }
        })
    })
}
exports = module.exports = prompt
exports.confirm = confirm
exports.mutil = mutil
exports.password = password

