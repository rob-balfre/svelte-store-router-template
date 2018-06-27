# Svelte, Svelte Store and rlite router

Example template combining Svelte, Svelte store and rlite router

```bash
npx degit rob-balfre/svelte-store-router-template svelte-app
cd svelte-app
```

*Note that you will need to have [Node.js](https://nodejs.org) installed.*


## Get started

Install the dependencies...

```bash
cd svelte-app
npm install
```

...then start [Rollup](https://rollupjs.org):

```bash
npm run dev
```

Navigate to [localhost:5000](http://localhost:5000). You should see your app running. Edit a component file in `src`, save it, and reload the page to see your changes.


## Router API

Full router options:

```js
export default {
  'name': {
    route: '/foo',
    beforeResolve: () => {}, 
    resolve: () => {}, // supports promises
    onRouteChange: () => {},
    beforeExit: () => {}, // supports promises
    afterExit: () => {},
  }
}; 
```

See src/main.js and src/routes.js and src/components/App.html for a full example

## Deploying to the web

### With [now](https://zeit.co/now)

Install `now` if you haven't already:

```bash
npm install -g now
```

Then, from within your project folder:

```bash
now
```

As an alternative, use the [Now desktop client](https://zeit.co/download) and simply drag the unzipped project folder to the taskbar icon.

### With [surge](https://surge.sh/)

Install `surge` if you haven't already:

```bash
npm install -g surge
```

Then, from within your project folder:

```bash
npm run build
surge public
```
