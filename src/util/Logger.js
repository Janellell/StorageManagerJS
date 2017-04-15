class Logger {
    static prefix = 'Storage: ';
    static suffix = '';
}

Logger.log = log;
Logger.warn = warn;
Logger.error = error;

function warn(message) {
    console.warn(Logger.prefix + message + Logger.suffix);
}
function error(message) {
    console.error(Logger.prefix + message + Logger.suffix);
}
function log(message) {
    console.log(Logger.prefix + message + Logger.suffix);
}

export default Logger;
