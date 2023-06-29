// Imports
const fs = require("fs");

// Local imports
const ethereum = require("#root/src/ethereum.js");

// Logging
const log = console.log;

// Read stdin
const pipedString = fs.readFileSync(process.stdin.fd).toString().trim();

// Parse arguments
const privateKey = pipedString;

// Run
const address = ethereum.deriveAddress({ privateKey });
ethereum.validateAddress({ address });
log(address);
