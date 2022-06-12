import chalk, { ForegroundColor, BackgroundColor } from "chalk"


export default class Logger {
    static prepend = '[#] => '
    static log(msg: string, title: string, color: ForegroundColor) {
        const { log } = console
        const bgColor = `bg${color[0].toUpperCase()}${color.slice(1)}` as BackgroundColor
        log(chalk[color](this.prepend), chalk[bgColor](title), msg)
    }
    static info(msg: string, title?: string) {
        this.log(msg, title || 'INFO', 'blueBright')
    }
    static success(msg: string, title?: string) {
        this.log(msg, title || 'SUCCESS', 'greenBright')
    }
    static error(msg: string, title?: string) {
        this.log(msg, title || 'ERROR', 'redBright')
    }
    static warning(msg: string, title?: string) {
        this.log(msg, title || 'WARNING', 'yellowBright')
    }
}