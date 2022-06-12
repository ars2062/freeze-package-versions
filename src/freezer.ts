import { existsSync, readFileSync, writeFileSync } from "fs";
import inquirer from "inquirer";
import { TOptions } from ".";
import { locateLockFiles, TPackage } from "./locators";
import Logger from "./logger";

export type TFreezedPackage = TPackage & {
    freezeVersion: string
}

export const freezePackages = async (deps: TPackage[], options: TOptions, packageDirPath: string) => {
    let inputPath: string;
    if (options.node_modules) {
        inputPath = `${packageDirPath}/node_modules`
    } else {
        const lockFiles = locateLockFiles(packageDirPath)
        if (!lockFiles.length) Logger.warning(`no lock file found in ${packageDirPath}`)
        else {
            if (lockFiles.length > 1) {
                const { lockfile } = await inquirer.prompt([{ name: 'lockfile', type: 'list', message: 'which one of these lock files do you want to use?', choices: lockFiles }])
                inputPath = lockfile
            } else {
                inputPath = lockFiles[0]
            }
        }
    }
    return deps.map((dep) => freezePackage(dep, options, inputPath))
}

const cache: Record<string, string> = {}

export const freezePackage = (dep: TPackage, options: TOptions, inputPath: string): TFreezedPackage => {
    let freezeVersion = ''
    if (options.node_modules) {
        if (!existsSync(inputPath)) throw `can't locate node_models directory for ${inputPath.replace('node_modules', 'package.json')}`
        const packagePath = `${inputPath}/${dep.name}`
        if (!existsSync(packagePath)) Logger.warning(`can't locate ${dep.name} in ${inputPath}`)
        else {
            const depPackageFilePath = `${packagePath}/package.json`
            if (!existsSync(depPackageFilePath)) Logger.warning(`can't locate ${depPackageFilePath} for ${dep.name}`)
            else
                freezeVersion = JSON.parse(readFileSync(depPackageFilePath, { encoding: 'utf-8' })).version
        }
    } else {
        if (!cache[inputPath])
            cache[inputPath] = readFileSync(inputPath, { encoding: 'utf-8' }).toString()
        const lockContent = cache[inputPath] as string
        if (inputPath.includes('yarn.lock')) {
            freezeVersion = freezeYarnPackage(dep, lockContent, inputPath)
        } else {
            freezeVersion = freezeNpmPackage(dep, lockContent, inputPath)
        }
    }
    if (freezeVersion) Logger.info(`"${dep.name}": ${dep.version} -> ${freezeVersion}`)
    return { ...dep, freezeVersion }
}

const escape = (word: string) => word.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')

export const freezeYarnPackage = (dep: TPackage, lockContent: string, inputPath: string): string => {
    const { name, version } = dep
    const reg = new RegExp(String.raw`${escape(name)}@${escape(version)}.*:\n\s+version "(.*)"`, 'mg')
    const res = reg.exec(lockContent) || {} as RegExpExecArray
    if (!res[1]) {
        Logger.warning(`no match found for "${dep.name}@${dep.version}" in ${inputPath}`)
        return version
    } else {
        return res[1]
    }
}

export const freezeNpmPackage = (dep: TPackage, lockContent: string, inputPath: string): string => {
    const { name, version } = dep
    const lock = JSON.parse(lockContent);
    if (!lock.dependencies[name]) {
        Logger.warning(`no match found for "${name}@${version}" in ${inputPath}`)
        return version
    } else {
        return lock.dependencies[name].version
    }
}

export const changePackageVersions = (deps: TFreezedPackage[], jsonFile: string) => {
    const packakgeJson = JSON.parse(readFileSync(jsonFile, { encoding: 'utf-8' }))
    for (let i = 0; i < deps.length; i++) {
        const { freezeVersion, name, path } = deps[i];
        packakgeJson[path][name] = freezeVersion
    }
    writeFileSync(jsonFile, JSON.stringify(packakgeJson, null, 2))
}
