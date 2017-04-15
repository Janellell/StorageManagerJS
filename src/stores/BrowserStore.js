import Observable from '../util/Observable';

const BROWSER_STORE_TYPES = {
    COOKIE: 'cookieStorage',
    LOCAL: 'localStorage',
    SESSION: 'sessionStorage',
};

class BrowserStore extends Observable {
    constructor(source, options) {
        super(source, options);

        const self = this;
        self._type = options.type;
    }
    flush() {
    }
    sync() {
    }
}

export default BrowserStore;
