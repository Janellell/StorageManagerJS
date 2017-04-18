import EventManager from './EventManager';
import { EVENTS } from '../constants';

/**
 * @returns {Observable} observable instance created from supplied source
 * @todo Make this work with arrays (we currently replace the prototype on the source)
 */
class Observable extends EventManager {
    constructor(source = {}) {
        super();
        const self = this;
        const __proto__ = Object.getPrototypeOf(self);
        self._originalSource = _.clone(source);

        Object.defineProperties(self, {
            _originalSource: { enumerable: false },
        });

        // MWUAHAHAHAH I iz undercover proxy >:)
        Object.setPrototypeOf(source, __proto__);
        Object.setPrototypeOf(self, 
            new Proxy(source, {
                get: (observable, prop) => {
                    return observable[prop];
                },
                set: (observable, prop, value) => {
                    if (value === undefined) {
                        self.$emit(EVENTS.BEFORE_DELETE, prop, value);
                        observable[prop] = value;
                        self.$emit(EVENTS.DELETED, prop, value);
                    } else {
                        self.$emit(EVENTS.BEFORE_SET, prop, value);
                        observable[prop] = value;
                        self.$emit(EVENTS.SET, prop, value);
                    }
                    return true;
                },
                defineProperty: (observable, prop, descriptor) => {
                    self.$emit(EVENTS.BEFORE_SET, prop, value);
                    Object.defineProperty(observable, prop, descriptor);
                    self.$emit(EVENTS.SET, prop, value);
                    return true;
                },
                deleteProperty: (observable, prop) => {
                    self.$emit(EVENTS.BEFORE_DELETE, prop);
                    delete observable[prop];
                    self.$emit(EVENTS.DELETED, prop);
                    return true;
                },
            })
        );
    }
}

export default Observable;
