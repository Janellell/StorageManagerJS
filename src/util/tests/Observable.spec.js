import Observable from '../Observable';

const { createSpy } = jasmine;

describe('Observable', () => {
    const source = { a: 'a' };
    let observable;
    let handler;

    beforeEach(() => {
        observable = new Observable(source, { onSet: createSpy('onSet') });
        handler = createSpy('handler');
    });

    it('should be created from source', () => {
        expect(observable.a).toEqual(source.a);
    });
    it('should set and get the right property', () => {
        const path = 'b';
        const value = 'b';

        observable.$on('set', handler);
        observable.set(path, value);
        expect(handler).toHaveBeenCalledWith(path, value);
        expect(observable[path]).toEqual(value)

        observable.$on('get', handler);
        observable.get(path);
        expect(handler.calls.mostRecent().args[0]).toEqual(path);
    });
    it('should notify about forced updates', () => {
        observable.$on('update', handler);
        observable.update();
        expect(handler).toHaveBeenCalled();
    });
    it('should trigger hooks', () => {
        const path = 'a';
        const value = 'A';

        observable.set(path, value);
        expect(observable._hooks.onSet).toHaveBeenCalledWith(path, value);
    });
});
