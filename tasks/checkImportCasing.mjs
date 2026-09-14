import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';

const require = createRequire(import.meta.url);
const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const moduleAliases = require('./moduleAliases.js').resolve.alias;
const sourceRoots = ['app', 'generator', 'tables'];
const candidateExtensions = ['', '.js', '.mjs', '.json', '.scss', '.css'];

function walk(directory) {
    return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
        const target = path.join(directory, entry.name);
        return entry.isDirectory() ? walk(target) : [target];
    });
}

function exactPathExists(target) {
    const absoluteTarget = path.resolve(target);
    const parsedTarget = path.parse(absoluteTarget);
    let currentPath = parsedTarget.root;

    for (const pathPart of absoluteTarget.slice(parsedTarget.root.length).split(path.sep)) {
        if (!pathPart) continue;

        const entries = fs.readdirSync(currentPath);
        if (!entries.includes(pathPart)) return false;

        currentPath = path.join(currentPath, pathPart);
    }

    return true;
}

function resolveLocalImport(importingFile, specifier) {
    if (specifier.startsWith('.')) {
        return path.resolve(path.dirname(importingFile), specifier);
    }

    const aliasName = Object.keys(moduleAliases).find(
        (alias) => specifier === alias || specifier.startsWith(`${alias}/`)
    );

    if (!aliasName) return null;

    const aliasSuffix = specifier.slice(aliasName.length).replace(/^\//, '');
    return path.resolve(moduleAliases[aliasName], aliasSuffix);
}

function importCandidates(target) {
    return candidateExtensions
        .map((extension) => `${target}${extension}`)
        .concat(
            candidateExtensions
                .filter(Boolean)
                .map((extension) => path.join(target, `index${extension}`))
        );
}

const importPattern = /(?:\bimport\s+(?:[^'";]*?\s+from\s+)?|\bexport\s+[^'";]*?\s+from\s+|\brequire\s*\(\s*)['"]([^'"]+)['"]/g;
export function checkImportCasing() {
    const failures = [];

    for (const importingFile of sourceRoots
        .flatMap((sourceRoot) => walk(path.join(projectRoot, sourceRoot)))
        .filter((filename) => filename.endsWith('.js'))) {
        const source = fs.readFileSync(importingFile, 'utf8');

        for (const match of source.matchAll(importPattern)) {
            const specifier = match[1];
            const target = resolveLocalImport(importingFile, specifier);
            if (!target) continue;

            const resolvesExactly = importCandidates(target).some((candidate) => {
                try {
                    return exactPathExists(candidate);
                } catch {
                    return false;
                }
            });

            if (!resolvesExactly) {
                const relativeFile = path.relative(projectRoot, importingFile);
                const lineNumber = source.slice(0, match.index).split('\n').length;
                failures.push(`${relativeFile}:${lineNumber}: ${specifier}`);
            }
        }
    }

    return failures;
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
    const failures = checkImportCasing();
    if (failures.length) {
        console.error('Imports that do not resolve with exact filename casing:');
        console.error(failures.join('\n'));
        process.exitCode = 1;
    } else {
        console.log('All local imports resolve with exact filename casing.');
    }
}
