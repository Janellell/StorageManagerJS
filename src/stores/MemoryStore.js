import Observable from '../util/Observable';

class MemoryStore extends Observable {
    flush() {
        _.forEach(Object.keys(self), (key) => {
            if (Object.prototype.propertyIsEnumerable.call(self, key)) {
                delete self[key];
            }
        });
        self.update();
    }
    sync() {
        self.$emit('beforesync', self);
        return new Promise((resolve) => resolve(self));
    }
}

export default MemoryStore;