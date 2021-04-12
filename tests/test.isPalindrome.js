const messageORM = require('../lib/object-relational-models/message.js');

const { setFunction: isPalindrome } = messageORM.fields.value;

const tests = [
    {
        actual: isPalindrome({value: ''}),
        expected: false,
    },
    {
        actual: isPalindrome({value: 'a'}),
        expected: true,
    },
    {
        actual: isPalindrome({value: 'ba'}),
        expected: false,
    },
    {
        actual: isPalindrome({value: 'bb'}),
        expected: true,
    },
    {
        actual: isPalindrome({value: 'aloha'}),
        expected: false,
    },
    {
        actual: isPalindrome({value: 'alola'}),
        expected: true,
    },
];

for(let i = 0; i < tests.length; i++) {
    console.log(`expected ${tests[i].expected}, got ${tests[i].actual}`);
}

process.exit(0);