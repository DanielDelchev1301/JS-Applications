import { render } from '../node_modules/lit-html/lit-html.js';

function renderer(template, main) {
    render(template, main);
}

export function renderMiddleware(ctx, next) {
    ctx.render = renderer;
    next();
}