/**
 * Validates the body of incoming requests
 */
const orms = require('../object-relational-models/index.js');
const {createAPIError} = require('../utils.js');

// Validates that
//  a) there is a body and
//  b) the body has the correct content and
//  c) the content is of the correct datatype
function validateBody(body, method, table) {
    if (!body) {
        return createAPIError('Missing request body');
    }

    const model = orms[table];

    if (!model) {
        return createAPIError(`No model exists for '${table}'`);
    }

    const requiredBodyFields = model.getRequiredBodyFields(method);

    let error = null;
    // Iterate through all fields/attributes that are mandatory in the body
    // and verify that they are present and are of correct datatype.
    for (const field in requiredBodyFields) {
        if (Object.hasOwnProperty.call(requiredBodyFields, field)) {
            const datatype = requiredBodyFields[field];

            if (!body[field]) {
                error = createAPIError(`Missing '${field}' in request body`);
            } else if (typeof body[field] !== datatype) {
                error = createAPIError(`'${field}' should be of datatype ${datatype}`);
            }

            if (error) {
                // Body is not valid. No need to continue.
                break;
            }
        }
    }

    return error;
}

module.exports = function(app) {

    // Validates body of post requests
    app.post('/api/:table', (req, res, next) => {
        const validationError = validateBody(req.body, 'post', req.params.table);
        next(validationError);
    });

    // Validates body of patch requests
    app.patch('/api/:table/:id', (req, res, next) => {
        const validationError = validateBody(req.body, 'patch', req.params.table);
        next(validationError);
    });
};