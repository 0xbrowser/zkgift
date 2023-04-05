import { utils, Wallet } from "zksync-web3";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import { Deployer } from "@matterlabs/hardhat-zksync-deploy";

export default async function (hre: HardhatRuntimeEnvironment) {
  console.log(`Running deploy script for the Gift contract`);

  // 初始化钱包
  const wallet = new Wallet("PRIVATE_WALLET");

  // 创建 deployer 对象，并且从abi中初始化合约对象 artifact
  const deployer = new Deployer(hre, wallet);
  const artifact = await deployer.loadArtifact("Gift");

  // 部署合约
  const giftContract = await deployer.deploy(artifact, []);

  // 输出合约的相关信息
  const contractAddress = giftContract.address;
  console.log(`${artifact.contractName} was deployed to ${contractAddress}`);

}