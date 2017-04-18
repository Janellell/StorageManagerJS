import _ from 'lodash';
import Observable from '../util/Observable';
import Store from './Store';
import { STORAGE_MANAGER_OPTIONS as DEFAULT_OPTIONS } from '../constants';

class StorageManager extends Observable {
    constructor(source = {}, options = {}) {
        super(source, true);

        const self = this;
        self._options = Object.assign(DEFAULT_OPTIONS, options);
        self.$stores = {};
        self.$hooks.set = self.set;
        self.$hooks.deleted = self.deleted;

        Object.defineProperties(self, {
            _stores: { enumerable: false, writable: false },
            $stores: { enumerable: false },
        });
    }
    set(prop, value) {
        const self = this;

        if (self._options.autoSync) {
            self.sync();
        }
    }
    deleted(prop, value) {
        const self = this;

        if (self._options.autoSync) {
            self.sync();
        }
    }
    addStore(name, config) {
        const self = this;
        const store = new Store(config);
        self.$stores[name] = store;
        return store;
    }
    removeStore(name) {
        const self = this;
        delete self.$stores[name];
        return self.$stores[name];
    }
    flush() {
        const self = this;
        const flushedStores = _.map(self.$stores, ($store) => $store.flush());
        return Promise.all(flushedStores);        
    }
    sync() {
        const self = this;

        const syncedStores = _.map(self.$stores, ($store) => $store.sync());
        return Promise.all(syncedStores);
    }
}

StorageManager.Observable = Observable;

export default StorageManager;
