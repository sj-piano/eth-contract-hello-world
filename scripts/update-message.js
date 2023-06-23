// Imports
const Ajv = require("ajv");
const Big = require("big.js");
const { program } = require("commander");
const { ethers } = require("ethers");
const fs = require("fs");
const Joi = require("joi");
const _ = require("lodash");

// Local imports
const { config } = require("#root/config.js");
const ethereum = require("#root/src/ethereum.js");

// Settings
const networkLabelList = "local testnet mainnet".split(" ");

// Load environment variables
require("dotenv").config();
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
  .option("-d, --debug", "log debug information")
  .option(
    "--network <network>",
    "specify the Ethereum network to connect to",
    "local"
  )
  .requiredOption(
    "--input-file-json <inputFileJson>",
    "Path to JSON file containing input data."
  );
program.parse();
const options = program.opts();
if (options.debug) log(options);
let { debug, network: networkLabel, inputFileJson } = options;

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

if (!fs.existsSync(inputFileJson)) {
  console.error(`File "${inputFileJson}" not found.`);
  process.exit(1);
}
const inputData = JSON.parse(fs.readFileSync(inputFileJson, "utf8"));

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

let provider, signer, contractHelloWorld;

let msg;
if (networkLabel == "local") {
  msg = `Connecting to ${networkLabel} network at ${network}...`;
  provider = new ethers.JsonRpcProvider(network);
  signer = new ethers.Wallet(LOCAL_HARDHAT_PRIVATE_KEY, provider);
  DEPLOYED_CONTRACT_ADDRESS = LOCAL_HARDHAT_DEPLOYED_CONTRACT_ADDRESS;
} else if (networkLabel == "testnet") {
  x = networkLabel == "testnet" ? network + " " : "";
  msg = `Connecting to ${x}${networkLabel} network...`;
  provider = new ethers.InfuraProvider(network, INFURA_API_KEY);
  signer = new ethers.Wallet(TESTNET_SEPOLIA_PRIVATE_KEY, provider);
  DEPLOYED_CONTRACT_ADDRESS = TESTNET_SEPOLIA_DEPLOYED_CONTRACT_ADDRESS;
} else if (networkLabel == "mainnet") {
  throw new Error("Not implemented yet");
}
contractHelloWorld = new ethers.Contract(
  DEPLOYED_CONTRACT_ADDRESS,
  contract.abi,
  signer
);
log(msg);

// Run main function

main({ newMessage })
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

// Functions

async function main({ newMessage }) {
  // Confirm connection
  let blockNumber = await provider.getBlockNumber();
  log(`Current block number: ${blockNumber}`);

  let address = contractHelloWorld.target;
  let check = await ethereum.contractFoundAt({ provider, address });
  if (!check) {
    console.error(`No contract found at address ${address}.`);
    process.exit(1);
  }
  log(`Contract found at address: ${address}`);

  // Interact with contract.
  await updateMessage({ newMessage });
}

async function updateMessage({ newMessage }) {
  //const message = await contractHelloWorld.message();
  //console.log("Message stored in HelloWorld contract: " + message);

  const txRequest = await contractHelloWorld.update.populateTransaction(newMessage);

  estimatedFees = await ethereum.estimateFees({ config, provider, txRequest });
  log(estimatedFees)
  const ethToUsd = estimatedFees.gasPrices.ethToUsd;
  //log(ethToUsd)

  console.log("Updating the message...");
  try {
    var tx = await contractHelloWorld.update(newMessage, {
      gasLimit: estimatedFees.selectedGasLimit,
      maxPriorityFeePerGas: estimatedFees.maxPriorityFeePerGasWei,
      maxFeePerGas: config.priorityFeePerGasLimitWei,
    });
  } catch (error) {
    console.error(error);
    let errorName = error.code; // e.g. UNKNOWN_ERROR
    let errorCode = error.error.code; // e.g. -32000
    let errorMessage = error.error.message;
    // Example errorMessage: Transaction maxFeePerGas (200000000) is too low for the next block, which has a baseFeePerGas of 264952691
    let errorStackTrace = error.stack;
    //console.error(errorStackTrace);
  }

  log(tx);

  const txReceipt = await tx.wait();

  if (txReceipt.status !== 1) {
    console.error(txReceipt);
    process.exit(1);
  }

  log(txReceipt);

  let {
    accessList,
    chainId,
    data,
    from,
    gasLimit,
    hash,
    maxFeePerGas,
    maxPriorityFeePerGas,
    nonce,
    signature,
    to,
    type,
    value,
  } = tx;
  let {
    blockNumber,
    blockHash,
    contractAddress: newContractAddress,
    index,
    logsBloom,
    gasUsed,
    cumulativeGasUsed,
    gasPrice: effectiveGasPrice,
    status,
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
  const txFeeEth = ethers.formatEther(txFeeWei).toString();
  log(`txFeeEth: ${txFeeEth}`);

  const txFeeUsd = (Big(ethToUsd).mul(Big(txFeeEth))).toFixed(config.USD_DP);
  log(`txFeeUsd: ${txFeeUsd}`);

  const message2 = await contractHelloWorld.message();
  console.log("The new message is: " + message2);
}
