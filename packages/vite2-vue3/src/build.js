const { build: createBuild } = require('vite');

export async function build(ctx) {
    const { solution } = ctx;
    const { options = {} } = solution || {};
    const [ clientConfig, serverConfig ] = solution.vite;
    console.log(clientConfig, serverConfig);

    await createBuild(clientConfig);
    if (options.ssr) {
        await createBuild(serverConfig);
    }
}
