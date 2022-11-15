import { exec } from "child_process";
import inquirer from "inquirer";
import { TOptions } from ".";
import Logger from "./logger";


export const installPackages = async (options: TOptions) => {
    const { confirm, tool } = await inquirer.prompt([{
        name: 'confirm',
        type: 'confirm',
        message: 'Would you like to reinstall your packages?'
    }, {
        name: 'tool',
        type: 'list',
        message: 'What do you use for installing packages?',
        choices: ['yarn', 'npm'],
    }])
    if (confirm) {
        Logger.info(`installing packges using "${tool}"`)
        exec(`${tool} install`, { cwd: process.cwd() }, (err, stdout, stderr) => {
            if (err) {
                Logger.error(String(err))
            }
            Logger.log(stdout, tool.toUpperCase(), 'gray')
        })
    }
}