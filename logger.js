/**
 * Simple logging system
 */

class Logger {
    constructor() {}

    error(error) {
        const {stack} = error;
        console.error(stack);
    }

    warn(message) {
        console.log(`WARN: ${message}`);
    }

    info(message) {
        console.log(`INFO: ${message}`);
    }

    success(message) {
        console.log(`SUCCESS: ${message}`);
    }
}

const singletonLogger = new Logger();
module.exports = singletonLogger;
