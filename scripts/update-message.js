// Imports
const Ajv = require("ajv");
const Big = require('big.js');
const { program } = require('commander');
const { ethers } = require("ethers");
const fs = require('fs');
const _ = require('lodash');


// Settings
networkList = 'local testnet mainnet'.split(' ');


// Load environment variables
require('dotenv').config();
const {
  INFURA_API_KEY,
  LOCAL_HARDHAT_PRIVATE_KEY,
  LOCAL_HARDHAT_ADDRESS,
  TESTNET_SEPOLIA_PRIVATE_KEY,
  TESTNET_SEPOLIA_ADDRESS,
  LOCAL_HARDHAT_DEPLOYED_CONTRACT_ADDRESS,
  TESTNET_SEPOLIA_DEPLOYED_CONTRACT_ADDRESS,
} = process.env;


// Logging
let log = console.log;


// Parse arguments
program
	.option('-d, --debug', 'log debug information')
	.option('--network <network>', 'specify the Ethereum network to connect to', 'local')
  .requiredOption('--input-file-json <inputFileJson>', 'Path to JSON file containing input data.')
program.parse();
const options = program.opts();
if (options.debug) log(options);
let { debug, network, inputFileJson } = options;


// Process and validate arguments

if (! networkList.includes(network)) {
  console.error(`Invalid network "${network}". Valid options are: [${networkList.join(', ')}]`);
  process.exit(1);
}

let network2;
if (network == 'local') network2 = 'http://localhost:8545';
if (network == 'testnet') network2 = 'sepolia';
if (network == 'mainnet') network2 = 'mainnet';

if (! fs.existsSync(inputFileJson)) {
  console.error(`File "${inputFileJson}" not found.`);
  process.exit(1);
}

const inputData = JSON.parse(fs.readFileSync(inputFileJson, 'utf8'));

const ajv = new Ajv();
const inputJsonSchema = {
  type: "object",
  properties: {
    newMessage: { type: "string" },
  },
  required: ["newMessage"],
  additionalProperties: false,
};
const validateInputJson = ajv.compile(inputJsonSchema);

const validInputData = validateInputJson(inputData);
if (!validInputData) {
  console.error(validateInputJson.errors);
  process.exit(1);
}
let { newMessage } = inputData;


// Setup

const contract = require("../artifacts/contracts/HelloWorld.sol/HelloWorld.json");
const { type } = require("os");

let provider, signer, helloWorldContract;
let msg;
if (network == 'local') {
  msg = `Connecting to ${network} network at ${network2}...`;
  provider = new ethers.JsonRpcProvider(network2);
  signer = new ethers.Wallet(LOCAL_HARDHAT_PRIVATE_KEY, provider);
  helloWorldContract = new ethers.Contract(LOCAL_HARDHAT_DEPLOYED_CONTRACT_ADDRESS, contract.abi, signer);
} else if (network == 'testnet' || network == 'mainnet') {
  x = network == 'testnet'? network2 + ' ': '';
  msg = `Connecting to ${x}${network} network...`;
  provider = new ethers.InfuraProvider(network2, INFURA_API_KEY);
  signer = new ethers.Wallet(TESTNET_SEPOLIA_PRIVATE_KEY, provider);
  helloWorldContract = new ethers.Contract(TESTNET_SEPOLIA_DEPLOYED_CONTRACT_ADDRESS, contract.abi, signer);
}
log(msg);


// Run main function

main({newMessage})
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });


// Functions


async function main({newMessage}) {

  // Confirm connection
  let blockNumber = await provider.getBlockNumber();
  log(`Current block number: ${blockNumber}`);

  let address = helloWorldContract.target;
  let check = await isContractAddress({address});
  if (! check) {
    console.error(`No contract deployed at contract address ${address}.`);
    process.exit(1);
  }
  log(`Contract found at address: ${address}`);

  // Interact with contract.
  await updateMessage(newMessage);

}


async function isContractAddress({address}) {
  if (! ethers.isAddress(address)) {
    console.error(`Address "${address}" is invalid.`);
    process.exit(1);
  }
  let result = await provider.getCode(address);
  if (result == '0x') return false;
  return true;
}


