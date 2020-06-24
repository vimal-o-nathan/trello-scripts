// This code sample uses the 'node-fetch' library:
// https://www.npmjs.com/package/node-fetch
const fetch = require('node-fetch');
const scriptSettings = require('../trelloAuthSettings.json');
const readLine = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});

// Program starts here