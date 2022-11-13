import page from '../node_modules/page/page.mjs';

import { navigationMiddleware } from '../middlewares/navigationMiddleware.js';
import { renderMiddleware } from '../middlewares/renderMiddleware.js';

import { addOfferView } from '../views/addOfferView.js';
import { dashboardView } from '../views/dashboardView.js';
import { homeView } from '../views/homeView.js';
import { loginView } from '../views/loginView.js';
import { logoutHandler } from '../views/logoutHandler.js';
import { registerView } from '../views/registerView.js';
import { detailsView } from '../views/detailsView.js';
import { editView } from '../views/editView.js';
import { deleteHandler } from '../views/deleteHandler.js';
import { applyHandler } from '../views/applyHandler.js';

page(renderMiddleware);
page(navigationMiddleware);

page('/', homeView);
page('/login', loginView);
page('/register', registerView);
page('/logout', logoutHandler);
page('/dashboard', dashboardView);
page('/create', addOfferView);
page('/details/:offerId', detailsView);
page('/details/:offerId/edit', editView);
page('/details/:offerId/delete', deleteHandler);
page('/details/:offerId/apply', applyHandler);

page.start();