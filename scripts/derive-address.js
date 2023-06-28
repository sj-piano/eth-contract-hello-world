// Imports
const ethers = require("ethers");
const fs = require("fs");

// Logging
const log = console.log;

// Read stdin
const pipedString = fs.readFileSync(process.stdin.fd).toString().trim();

// Parse arguments
const privateKey = pipedString;

function deriveAddress({ privateKey }) {
  if (!ethers.isHexString(privateKey, 32)) {
    console.error(`Private key "${privateKey}" is invalid.`);
    process.exit(1);
  }

  let wallet = new ethers.Wallet(privateKey);
  let address = wallet.address;
  log(address);
}

deriveAddress({ privateKey });
