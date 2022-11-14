import page from '../node_modules/page/page.mjs';
import { navigationMiddleware } from '../middlewares/navigationMiddleware.js';
import { renderMiddleware } from '../middlewares/rendermiddleware.js';
import { loginView } from '../views/loginView.js';
import { registerView } from '../views/registerView.js';
import { logoutHandler } from '../views/logoutHandler.js';
import { addBookView } from '../views/addBookView.js';
import { dashboardView } from '../views/dashboardView.js';
import { detailsView } from '../views/detailsView.js';
import { editView } from '../views/editView.js';
import { myBooksView } from '../views/myBooksView.js';
import { deleteHandler } from '../views/deleteHandler.js';
import { likeHandler } from '../views/likeHandler.js';

page(renderMiddleware);
page(navigationMiddleware);

page('/login', loginView);
page('/register', registerView);
page('/logout', logoutHandler);
page('/addBook', addBookView);
page('/dashboard', dashboardView);
page('/details/:bookId', detailsView);
page('/details/:bookId/edit', editView);
page('/myBooks', myBooksView);
page('/details/:bookId/delete', deleteHandler);
page('/details/:bookId/like', likeHandler);

page.start();