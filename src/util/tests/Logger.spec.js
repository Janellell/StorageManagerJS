import Logger from '../Logger';

describe('Logger', () => {
    const message = 'Hi!';
    const loggerMessage = Logger.prefix + message + Logger.suffix;
    
    it('should log messages to console', () => {
        spyOn(console, 'log');
        Logger.log(message);
        expect(console.log).toHaveBeenCalledWith(loggerMessage);
    });
    it('should log warnings to console', () => {
        spyOn(console, 'warn');
        Logger.warn(message);
        expect(console.warn).toHaveBeenCalledWith(loggerMessage);
    });
    it('should log errors to console', () => {
        spyOn(console, 'error');
        Logger.error(message);
        expect(console.error).toHaveBeenCalledWith(loggerMessage);
    });
});
