/**
 * Utility file to reduce boilerplating by capturing logic that may be common across apis
 */

module.exports = {
    createAPIError(msg, status = 400) {
        const err = new Error();
        err.httpStatus = status;
        err.message = msg;
        return err;
    },
};