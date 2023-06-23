// Analyse the current gas fees on a network.

// Imports
const { program } = require("commander");
const { ethers } = require("ethers");
const Joi = require("joi");
const _ = require("lodash");

// Local imports
const { config } = require("#root/config.js");
const ethereum = require("#root/src/ethereum.js");

// Load environment variables
require("dotenv").config();
const {
  INFURA_API_KEY,
  LOCAL_HARDHAT_DEPLOYED_CONTRACT_ADDRESS,
  TESTNET_SEPOLIA_DEPLOYED_CONTRACT_ADDRESS,
} = process.env;

// Logging
let log = console.log;
let jj = (x) => JSON.stringify(x, null, 2);
let lj = (x) => log(jj(x));

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
contractFactoryHelloWorld = new ethers.ContractFactory(contract.abi, contract.bytecode, provider);
contractHelloWorld = new ethers.Contract(
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

  // Confirm connection
  //let blockNumber = await provider.getBlockNumber();
  //log(`Current block number: ${blockNumber}`);

  // Contract deployment
  const initialMessage = "Hello World!";
  const txRequest = await contractFactoryHelloWorld.getDeployTransaction(initialMessage);
  const estimatedFees = await ethereum.estimateFees({ config, provider, txRequest });
  log(`Contract deployment - estimated fees:`);
  lj(estimatedFees);

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
  log(`Contract method call: update - estimated fees:`);
  lj(estimatedFees2);

}
