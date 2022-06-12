import { TOptions } from ".";
import { existsSync, readFileSync, readdirSync } from "fs";
import Logger from "./logger";
import { GlobSync } from "glob";

export const locatePackages = (options: TOptions): string[] => {
    if (options.monoRepo) return new GlobSync('./**/package.json', { ignore: './**/node_modules/**/*' }).found
    console.log(options.path);
    if (Array.isArray(options.path))
        return options.path.filter((file) => {
            const res = existsSync(file)
            if (!res) throw `"${file}" does not exist`
            return res
        })
    else {
        if (!existsSync(options.path)) throw `"${options.path}" does not exist`
        return [options.path]
    }
}

export type TPackage = {
    name: string,
    path: 'devDependencies' | 'dependencies'
    version: string
}

export const locateUnfreezedPackages = (jsonFile: string): TPackage[] => {
    if (!/\.json$/.test(jsonFile)) throw `${jsonFile} is not a json file`;
    Logger.info(`locating unfreezed packages in ${jsonFile}`)
    const json: {
        devDependencies: Record<string, string>,
        dependencies: Record<string, string>
    } = JSON.parse(readFileSync(jsonFile, { encoding: 'utf8', flag: 'r' }))
    Logger.info(`reading dependencies in ${jsonFile}`)
    const res: TPackage[] = []
    if (!json.dependencies && !json.devDependencies) throw `${jsonFile} is not a package.json or there is no dependency in it`
    if (json.dependencies) {
        Object.entries(json.dependencies).forEach(([name, version]) => {
            if (/^\^/.test(version)) res.push({ name, version, path: 'dependencies' })
        })
    } else Logger.warning(`no dependencies on ${jsonFile}`)
    if (json.devDependencies) {
        Object.entries(json.devDependencies).forEach(([name, version]) => {
            if (/^\^/.test(version)) res.push({ name, version, path: 'devDependencies' })
        })
    } else Logger.warning(`no devDependencies on ${jsonFile}`)
    return res
}


export const locateLockFiles = (packageDirPath: string): string[] => {
    return [`${packageDirPath}/package-lock.json`, `${packageDirPath}/yarn.lock`].filter(existsSync)
}