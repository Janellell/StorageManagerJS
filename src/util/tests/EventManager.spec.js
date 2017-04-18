import _ from 'lodash';
import EventManager from '../EventManager';

const { createSpy, arrayContaining } = jasmine;

describe('EventManager', () => {
    let args;
    let eventManager;
    let handler;
    const event = 'test';
    const arg1 = 'arg1';
    const arg2 = 2;

    beforeEach(() => {
        args = undefined;
        eventManager = new EventManager();
        handler = createSpy('handler');
    });

    it('should always return itself', () => {
        expect(eventManager.$on(event, handler)).toEqual(eventManager);
        expect(eventManager.$off(event)).toEqual(eventManager);
        expect(eventManager.$off(event, handler)).toEqual(eventManager);
        expect(eventManager.$once(event, handler)).toEqual(eventManager);
        expect(eventManager.$emit(event)).toEqual(eventManager);
    });

    describe('EventManager#$on', () => {
        it('should register events by name', () => {
            eventManager.$on(event, handler);
            expect(eventManager._events[event]).toEqual(arrayContaining([handler]));
        });
        it('should register events by a list of names', () => {
            eventManager.$on([event, event], handler);
            expect(eventManager._events[event]).toEqual(arrayContaining([handler]));
        });
    });
    describe('EventManager#$off', () => {
        it('should unregister all events', () => {
            eventManager.$on(event, handler);
            eventManager.$off();
            expect(eventManager._events).toEqual(Object.create(null));
        });
        it('should unregister event handlers by event name', () => {
            eventManager.$on(event, handler);
            eventManager.$off(event);
            expect(eventManager._events[event]).toEqual(null);
        });
        it('should unregister event handlers by list of event names', () => {
            eventManager.$on(event, handler);
            eventManager.$off([event, event]);
            expect(eventManager._events[event]).not.toEqual(arrayContaining([handler]));
        });
        it('should unregister event handlers by event name and handler', () => {
            eventManager.$on(event, handler);
            eventManager.$off(event, handler);
            expect(eventManager._events[event]).not.toEqual(arrayContaining([handler]));
        });
    });
    describe('EventManager#$emit', () => {
        it('should trigger event handlers', () => {
            eventManager.$on(event, handler);
            eventManager.$emit(event);
            expect(handler).toHaveBeenCalled();
        });
        it('should trigger the $once event listeners once', () => {
            eventManager.$once(event, handler);
            eventManager.$emit(event);
            eventManager.$emit(event);
            expect(handler).toHaveBeenCalledTimes(1);
        });
        it('should pass data to event handlers', () => {
            eventManager.$on(event, handler);
            eventManager.$emit(event, arg1, arg2);
            expect(handler).toHaveBeenCalledWith(arg1, arg2);
        });
        it('should handle hooks', () => {
            eventManager.$hooks[event] = handler;
            eventManager.$emit(event, arg1, arg2);
            expect(handler).toHaveBeenCalledWith(arg1, arg2);
            delete eventManager.$hooks[event];
            eventManager.$emit(event, arg1, arg2);
            expect(handler).toHaveBeenCalledTimes(1);
        });
    })
});