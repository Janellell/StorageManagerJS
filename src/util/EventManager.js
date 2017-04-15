/**
 * Basically copy pasted from VueJS event mixin
 */
class EventManager {
    constructor() {
        const self = this;
        self._events = Object.create(null);
    }
    $on(event, handler) {
        const self = this;
        if (Array.isArray(event)) {
            for (let i = 0; i < event.length; i++) {
                self.$on(event[i], handler);
            }
        } else {
            (self._events[event] || (self._events[event] = [])).push(handler);
        }

        return self;
    }
    $off(event, handler) {
        const self = this;

        // All
        if (!arguments.length) {
            self._events = Object.create(null);
            return self;
        }

        // Array of events
        if (Array.isArray(event)) {
            for (let i = 0; i < event.length; i++) {
                self.$off(event[i], handler);
            }
            return self;
        }

        const cbs = self._events[event];

        // Specific event
        if (!cbs) {
            return self;
        }
        if (arguments.length === 1) {
            self._events[event] = null;
            return self;
        }

        // Specific handler
        let cb;
        let i = cbs.length;
        while(i--) {
            cb = cbs[i];
            if (cb === handler || cb.handler === handler) {
                cbs.splice(i, 1);
                break;
            }
        }

        return self;
    }
    $once(event, handler) {
        const self = this;
        function on (...args) {
            self.$off(event, on);
            handler.apply(this, args);
        }
        on.handler = handler;
        self.$on(event, on);
        return self;
    }
    $emit(event, ...args) {
        const self = this;
        const cbs = self._events[event];
        if (cbs) {
            for(let i = 0; i < cbs.length; i++) {
                cbs[i].apply(self, args);
            }
        }
    }
}

export default EventManager;