import { addApplication } from "../services/service.js";
import page from '../node_modules/page/page.mjs';

export function applyHandler(ctx) {
    const id = ctx.params.offerId;
    
    addApplication(id)
    .then(() => {
            document.getElementById('apply-btn').style.display = 'none';
            page.redirect(`/details/${id}`);
        });
}