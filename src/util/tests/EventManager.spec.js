import _ from 'lodash';
import EventManager from '../EventManager';

const { createSpy, arrayContaining } = jasmine;

describe('EventManager', () => {
    let args;
    let eventMananger;
    let handler;
    const event = 'test';

    beforeEach(() => {
        args = undefined;
        eventMananger = new EventManager();
        handler = createSpy('handler');
    });

    it('should register and unregister event handlers', () => {
        eventMananger.$on(event, handler);
        expect(eventMananger._events[event]).toEqual(arrayContaining([handler]));

        eventMananger.$off(event, handler);
        expect(eventMananger._events[event]).not.toEqual(arrayContaining([handler]));
    });
    it('should trigger event handlers', () => {
        eventMananger.$on(event, handler);
        eventMananger.$emit(event);
        expect(handler).toHaveBeenCalled();
    });
    it('should trigger an event handler once', () => {
        eventMananger.$once(event, handler);
        eventMananger.$emit(event);
        eventMananger.$emit(event);

        expect(handler).toHaveBeenCalledTimes(1);
    });
    it('should pass data to event handlers', () => {
        const arg1 = 'arg1';
        const arg2 = 2;

        eventMananger.$on(event, handler);
        eventMananger.$emit(event, arg1, arg2);

        expect(handler).toHaveBeenCalledWith(arg1, arg2);
    });
});