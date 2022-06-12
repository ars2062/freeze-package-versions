import { program } from "commander";
import { dirname, resolve } from "path";
import { changePackageVersions, freezePackages } from "./freezer";
import { locatePackages, locateUnfreezedPackages } from "./locators";
import Logger from "./logger";
const config = require('../package.json')


program.name(config.name).version(config.version).description(config.description)

program.option('-p, --path <package.json...>', 'path to your package.json', 'package.json')
program.option('-l, --lock-path <lock file path>', 'path to your lock file', 'package-lock.json')
program.option('-n, --node_modules', 'ignore lock file and read versions from node_modules')
program.option('-m, --mono-repo', 'feeze all package.json files on mono repo')

program.parse();

export type TOptions = {
    path: string | string[],
    lockPath: string,
    node_modules: boolean,
    monoRepo: boolean
}

const options = program.opts<TOptions>()

Logger.info('Validating package.json files')
let jsonFiles = locatePackages(options);
(async () => {
    for (const jsonFile of jsonFiles) {
        try {
            Logger.info(`freezing ${jsonFile}`)
            const packages = locateUnfreezedPackages(jsonFile)
            Logger.info(`found ${packages.length} package(s) on ${jsonFile}`)
            const res = await freezePackages(packages, options, dirname(resolve(jsonFile)))
            changePackageVersions(res, jsonFile)
            Logger.success(`freezed all dependencies on ${jsonFile}`)
        } catch (e) {
            Logger.error(String(e))
        }
    }
})()

