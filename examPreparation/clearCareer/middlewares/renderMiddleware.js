import { render } from '../node_modules/lit-html/lit-html.js';

const renderer = (template, root) => {
    render(template, root);
}

export function renderMiddleware(ctx, next) {
    ctx.render = renderer;

    next();
}