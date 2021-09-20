const { build: createBuild } = require('vite');

export async function build(ctx) {
    const { solution } = ctx;
    await createBuild(solution.vite);
}