async function updateMessage(newMessage) {

  //const message = await helloWorldContract.message();
  //console.log("Message stored in HelloWorld contract: " + message);

  let signerAddress = signer.address;
  //log(`Signer address: ${signerAddress}`);

  let txCount = await provider.getTransactionCount(signerAddress);
  //log(`Transaction count: ${txCount}`);

  let nextNonce = await signer.getNonce();
  //log(`Next nonce: ${nextNonce}`);

  const gasEstimated = await helloWorldContract.update.estimateGas(newMessage);
  log(`Estimated gas: ${gasEstimated}`);

  // Calculate gas limit.
  const gasEstimatedBig = Big(gasEstimated);
  const gasLimitMultiplier = 1.2;
  const gasLimitBig = gasEstimatedBig.times(gasLimitMultiplier).round(0, 0)
  let gasLimitStr = gasLimitBig.toFixed(0);
  log(`Calculated gas limit: ${gasLimitStr}`);

  let blockNumber2 = await provider.getBlockNumber();
  log(`Current block number: ${blockNumber2}`);

  let block = await provider.getBlock('latest');
  //log(block);
  let baseFeePerGas = block.baseFeePerGas;
  log(`Base fee per gas: ${baseFeePerGas}`);

  let feeData = await provider.getFeeData();
  log(feeData);

  let maxPriorityFeePerGasStr = ethers.parseUnits("2", "gwei");
  log(`Max priority fee per gas: ${maxPriorityFeePerGasStr}`);

  let maxFeePerGasStr = ethers.parseUnits("10", "gwei");
  log(`Max fee per gas: ${maxFeePerGasStr}`);

  console.log("Updating the message...");
  try {
    var tx = await helloWorldContract.update(newMessage, {
      gasLimit: gasLimitStr,
      maxPriorityFeePerGas: maxPriorityFeePerGasStr,
      maxFeePerGas: maxFeePerGasStr,
    });
  } catch (error) {
    let errorName = error.code; // e.g. UNKNOWN_ERROR
    let errorCode = error.error.code; // e.g. -32000
    let errorMessage = error.error.message;
    // Example errorMessage: Transaction maxFeePerGas (200000000) is too low for the next block, which has a baseFeePerGas of 264952691
    let errorStackTrace = error.stack;
    //console.error(errorStackTrace);
    console.log(error);
  }

  log(tx)

  const txReceipt = await tx.wait();

  if (txReceipt.status !== 1) {
    console.error(txReceipt);
    process.exit(1);
  }

  log(txReceipt)

  let {
    accessList, chainId, data, from,
    gasLimit, hash,
    maxFeePerGas, maxPriorityFeePerGas,
    nonce, signature, to, type, value,
  } = tx;
  let {
    blockNumber, blockHash, contractAddress: newContractAddress, index,
    logsBloom, gasUsed, cumulativeGasUsed, gasPrice: effectiveGasPrice, status,
  } = txReceipt;

  //log(tx)
  //log(txReceipt)

  log(`gasLimit: ${gasLimit}`);
  log(`maxPriorityFeePerGas: ${maxPriorityFeePerGas}`);
  log(`maxFeePerGas: ${maxFeePerGas}`);
  log(`gasUsed: ${gasUsed}`);
  log(`effectiveGasPrice: ${effectiveGasPrice}`);

  const txFeeWeiCalculated = gasUsed * effectiveGasPrice;
  log(`txFeeWeiCalculated: ${txFeeWeiCalculated}`);

  const txFeeWei = txReceipt.fee;
  log(`txFeeWei: ${txFeeWei}`);
  const txFeeEth = ethers.formatEther(txFeeWei);
  log(`txFeeEth: ${txFeeEth}`);

  const message2 = await helloWorldContract.message();
  console.log("The new message is: " + message2);
}


const getMethods = (obj) => {
  let properties = new Set()
  let currentObj = obj
  do {
    Object.getOwnPropertyNames(currentObj).map(item => properties.add(item))
  } while ((currentObj = Object.getPrototypeOf(currentObj)))
  return [...properties.keys()].filter(item => typeof obj[item] === 'function')
}
