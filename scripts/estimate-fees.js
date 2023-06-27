// Imports
const { program } = require("commander");
const { ethers } = require("ethers");
const Joi = require("joi");
const _ = require("lodash");

// Local imports
const { config } = require("#root/config.js");
const ethereum = require("#root/src/ethereum.js");
const { createLogger } = require("#root/src/logging.js");

// Load environment variables
require("dotenv").config();
const {
  INFURA_API_KEY,
  LOCAL_HARDHAT_DEPLOYED_CONTRACT_ADDRESS,
  TESTNET_SEPOLIA_DEPLOYED_CONTRACT_ADDRESS,
} = process.env;

// Logging
const { logger, log, deb } = createLogger();

// Parse arguments
program
  .option("-d, --debug", "log debug information")
  .option("--log-level <logLevel>", "Specify log level.", "error")
  .option(
    "--network <network>",
    "specify the Ethereum network to connect to",
    "local"
  )
program.parse();
const options = program.opts();
if (options.debug) log(options);
let { debug, logLevel, network: networkLabel } = options;

// Process and validate arguments

const logLevelSchema = Joi.string().valid(...config.logLevelList);
let logLevelResult = logLevelSchema.validate(logLevel);
if (logLevelResult.error) {
  var msg = `Invalid log level "${logLevel}". Valid options are: [${config.logLevelList.join(", ")}]`;
  console.error(msg);
  process.exit(1);
}
if (debug) {
  logLevel = "debug";
}
logger.setLevel({ logLevel });

const networkLabelSchema = Joi.string().valid(...config.networkLabelList);
let networkLabelResult = networkLabelSchema.validate(networkLabel);
if (networkLabelResult.error) {
  var msg = `Invalid network "${networkLabel}". Valid options are: [${config.networkLabelList.join(
    ", "
  )}]`;
  console.error(msg);
  process.exit(1);
}
const network = config.mapNetworkLabelToNetwork[networkLabel];

// Setup

const contract = require("../artifacts/contracts/HelloWorld.sol/HelloWorld.json");

let provider, signer;

var msg;
if (networkLabel == "local") {
  msg = `Connecting to ${networkLabel} network at ${network}...`;
  provider = new ethers.JsonRpcProvider(network);
  DEPLOYED_CONTRACT_ADDRESS = LOCAL_HARDHAT_DEPLOYED_CONTRACT_ADDRESS;
} else if (networkLabel == "testnet" || networkLabel == "mainnet") {
  x = networkLabel == "testnet" ? network + " " : "";
  msg = `Connecting to ${x}${networkLabel} network...`;
  provider = new ethers.InfuraProvider(network, INFURA_API_KEY);
  DEPLOYED_CONTRACT_ADDRESS = TESTNET_SEPOLIA_DEPLOYED_CONTRACT_ADDRESS;
}
const contractFactoryHelloWorld = new ethers.ContractFactory(contract.abi, contract.bytecode, provider);
const contractHelloWorld = new ethers.Contract(
  DEPLOYED_CONTRACT_ADDRESS,
  contract.abi,
  signer
);
log(msg);

// Run main function

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

// Functions

async function main() {

  let blockNumber = await provider.getBlockNumber();
  deb(`Current block number: ${blockNumber}`);

  // Contract deployment
  const initialMessage = "Hello World!";
  const txRequest = await contractFactoryHelloWorld.getDeployTransaction(initialMessage);
  const estimatedFees = await ethereum.estimateFees({ config, provider, txRequest });
  console.log(`Contract deployment - estimated fees:`);
  log(estimatedFees);
  console.log(`- feeEth: ${estimatedFees.feeEth}`);
  console.log(`- feeUsd: ${estimatedFees.feeUsd}`);
  if (estimatedFees.feeLimitChecks.anyLimitExceeded) {
    for (let key of estimatedFees.feeLimitChecks.limitExceededKeys) {
      let check = estimatedFees.feeLimitChecks[key];
      console.log(`- ${key}: ${check.msg}`);
    }
  }

  // Check if contract exists at address
  let address = contractHelloWorld.target;
  let check = await ethereum.contractFoundAt({ provider, address });
  if (!check) {
    console.error(`No contract found at address ${address}.`);
    process.exit(1);
  }
  log(`Contract found at address: ${address}`);

  // Contract method call: update
  const newMessage = "Hello World! Updated.";
  const txRequest2 = await contractHelloWorld.update.populateTransaction(newMessage);
  const estimatedFees2 = await ethereum.estimateFees({ config, provider, txRequest: txRequest2 });
  console.log(`Contract method call: 'update' - estimated fees:`);
  log(estimatedFees2);
  console.log(`- feeEth: ${estimatedFees2.feeEth}`);
  console.log(`- feeUsd: ${estimatedFees2.feeUsd}`);
  if (estimatedFees2.feeLimitChecks.anyLimitExceeded) {
    for (let key of estimatedFees2.feeLimitChecks.limitExceededKeys) {
      let check = estimatedFees2.feeLimitChecks[key];
      console.log(`- ${key}: ${check.msg}`);
    }
  }

}
