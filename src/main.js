import App from './components/App.html';
import { initRouter } from './routeChange.js';
import routes from './routes.js';
import store from './store.js';

initRouter(routes, store);

const app = new App({
  target: document.body,
});

export default app;