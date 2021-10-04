import { cloneDeep } from 'lodash-es';

const { resolve } = require('path');
const { defineConfig } = require('vite');
const vue = require('@vitejs/plugin-vue');

const { rootDir, configDir } = global;

export async function init(ctx, next) {
    const { solution } = ctx;
    const { options = {} } = solution || {};

    const isDev = process.env.NODE_ENV !== 'production';
    const clientConfig = defineConfig(options.vite || {});

    clientConfig.root = configDir;
    if (!clientConfig.build) clientConfig.build = {};
    if (!clientConfig.plugins) clientConfig.plugins = [];
    clientConfig.plugins.push(vue());

    if (options.publicPath) clientConfig.base = options.publicPath;

    const serverConfig = defineConfig(cloneDeep(clientConfig));

    if (options.distSubDir) {
        clientConfig.build.outDir = resolve(rootDir, 'dist', options.distSubDir);
    }
    if (options.ssr && !isDev) {
        serverConfig.build.outDir = resolve(clientConfig.build.outDir, 'server');
        serverConfig.build.ssr = resolve(configDir, 'entry-server.ts');

        clientConfig.build.outDir = resolve(clientConfig.build.outDir, 'client');
        clientConfig.build.ssr = resolve(configDir, 'entry-client.ts');
        clientConfig.build.ssrManifest = true;
    }

    ctx.solution.vite = [ clientConfig, serverConfig ];

    await next();
}
