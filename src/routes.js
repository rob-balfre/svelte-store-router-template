import store from './store.js';
import constants from './constants.js';

export default {
  'home': {
    route: '/',
    onRouteChange: () => store.set({routeRoot: constants.ROUTE_ROOT.HOME}),
  },
  'foo.list': {
    route: '/foo',
    beforeResolve: () => store.set({routeRoot: constants.ROUTE_ROOT.FOO, routeFoo: constants.ROUTE_FOO.LOADING}),
    resolve: asyncExample,
    onRouteChange: () => store.set({routeRoot: constants.ROUTE_ROOT.FOO, routeFoo: constants.ROUTE_FOO.LIST}),
    beforeExit: () => {
      console.log('foo.list: before exit')
    },
    afterExit: () => {
      console.log('foo.list: after exit')
    },
  },
  'foo.detail': {
    route: '/foo/:id',
    beforeResolve: () => store.set({routeRoot: constants.ROUTE_ROOT.FOO, routeFoo: constants.ROUTE_FOO.LOADING}),
    resolve: asyncExample,
    onRouteChange: (resolveData) => store.set({
      routeRoot: constants.ROUTE_ROOT.FOO, routeFoo: constants.ROUTE_FOO.DETAIL, activeFoo: resolveData
    }),
  }
};

function asyncExample({id}) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({id: id, name: 'Some name from API...'});
    }, 2000);
  });
}