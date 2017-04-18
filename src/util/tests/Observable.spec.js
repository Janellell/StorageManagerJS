import Observable from '../Observable';

const { createSpy, arrayContaining } = jasmine;

describe('Observable', () => {
    let source, observable, handler;
    const event = 'test';
    const arg1 = 'arg1';
    const arg2 = 2;

    beforeEach(() => {
        source = {};
        observable = new Observable(source);
        handler = createSpy('handler');
    });

    it('should be created from source', () => {
        source.a = 'a';
        observable = new Observable(source);
        expect(observable.a).toEqual(source.a);
    });

    it('should forward to source', () => {
        source.a = '';
        expect(source.a).toEqual('');
        observable.a = 'a';
        expect(observable.a).toEqual('a');
        expect(observable.a).toEqual(source.a);
    });

    it('should execute hooks accordingly', () => {
        
    });

    // it('should work with arrays too', () => {
    //     source = [];
    //     observable = new Observable(source);
    //     source.push(1);
    //     expect(observable[0]).toEqual(source[0]);
    // });
});