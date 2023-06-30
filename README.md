<a name="readme-top"></a>


<script async defer src="https://buttons.github.io/buttons.js"></script>


<!-- PROJECT SHIELDS -->
<!--
*** We use markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->
[![Tela][tela-shield]][tela-url]
[![LinkedIn][linkedin-shield]][linkedin-url]
[![AGPL V3 License][license-shield]][license-url]




<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/sj-piano/eth-contract-hello-world-javascript">
    <img src="images/glider_600x480.png" alt="Logo" width="300" height="240">
  </a>
  <h3 align="center">Ethereum (ETH) smart contract "Hello World"</h3>
</div>




<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>




<!-- ABOUT THE PROJECT -->
## About The Project

**Description:**

A complete "Hello World" Ethereum smart contract package, written in Solidity and Javascript. It is a ready-to-use template for an Ethereum smart contract development project.

**Features:**
* Handles post-merge fees correctly
* Can estimate fees before any actual transactions are sent
* Includes a test suite that runs on local Hardhat blockchain instance
* Can deploy to local blockchain instance, Sepolia testnet, and Ethereum mainnet

**Licensing:**
* AGPL v3 software license
* Licensed for personal use
* Licensed for commercial use, if and only if all derivative source code is made public
* A private commercial software license is available for purchase - this removes the obligation for your company to publish any derived source code

**If you would like to:**
* ask a question
* report a bug
* request a feature
* get a private commercial software license

Then [please contact me on Tela](https://www.tela.app/magic/stjohn_piano/a852c8). Thank you.

[![Tela][tela-shield]][tela-url]

Please note: Github issues & pull requests will not be read unless you contact me about them in Tela.

If you would like to add me as a professional contact, you can [send me a connection request on LinkedIn](https://www.linkedin.com/in/stjohnpiano):

[![LinkedIn][linkedin-shield]][linkedin-url]



<p align="right">(<a href="#readme-top">back to top</a>)</p>


### Built With


**Platforms & languages:**
- [Ethereum](https://ethereum.org/en) & [Solidity](https://soliditylang.org)
- [NodeJS](https://nodejs.org/en) & [Javascript](https://developer.mozilla.org/en-US/docs/Web/JavaScript)

**Technologies & libraries:**
- Task management: [task](https://taskfile.dev/)
- NodeJS manager: [`nvm`](https://github.com/nvm-sh/nvm)
- Ethereum library: [`ethers`](https://docs.ethers.org/v6)
- Ethereum development environment: [Hardhat](https://hardhat.org)
- Decimal arithmetic: [`big.js`](https://mikemcl.github.io/big.js)
- Test assertion: [`chai`](https://www.chaijs.com)
- Javascript formatter: [Prettier](https://github.com/sheerun/prettier-standard)
- CLI interface: [`commander`](https://github.com/tj/commander.js)
- Logging: [`winston`](https://github.com/winstonjs/winston)
- Data validation: [`joi`](https://github.com/hapijs/joi)
- JSON validation: [`ajv`](https://ajv.js.org)

Private keys are managed in a `.env` file.

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- GETTING STARTED -->
## Getting Started

Follow these steps to get a local development instance up and running.


### Prerequisites

Please create accounts and API keys at:
* [Etherscan](https://etherscan.io)
* [Infura](https://www.infura.io)

Please install:

* task: [guide](https://taskfile.dev/installation)
* nvm (Node Version Manager): [guide](https://github.com/nvm-sh/nvm#install--update-script)
* npm & NodeJS: [nvm-based guide](https://github.com/nvm-sh/nvm#usage)
* Metamask wallet (browser extension): [metamask.io](https://metamask.io)

Tested under these operating systems:
* Ubuntu 20.04.6 LTS (Focal Fossa) (Running on WSL 2 on Windows 10)

Tested with these versions:
* task: 3.27.0
* nvm: 0.35.3
* npm: 9.5.1
* NodeJS: 18.16.0

Notes:
* Use `nvm` to install `npm` and NodeJS.
* The Etherscan API key is used if you want to upload your contract to Etherscan when using [Hardhat verify](https://hardhat.org/hardhat-runner/plugins/nomicfoundation-hardhat-verify).


### Installation

Clone the repo:

```sh
git clone https://github.com/sj-piano/eth-contract-hello-world-javascript
```

Install NPM packages:

```sh
cd eth-contract-hello-world-javascript && npm install
```

Copy the file `.env.example` to `.env` and fill it in with the relevant values.

Notes:

* When you run a local hardhat node, it will have some built-in private keys and addresses that hold some test Ethereum. In `.env.example`, the `LOCAL_HARDHAT_PRIVATE_KEY` and `LOCAL_HARDHAT_ADDRESS` values hold the first of these keypairs.

You'll need some SepoliaETH for using the Sepolia Testnet. In your Metamask wallet, create a dedicated "Test" account. Switch to "Sepolia test network". Copy the address.

Go to a Sepolia testnet faucet (e.g. this [PoW faucet](https://sepolia-faucet.pk910.de)) and get some SepoliaETH. Set the destination address to be your Metamask test address.

You'll need a Sepolia test network private key & address.


<p align="right">(<a href="#readme-top">back to top</a>)</p>




## Usage

Run `task --list` to see available commands. Shorter command: `task -l`

Run a task. Example: `task hello`


<p align="right">(<a href="#readme-top">back to top</a>)</p>




## Roadmap

The project is complete. No future features or fixes are planned.


<p align="right">(<a href="#readme-top">back to top</a>)</p>




<!-- CONTRIBUTING -->
## Contributing


If you have enjoyed this project or found it helpful, please give it a star:

<a class="github-button" href="https://github.com/sj-piano/eth-contract-hello-world-javascript" data-icon="octicon-star" aria-label="Star sj-piano/eth-contract-hello-world-javascript on GitHub">Star</a>


If you would like to suggest a change to this README or to the code, [please contact me on Tela](https://www.tela.app/magic/stjohn_piano/a852c8).

[![Tela][tela-shield]][tela-url]





## Acknowledgments

* Choose an Open Source License: [choosealicense.com](https://choosealicense.com)

* Badges: [shields.io](https://shields.io)

* How Hardhat runs a local Ethereum blockchain for testing and development: [Hardhat Network](https://hardhat.org/hardhat-network/docs/overview)

* README template by Othneil Drew: [Best-README-Template](https://github.com/othneildrew/Best-README-Template)

* Sepolia testnet PoW faucet: https://sepolia-faucet.pk910.de

* Github buttons: https://buttons.github.io


<p align="right">(<a href="#readme-top">back to top</a>)</p>




<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[license-shield]: https://img.shields.io/github/license/sj-piano/eth-contract-hello-world-javascript.svg?style=for-the-badge
[license-url]: https://github.com/sj-piano/eth-contract-hello-world-javascript/blob/main/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/LinkedIn-StJohn_Piano-blue.svg?style=for-the-badge&logo=linkedin
[linkedin-url]: https://linkedin.com/in/stjohnpiano
[tela-shield]: https://img.shields.io/badge/Tela-StJohn_Piano-blue?style=for-the-badge
[tela-url]: https://www.tela.app/magic/stjohn_piano/a852c8
