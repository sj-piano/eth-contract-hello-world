/**
* @type import('hardhat/config').HardhatUserConfig
*/

require('dotenv').config();
require("@nomiclabs/hardhat-ethers");
require("@nomiclabs/hardhat-etherscan");

const { INFURA_API_URL, ETHERSCAN_API_KEY, PRIVATE_KEY } = process.env;

module.exports = {
  solidity: "0.7.3",
  defaultNetwork: "sepolia",
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
