<img width="1200" alt="Labs" src="https://user-images.githubusercontent.com/99700157/213291931-5a822628-5b8a-4768-980d-65f324985d32.png">

<p>
 <h3 align="center">Chainstack is the leading suite of services connecting developers with Web3 infrastructure</h3>
</p>

<p align="center">
  <a target="_blank" href="https://chainstack.com/build-better-with-ethereum/"><img src="https://github.com/soos3d/blockchain-badges/blob/main/protocols_badges/Ethereum.svg" /></a>&nbsp;  
  <a target="_blank" href="https://chainstack.com/build-better-with-bnb-smart-chain/"><img src="https://github.com/soos3d/blockchain-badges/blob/main/protocols_badges/BNB.svg" /></a>&nbsp;
  <a target="_blank" href="https://chainstack.com/build-better-with-polygon/"><img src="https://github.com/soos3d/blockchain-badges/blob/main/protocols_badges/Polygon.svg" /></a>&nbsp;
  <a target="_blank" href="https://chainstack.com/build-better-with-avalanche/"><img src="https://github.com/soos3d/blockchain-badges/blob/main/protocols_badges/Avalanche.svg" /></a>&nbsp;
  <a target="_blank" href="https://chainstack.com/build-better-with-fantom/"><img src="https://github.com/soos3d/blockchain-badges/blob/main/protocols_badges/Fantom.svg" /></a>&nbsp;
</p>

<p align="center">
  • <a target="_blank" href="https://chainstack.com/">Homepage</a> •
  <a target="_blank" href="https://chainstack.com/protocols/">Supported protocols</a> •
  <a target="_blank" href="https://chainstack.com/blog/">Chainstack blog</a> •
  <a target="_blank" href="https://docs.chainstack.com/quickstart/">Chainstack docs</a> •
  <a target="_blank" href="https://docs.chainstack.com/quickstart/">Blockchain API reference</a> • <br>
  • <a target="_blank" href="https://console.chainstack.com/user/account/create">Start for free</a> •
</p>

# Chainstack Covalent API JavaScript SDK

 A JavaScript SDK designed to streamline the process of developing using the inegration of Chainstack with Covalent APIs, enhancing the ease of use and efficiency.

## Quickstart

* Install the [Chainstack-Covalent integration](https://docs.chainstack.com/docs/work-with-chainstack-marketplace#install-an-app) from your Chainstack console. 

* Get a [Chainstack API key](https://docs.chainstack.com/reference/platform-api-getting-started#create-api-key).

* In your project's directory, install the Chainstack SDK:

```sh
npm i chainstack-covalent-sdk
```

* In a new file, import the Chainstack SDK and use your Chainstack API key in the constructor:

```js
const {ChainstackApi} = require("chainstack-covalent-sdk")

const CHAINSTACK_API_KEY = 'YOUR_CHAINSTACK_API_KEY'
const chainstack = new ChainstackApi(CHAINSTACK_API_KEY);
```

* (Optional but recommended) — The Chainstack-Covalent SDK comes with the `dotenv` package included, so you can use a `.env` file to import the Chainstack API key:

    - Create a `.env` file with your Chainstack API key:

    ```env
    CHAINSTACK_API_KEY="YOUR_CHAINSTACK_API_KEY"
    ```

    - Import it in your project:

    ```js
    const {ChainstackApi} = require("chainstack-covalent-sdk")

    const CHAINSTACK_API_KEY = process.env.CHAINSTACK_API_KEY
    const chainstack = new ChainstackApi(CHAINSTACK_API_KEY);
    ```

## Usage

The Chainstack-Covalent SDK has many endpoints to get all sorts of data, from smart contract deployments to NFT data. Each endpoint takes an object as a parameter to configure the call to the Covalent API. 

### Fetch token balances

This endpoint fetches all the token balances from the specified address on the selected chain:

```js
const {ChainstackApi} = require("chainstack-covalent-sdk")

const CHAINSTACK_API_KEY = process.env.CHAINSTACK_API_KEY
const chainstack = new ChainstackApi(CHAINSTACK_API_KEY);

// Config parameters
const parameters = {
    chainName: 'eth-mainnet',
    walletAddress: '0xae2Fc483527B8EF99EB5D9B44875F005ba1FaE13',
    currency: 'USD',
    nft: true,
    noNftFetch: false,
    noSpam: true,
  };
  
  
  chainstack.fetchTokenBalances(parameters)
    .then(data => console.log(data))
    .catch(error => console.error(error));
```

#### Explain the parameter object

The parameters object allows for fine tuning of your request, here is the explanation about the configuration parameters for `fetchTokenBalances`:

1. **chainName** (string, required): This parameter represents the name of the blockchain network you're interested in. For example, 'eth-mainnet' for the Ethereum mainnet. Find a complete list on the [Covalent docs](https://www.covalenthq.com/docs/networks/).

    ```javascript
    const chainName = 'eth-mainnet';
    ```

2. **walletAddress** (string, required): This is the address of the wallet for which you want to fetch token balances. If you pass in an Ethereum Name Service (ENS) address or a RSK Name Service (RNS) address, it will be automatically resolved to the corresponding wallet address.

    ```javascript
    const walletAddress = '0xae2Fc483527B8EF99EB5D9B44875F005ba1FaE13';
    ```

3. **quote-currency** (string, optional): This is the currency in which you want the balances to be quoted, such as 'USD' for United States Dollars. If not provided, the balances may be returned in the native currency of the blockchain network.

    ```javascript
    const quoteCurrency = 'USD';
    ```

4. **nft** (boolean, optional): If set to `true`, Non-Fungible Tokens (NFTs) will be included in the response along with fungible tokens. If `false` or not provided, NFTs will not be included.

    ```javascript
    const nft = true;
    ```

5. **no-nft-fetch** (boolean, optional): If set to `true`, the response will only include NFTs that have been cached. This can make the response faster, as it avoids having to fetch data about NFTs from the blockchain. If `false` or not provided, all NFTs will be included, regardless of whether they are cached.

    ```javascript
    const noNftFetch = false;
    ```

6. **no-spam** (boolean, optional): If set to `true`, any tokens that are suspected to be spam will be excluded from the response. This currently supports 'eth-mainnet' and 'matic-mainnet'. If `false` or not provided, all tokens, including potential spam, will be included.

    ```javascript
    const noSpam = true;
    ```
    
Remember, this function returns a promise. Handle this promise appropriately in your code, either by using `.then()` and `.catch()` methods, or by using the `await` keyword inside an async function with a try-catch block.

## Work in progress

This tool and its documentation is work in progress, we will be adding a complete list of endpoints available soon.