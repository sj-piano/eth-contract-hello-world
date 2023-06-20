let _ = require("lodash");

let log = console.log;

async function main() {
  const HelloWorldFactory = await ethers.getContractFactory("HelloWorld");

  // Start deployment, returning a promise that resolves to a contract object
  const contractHelloWorld = await HelloWorldFactory.deploy("Hello World!");

  // Await deployment
  await contractHelloWorld.waitForDeployment();
  let txDeploy = await contractHelloWorld.deploymentTransaction();
  let contractAddress = contractHelloWorld.target;
  log(`Contract deployed to address: ${contractAddress}`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
