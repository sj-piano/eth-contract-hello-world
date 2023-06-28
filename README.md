<a name="readme-top"></a>

<!-- PROJECT SHIELDS -->
<!--
*** We use markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->
[![AGPL V3 License][license-shield]][license-url]
[![LinkedIn][linkedin-shield]][linkedin-url]



<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/sj-piano/eth-contract-hello-world-javascript">
    <img src="images/glider_600x480.png" alt="Logo" width="240" height="300">
  </a>
  <h3 align="center">Ethereum (ETH) smart contract "Hello World" in Javascript</h3>

  <p align="center">
    A complete HelloWorld Ethereum smart contract package. Handles post-merge fees correctly. Includes a test suite that runs on local Hardhat blockchain instance. Can deploy to local instance, Sepolia testnet, and Ethereum mainnet.
    <br />
    <br />
    If you would like to: <br/>
    - ask a question <br/>
    - report a bug <br/>
    - request a feature <br/>
    - get a commercial software license <br/>
    <br/>
    Then <a href="www.tela.app/magic/stjohn_piano/a852c8">please contact me on Tela</a>. Thank you. <br/>
    <br/>
  </p>
</div>




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
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/stjohnpiano
