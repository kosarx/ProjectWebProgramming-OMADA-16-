`This code is only useful for generating the hash of the users for the database.
It is not necessary to run this code in production, as the hashes are already stored in the database.
If you want to generate the hashes, you can uncomment the import statement in the index.mjs file.`

import { hash as _hash } from 'bcrypt';

const passwords = [
    'password1',
    'password2',
    'password3',
    'password4',
    'password5',
    'password6',
    'password7',
    'password8',
    'password9',
    'password10'
];

const saltRounds = 10;

const generateHashes = async () => {
    try {
        for (const password of passwords) {
            const hash = await _hash(password, saltRounds);
            console.log(`Password: ${password}`);
            console.log(`Bcrypt Hash: ${hash}`);
            console.log('------------------------');
        }
    } catch (error) {
        console.error(error);
    }
};

generateHashes();