module.exports = class ObjectRelationalModel {
    queries = {}
    fields = {}
    defaultFields = {
        id: {
            datatype: 'uuid',
            isPrimary: true,
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
}