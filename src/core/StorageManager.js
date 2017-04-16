import Observable from '../util/Observable';

class StorageManager {
    constructor() {
        const self = this;
        self.stores = {};
    }
    flush(store) {
        const self = this;

        if (store) {
            self.stores[store].flush();
        } else {
            self.stores = {};
        }

        return self.sync();
    }
    sync(store) {
        const self = this;

        if (store) {
            return self.stores[store].sync();
        } else {
            const syncedStores = self.stores.map((store) => store.sync());
            return Promise.all(syncedStores);
        }
    }
}

StorageManager.Observable = Observable;

export default StorageManager;