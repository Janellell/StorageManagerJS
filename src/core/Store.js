import EventManager from '../util/EventManager';

class Store extends EventManager {
    constructor(options) {
        super();
        const self = this;
        self._options = options;
        self.sync = self._sync;
        self.flush = self._flush;
    }
    _sync(source) {
        const self = this;
        self.$emit(EVENTS.BEFORE_SYNC);
        self._options.sync(source);
        self.$emit(EVENTS.SYNCED);
    }
    _flush() {
        const self = this;
        self.$emit(EVENT.BEFORE_SYNC);
        self._options.flush(source);
        self.$emit(EVENTS.SYNCED);
    }
}

export default Store;