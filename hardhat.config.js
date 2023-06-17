require('dotenv').config();
require("@nomicfoundation/hardhat-toolbox");


const { INFURA_API_URL, ETHERSCAN_API_KEY, PRIVATE_KEY } = process.env;


module.exports = {
  solidity: "0.7.3",
  defaultNetwork: "hardhat",
  networks: {
     hardhat: {},
     sepolia: {
        url: INFURA_API_URL,
        accounts: [PRIVATE_KEY]
     }
  },
  etherscan: {
    apiKey: ETHERSCAN_API_KEY
  },
}
