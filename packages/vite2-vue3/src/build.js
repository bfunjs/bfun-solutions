const { build: createBuild } = require('vite');

export async function build(ctx) {
    const { solution } = ctx;
    const { options = {} } = solution || {};
    const [ clientConfig, serverConfig ] = solution.vite;

    await createBuild(clientConfig);
    if (options.ssr) {
        await createBuild(serverConfig);
    }
}
