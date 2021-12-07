import Store from "./Store.js";

const store = new Store();

window.__GLOB_STATE__ = store.state;

export default store;