// Imports
const { program } = require("commander");
const { ethers } = require("ethers");
const Joi = require("joi");
const _ = require("lodash");

// Local imports
const { config } = require("#root/config.js");
const ethereum = require("#root/src/ethereum.js");
const { createLogger } = require("#root/lib/logging.js");

// Load environment variables
require("dotenv").config();
const { INFURA_API_KEY } = process.env;

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
  );
program.parse();
const options = program.opts();
if (options.debug) log(options);
let { debug, logLevel, network: networkLabel } = options;

// Process and validate arguments

const logLevelSchema = Joi.string().valid(...config.logLevelList);
let logLevelResult = logLevelSchema.validate(logLevel);
if (logLevelResult.error) {
  var msg = `Invalid log level "${logLevel}". Valid options are: [${config.logLevelList.join(
    ", "
  )}]`;
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
  let msg = `Invalid network "${networkLabel}". Valid options are: [${config.networkLabelList.join(
    ", "
  )}]`;
  console.error(msg);
  process.exit(1);
}
const network = config.mapNetworkLabelToNetwork[networkLabel];

// Setup

let provider;

var msg;
if (networkLabel == "local") {
  msg = `Connecting to ${networkLabel} network at ${network}...`;
  provider = new ethers.JsonRpcProvider(network);
} else if (networkLabel == "testnet" || networkLabel == "mainnet") {
  x = networkLabel == "testnet" ? network + " " : "";
  msg = `Connecting to ${x}${networkLabel} network...`;
  provider = new ethers.InfuraProvider(network, INFURA_API_KEY);
}
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
  const fees = await ethereum.getGasPricesWithFiat({ config, logger, provider });
  console.log(fees);
}
