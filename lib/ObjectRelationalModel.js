/**
 * Skeleton of Objection Relational Models.
 * 
 * These models, while not incredibly useful right now, would help define the tables, columns,
 * and any additional db features like indexing or keys. In addition, it would help define the
 * characteristics and behaviours of the fields.
 */

module.exports = class ObjectRelationalModel {
    // Ideally all queries are generated dynamically using the ORM and its field definitions
    queries = {}
    // List of configured fields belonging to the model
    fields = {}
    // Fields applied to every model
    defaultFields = {
        id: {
            datatype: 'uuid',
        },
        created_date: {
            datatype: 'timestamptz',
        },
        updated_date: {
            datatype: 'timestamptz',
        },
    }

    constructor(options) {
        const {fields, queries} = options;

        this.fields = Object.assign(this.defaultFields, fields);
        this.queries = queries;
    }

    // Returns list of required fields for the body along with the expected datatype
    getRequiredBodyFields(method) {
        const requiredFields = {};

        for (let field in this.fields) {
            if (Object.hasOwnProperty.call(this.fields, field)) {
                const fieldDefinition = this.fields[field];
                if (fieldDefinition.requiredInBody && fieldDefinition.requiredInBody[method]) {
                    requiredFields[field] = this.getJsDataType(field);
                }
            }
        }

        return requiredFields;
    }

    // This is a horrible function and would be improved or replaced with more time.
    getJsDataType(field) {
        const {dataType: dbDataType} = field;
        let jsDataType;

        switch(dbDataType) {
            case 'varchar(60)':
            default:
                jsDataType = 'string';
        }
        
        return jsDataType;
    }
}