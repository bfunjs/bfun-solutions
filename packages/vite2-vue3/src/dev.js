const { createServer } = require('vite');

export async function dev(ctx) {
    const { port, solution } = ctx;
    const server = await createServer(solution.vite);
    await server.listen(port);
}
