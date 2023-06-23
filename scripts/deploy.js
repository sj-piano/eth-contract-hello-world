// Imports
const { program } = require("commander");
const { ethers } = require("ethers");
const Joi = require("joi");
const _ = require("lodash");

// Local imports
const { config } = require("#root/config.js");
const ethereum = require("#root/src/ethereum.js");

// Controls
const initialMessage = "Hello World!";

// Load environment variables
require("dotenv").config();
const {
  INFURA_API_KEY,
  LOCAL_HARDHAT_PRIVATE_KEY,
  LOCAL_HARDHAT_ADDRESS,
  TESTNET_SEPOLIA_PRIVATE_KEY,
  TESTNET_SEPOLIA_ADDRESS,
} = process.env;

// Logging
let log = console.log;

// Parse arguments
program
  .option("-d, --debug", "log debug information")
  .option(
    "--network <network>",
    "specify the Ethereum network to connect to",
    "local"
  )
program.parse();
const options = program.opts();
if (options.debug) log(options);
let { debug, network: networkLabel } = options;

// Process and validate arguments

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

const contract = require("../artifacts/contracts/HelloWorld.sol/HelloWorld.json");

let provider, signer, contractFactoryHelloWorld;

let msg;
if (networkLabel == "local") {
  msg = `Connecting to ${networkLabel} network at ${network}...`;
  provider = new ethers.JsonRpcProvider(network);
  signer = new ethers.Wallet(LOCAL_HARDHAT_PRIVATE_KEY, provider);
} else if (networkLabel == "testnet") {
  msg = `Connecting to ${networkLabel} ${network} network...`;
  provider = new ethers.InfuraProvider(network, INFURA_API_KEY);
  signer = new ethers.Wallet(TESTNET_SEPOLIA_PRIVATE_KEY, provider);
} else if (networkLabel == "mainnet") {
  throw new Error("Not implemented yet");
}
contractFactoryHelloWorld = new ethers.ContractFactory(contract.abi, contract.bytecode, signer);
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

  // Deploy contract
  const contractHelloWorld = await contractFactoryHelloWorld.deploy(initialMessage);
  await contractHelloWorld.waitForDeployment();
  const txDeployment = contractHelloWorld.deploymentTransaction();
  //log(txDeployment)
  const txReceipt = await txDeployment.wait();
  //log(txReceipt)
  let contractAddress = contractHelloWorld.target;
  log(`Contract deployed to address: ${contractAddress}`);
}
