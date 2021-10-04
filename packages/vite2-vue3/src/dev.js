const { createServer } = require('vite');

export async function dev(ctx) {
    const { port, solution } = ctx;
    const [ clientConfig ] = solution.vite;
    const devServer = await createServer(clientConfig);
    await devServer.listen(port);
}
