// Package configuration values, stored in a class.

// Imports
const { ethers } = require("ethers");
const Joi = require("joi");

/* Notes:
- The main application or script will load the config, apply changes from cmdline arguments and environment variables if required, and pass it to the other modules or functions as an object.
- When we create a transaction, we find the current averagePriorityFeePerGas, and multiply it by averagePriorityFeeMultiplier to get our transaction-specific value for maxPriorityFeePerGas. However, we don't permit it to be greater than maxPriorityFeePerGasGwei.
*/

class Config {
  constructor() {
    // Note: maxFeePerTransactionUsd overrides the other fee limits.
    this.maxFeePerTransactionUsd = "5.00";
    this.maxFeePerGasGwei = "100";
    this.maxPriorityFeePerGasGwei = "2.0";
    this.gasLimitMultiplier = "1.0";
    this.averagePriorityFeeMultiplier = "1.5";
    this.eth_usd_price_url =
      "https://api.pro.coinbase.com/products/ETH-USD/ticker";
    this.networkLabelList = "local testnet mainnet".split(" ");
    this.mapNetworkLabelToNetwork = {
      local: "http://localhost:8545",
      testnet: "sepolia",
      mainnet: "mainnet",
    };
    this.logLevelList = "debug info warn error".split(" ");
    // DP = Decimal Places
    this.WEI_DP = 0;
    this.GWEI_DP = 9;
    this.ETH_DP = 18;
    this.USD_DP = 2;
    // Derive more values.
    this.maxFeePerGasWei = ethers.parseUnits(this.maxFeePerGasGwei, "gwei");
    this.maxPriorityFeePerGasWei = ethers.parseUnits(
      this.maxPriorityFeePerGasGwei,
      "gwei"
    );
    this.dummyAddress = "0x000000000000000000000000000000000000dEaD";
  }
}

async function validateConfig({ config }) {
  // For now, just confirm that it's an object.
  let schema = Joi.object().required();
  let result = schema.validate(config);
  if (result.error) {
    console.error(`config: ${config}`);
    throw new Error(`Invalid config: ${result.error}`);
  }
}

module.exports = {
  config: new Config(),
  validateConfig,
};
