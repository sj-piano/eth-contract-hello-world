const crypto = require('crypto');
const ethers = require('ethers');


let log = console.log;


function generateRandomPrivateKey() {
  // Generate and validate a new random private key
  let id = crypto.randomBytes(32).toString('hex');
  let privateKey = `0x${id}`;
  log(privateKey);
  if (! ethers.isHexString(privateKey, 32)) {
    console.error(`Private key "${privateKey}" is invalid.`);
    process.exit(1);
  }
}


generateRandomPrivateKey();
