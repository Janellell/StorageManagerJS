import _ from 'lodash';
import EventManager from './EventManager';

const OBSERVER_EVENTS = {
    SET: 'set',
    AFTER_SET: 'afterset',
    GET: 'get',
    UPDATE: 'update',
};

class Observable extends EventManager {
    constructor(source, options) {
        super();
        const self = this;
        _.assign(self, source);

        self._hooks = {
            onSet: options.onSet || _.noop,
            afterSet: options.afterSet || _.noop,
            onGet: options.onGet || _.noop,
            onUpdate: options.onUpdate || _.noop,
        };

        self.$on(OBSERVER_EVENTS.SET, self._hooks.onSet);
        self.$on(OBSERVER_EVENTS.AFTER_SET, self._hooks.afterSet);
        self.$on(OBSERVER_EVENTS.GET, self._hooks.onGet);
        self.$on(OBSERVER_EVENTS.UPDATE, self._hooks.onUpdate);
    }
    set(path, value) {
        const self = this;
        self.$emit(OBSERVER_EVENTS.SET, path, value);
        _.set(self, path, value);
        self.$emit(OBSERVER_EVENTS.AFTER_SET);
        return _.get(self, path);
    }
    get(path) {
        const self = this;
        self.$emit(OBSERVER_EVENTS.GET, path);
        return _.get(self, path);
    }
    update() {
        const self = this;
        self.$emit(OBSERVER_EVENTS.UPDATE, self);
    }
}

export default Observable;