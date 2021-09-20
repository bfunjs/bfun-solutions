const { resolve } = require('path');
const { defineConfig } = require('vite');
const vue = require('@vitejs/plugin-vue');

const { rootDir, configDir } = global;

export async function init(ctx, next, solutionOptions) {
    const { solution } = ctx;
    const { options = {} } = solution || {};

    // const isDev = process.env.NODE_ENV !== 'production';
    const viteConfig = defineConfig(options.vite || {});

    viteConfig.root = configDir;
    if (!viteConfig.build) viteConfig.build = {};
    if (!viteConfig.plugins) viteConfig.plugins = [];
    viteConfig.plugins.push(vue());

    if (options.publicPath) viteConfig.base = options.publicPath;
    if (options.distSubDir) viteConfig.build.outDir = resolve(rootDir, 'dist', options.distSubDir);

    ctx.solution.vite = viteConfig;

    await next();
}
