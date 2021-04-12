/**
 * Returns the object relational model of a message
 */
const path = require('path');
const fs = require('fs');
const ORM = require('../ObjectRelationalModel.js');

const messageORM = new ORM({
    fields: {
        value: {
            datatype: 'varchar(60)',
            requiredInBody: {
                post: true,
                patch: true,
            },
        },
        palindrome: {
            datatype: 'boolean',
            setFunction(data) {
                const {value} = data;
                if (!value) return false;
        
                let isPalindrome = true;
                let startIndex = 0;
                let lastIndex = value.length - 1;
            
                // For a string to be a palindrome, each character on the first half
                // of the string must match the counterpart character position on the
                // second half. As soon as we encounter a mismatch between a character
                // and its counterpart character, we know the string is not a palindrome.
                while (isPalindrome && startIndex < lastIndex) {
                    if (value.charAt(startIndex) !== value.charAt(lastIndex)) {
                        isPalindrome = false;
                    }
                    startIndex++;
                    lastIndex--;
                }
                return isPalindrome;
            }
        },
    },
    queries: {
        getAllQuery: fs.readFileSync(path.join(__dirname, '../queries/message/get_all.sql')).toString(),
        getQuery: fs.readFileSync(path.join(__dirname, '../queries/message/get_message.sql')).toString(),
        insertQuery: fs.readFileSync(path.join(__dirname, '../queries/message/insert_message.sql')).toString(),
        updateQuery: fs.readFileSync(path.join(__dirname, '../queries/message/update_message.sql')).toString(),
        deleteQuery: fs.readFileSync(path.join(__dirname, '../queries/message/delete_message.sql')).toString(),
    },
});

module.exports = messageORM;