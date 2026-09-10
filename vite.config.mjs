import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { defineConfig, transformWithOxc } from 'vite';

import moduleAliases from './tasks/moduleAliases.js';

const projectRoot = path.dirname(fileURLToPath(import.meta.url));
const sourceJavaScript = /\/(app|generator|tables)\/.*\.js$/;
const legacyGlobalDefine = {
    global: 'globalThis'
};

function legacyJsxInJavaScript(command) {
    return {
        name: 'legacy-jsx-in-javascript',
        enforce: 'pre',
        async transform(code, id) {
            const filename = id.split('?', 1)[0];

            if (!sourceJavaScript.test(filename)) return null;

            return transformWithOxc(code, filename, {
                lang: 'jsx',
                define: {
                    'process.env.NODE_ENV': JSON.stringify(
                        command === 'build' ? 'production' : 'development'
                    ),
                    'process.env.DECLINE_GOOGLE_ANALYTICS_TOKEN':
                        JSON.stringify(process.env.DECLINE_GOOGLE_ANALYTICS_TOKEN) || 'undefined'
                },
                jsx: {
                    runtime: 'classic'
                }
            });
        }
    };
}

export default defineConfig(({ command }) => ({
    base: './',
    // The same browser artifact is promoted through staging and production.
    envDir: false,
    envPrefix: [],
    plugins: [legacyJsxInJavaScript(command)],
    define: legacyGlobalDefine,
    resolve: moduleAliases.resolve,
    optimizeDeps: {
        noDiscovery: true,
        rolldownOptions: {
            transform: {
                define: legacyGlobalDefine
            }
        },
        include: [
            'axios',
            'lodash',
            'react',
            'react-addons-css-transition-group',
            'react-dom',
            'react-dropdown',
            'react-ga',
            'react-redux',
            'react-router',
            'react-router-redux',
            'redux',
            'redux-actions',
            'redux-logger'
        ]
    },
    css: {
        preprocessorOptions: {
            scss: {
                loadPaths: [
                    path.join(projectRoot, 'node_modules', 'foundation-sites', 'scss'),
                    path.join(projectRoot, 'app', 'styling')
                ],
                silenceDeprecations: [
                    'color-functions',
                    'elseif',
                    'global-builtin',
                    'if-function',
                    'import',
                    'slash-div'
                ]
            }
        }
    },
    server: {
        port: 8000,
        strictPort: true
    },
    preview: {
        port: 8000,
        strictPort: true
    },
    build: {
        outDir: 'dist',
        sourcemap: true
    }
}));
