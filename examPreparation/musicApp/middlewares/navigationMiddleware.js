import { isAuthenticated } from "../services/authService.js";
import { navigationTemplate } from "../views/navigationView.js";

const navMain = document.querySelector('.navigation-content');

export function navigationMiddleware(ctx, next) {
    ctx.render(navigationTemplate(isAuthenticated()), navMain);
    next();
}