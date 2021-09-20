import { init } from './init';

export const extensions = [];
export const required = [ 'vue' ];
export const version = '__VERSION__';

export const preDev = init;
export { dev } from './dev';

export const preBuild = init;
export { build } from './build';
