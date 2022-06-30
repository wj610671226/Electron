const Store = require('electron-store');
const store = new Store();
console.log('Store init');

const set = (key, value) => {
    store.set(key, value);
}

const get = (key) => {
    return store.get(key)
}

module.exports = {
    set,
    get
}