import page from '../node_modules/page/page.mjs';
import { navigationMiddleware } from '../middlewares/navigationMiddleware.js';
import { renderMiddleware } from '../middlewares/renderMiddleware.js';
import { homeView } from '../views/homeView.js';
import { loginView } from '../views/loginView.js';
import { logoutHandler } from '../views/logoutHandler.js';
import { registerView } from '../views/registerView.js';
import { dashboardView } from '../views/dashboardView.js';
import { createView } from '../views/createView.js';
import { detailsView } from '../views/detailsView.js';
import { editView } from '../views/editView.js';
import { deleteHandler } from '../views/deleteHandler.js';

page(renderMiddleware);
page(navigationMiddleware);

page('/', homeView);
page('/login', loginView);
page('/register', registerView);
page('/logout', logoutHandler);
page('/dashboard', dashboardView);
page('/create', createView);
page('/details/:petId', detailsView);
page('/details/:petId/edit', editView);
page('/details/:petId/remove', deleteHandler);

page.start();