const { createServer } = require('vite');

export async function dev(ctx) {
    const { port, solution } = ctx;
    const [ clientConfig ] = solution.vite;
    const server = await createServer(clientConfig);
    await server.listen(port);
}
