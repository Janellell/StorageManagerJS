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

    it('should always return itself', () => {
        expect(eventMananger.$on(event, handler)).toEqual(eventMananger);
        expect(eventMananger.$off(event, handler)).toEqual(eventMananger);
        expect(eventMananger.$once(event, handler)).toEqual(eventMananger);
        expect(eventMananger.$emit(event)).toEqual(eventMananger);
    });

    describe('EventManager#$on', () => {
        it('should register events by name', () => {
            eventMananger.$on(event, handler);
            expect(eventMananger._events[event]).toEqual(arrayContaining([handler]));
        });
        it('should register events by a list of names', () => {
            eventMananger.$on([event, event], handler);
            expect(eventMananger._events[event]).toEqual(arrayContaining([handler]));
        });
    });
    describe('EventManager#$off', () => {
        it('should unregister all events', () => {
            eventMananger.$on(event, handler);
            eventMananger.$off();
            expect(eventMananger._events).toEqual(Object.create(null));
        });
        it('should unregister event handlers by event name', () => {
            eventMananger.$on(event, handler);
            eventMananger.$off(event);
            expect(eventMananger._events[event]).not.toEqual(arrayContaining([handler]));
        });
        it('should unregister event handlers by list of event names', () => {
            eventMananger.$on(event, handler);
            eventMananger.$off([event, event]);
            expect(eventMananger._events[event]).not.toEqual(arrayContaining([handler]));
        });
        it('should unregister event handlers by event name and handler', () => {
            eventMananger.$on(event, handler);
            eventMananger.$off(event, handler);
            expect(eventMananger._events[event]).not.toEqual(arrayContaining([handler]));
        });
    });
    describe('EventManager#$emit', () => {
        it('should trigger event handlers', () => {
            eventMananger.$on(event, handler);
            eventMananger.$emit(event);
            expect(handler).toHaveBeenCalled();
        });
        it('should trigger the $once event listeners once', () => {
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
    })
});