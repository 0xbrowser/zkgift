import "@matterlabs/hardhat-zksync-deploy";
import "@matterlabs/hardhat-zksync-solc";
import "@matterlabs/hardhat-zksync-verify";

module.exports = {
    zksolc: {
        version: "1.3.5",
        compilerSource: "binary",
        settings: {
            "compilerPath": "your_file_path"
        },
    },
    defaultNetwork: "zkTestnet",
    networks: {
        goerli: {
            url: "https://goerli.infura.io/v3/<API_KEY>" // URL of the Ethereum Web3 RPC (optional)
          },
        zkTestnet: {
            url: "https://zksync2-testnet.zksync.dev", // URL of the zkSync network RPC
            ethNetwork: "goerli", // Can also be the RPC URL of the Ethereum network (e.g. `https://goerli.infura.io/v3/<API_KEY>`)
            zksync: true,
            // Verification endpoint for Goerli
            verifyURL: 'https://goerli.explorer.zksync.io/contracts/verify'
        },
        zkMainnet: {
            url: "https://zksync2-mainnet.zksync.io",
            ethNetwork: "mainnet",
            zksync: true
        }
    },
    etherscan: {
        apiKey: "API_KEY"
      },
    solidity: {
        version: "0.8.18",
    },
};