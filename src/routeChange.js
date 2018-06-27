import rlite from "rlite-router";

let resolveToken;
let globalStore;
let router;
let appRoutes;

function initRouter(routes, store) {
  const rliteConstructor = {};
  appRoutes = routes;
  globalStore = store;
  Object.keys(routes).forEach((key) => {
    const route = routes[key];
    rliteConstructor[route.route] = (arg) => {
      globalStore.set({activeRoute: key});
      return routeChange({
        name: key,
        beforeResolve: route.beforeResolve,
        resolve: route.resolve ? route.resolve(arg) : () => {},
        onRouteChange: route.onRouteChange,
        afterExit: route.afterExit
      })
    }
  });

  router = rlite({}, rliteConstructor);
  window.addEventListener('hashchange', processHash, false);
  processHash()
}

async function routeChange(args) {
  const token = tokenGen();
  resolveToken = JSON.parse(JSON.stringify(token));
  let resolveData = {};

  if (args.beforeResolve) {
    args.beforeResolve();
  }
  if (args.resolve) {
    resolveData = await args.resolve;
  }
  if (token === resolveToken) {
    args.onRouteChange(resolveData);
  } else {
    console.warn(`Resolve promise for '${args.name}' ignored.`);
  }
}

async function startRouteChange(name, path) {
  const { activeRoute } = globalStore.get();
  const appRoute = appRoutes[activeRoute];
  if (appRoute.beforeExit) {
    await appRoute.beforeExit();
  }

  location.hash = `#${path}`;

  if (appRoute.afterExit) {
    appRoute.afterExit()
  }
}

function processHash() {
  const hash = location.hash || '#';
  router(hash.slice(1));
}

function tokenGen() {
  return Math.random().toString(36).substr(2);
}

export {
  initRouter,
  startRouteChange
}