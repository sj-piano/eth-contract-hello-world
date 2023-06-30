<a name="readme-top"></a>


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

- NodeJS (developed with `v18.16.0`)
- Task management: Taskfile.dev
- Ethereum library: `ethers`
- Local smart contract testing: Hardhat
- Decimal arithmetic: `big.js`
- Test assertion library: `chai`
- Javascript formatter: Prettier
- Key management: `.env` file
- Script CLI interface: `commander`
- Logging: `winston`
- Data validation: `joi`
- JSON validation: `ajv`

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- GETTING STARTED -->
## Getting Started





## Installation


Requirements:  
- NodeJS  
- NPM  
- Etherscan API key
- Infura API key


```bash

git clone git@github.com:sj-piano/eth-contract-hello-world-javascript.git

cd eth-contract-hello-world-javascript

```

For development (i.e. you want to be able to run the tests on a local node):  
`npm install --include=dev`

For production (i.e. you only need the contract itself, together with scripts for deploying and communicating with it on testnet or mainnet):  
`npm install`


Install Taskfile.dev  
https://taskfile.dev/installation


## Setup

Copy the file `.env.example` to `.env` and fill it in with the relevant values.


## Operation

Run `task --list` to see available commands. Shorter command: `task -l`

Run a task. Example: `task hello`


## Notes:

The local development node is Hardhat.


<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[license-shield]: https://img.shields.io/github/license/sj-piano/eth-contract-hello-world-javascript.svg?style=for-the-badge
[license-url]: https://github.com/sj-piano/eth-contract-hello-world-javascript/blob/main/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/LinkedIn-StJohn_Piano-blue.svg?style=for-the-badge&logo=linkedin
[linkedin-url]: https://linkedin.com/in/stjohnpiano
[tela-shield]: https://img.shields.io/badge/Tela-StJohn_Piano-blue?style=for-the-badge
[tela-url]: https://www.tela.app/magic/stjohn_piano/a852c8
