// Local imports
const ethereum = require("#root/src/ethereum.js");

// Logging
let log = console.log;

// Run
const privateKey = ethereum.createPrivateKey();
ethereum.validatePrivateKey({ privateKey });
log(privateKey);
