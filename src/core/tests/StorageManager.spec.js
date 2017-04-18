import StorageManager from '../StorageManager';

const { objectContaining } = jasmine;

describe('StorageManager', () => {
    let storage;

    beforeEach(() => {
        storage = new StorageManager();
    });

    it('should initially be an empty object (when the source is an empty Object)', () => {
        const keys = Object.keys(storage);
        expect(keys).toEqual([]);
    });

    describe('StorageManager#addStore', () => {

    });

    describe('StorageManager#removeStore', () => {

    });

    describe('StorageManager#flush', () => {

    });

    describe('StorageManager#sync', () => {

    });

    describe('Hooks', () => {
        it('should be called when setting properties', () => {
            spyOn(storage.$hooks, 'set');
            storage.a = 'a';
            expect(storage.$hooks.set).toHaveBeenCalled();
        });

        it('should be called when deleting properties', () => {
            spyOn(storage.$hooks, 'deleted');
            storage.a = undefined;
            expect(storage.$hooks.deleted).toHaveBeenCalled();

            storage.a = 'a';
            delete Object.getPrototypeOf(storage).a;
            expect(storage.$hooks.deleted).toHaveBeenCalledTimes(2);
        });
    });
});
