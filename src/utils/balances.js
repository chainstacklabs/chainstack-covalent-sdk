const axios = require('axios');
const { COVALENT_BASE_URL } = require('../config/config');

module.exports = function(ChainstackApi) {
  ChainstackApi.prototype.fetchTokenBalances = async function({ chainName, walletAddress, currency, nft, noNftFetch, noSpam }) {
    try {
      const validatedToken = await this.validateToken();

      const url = new URL(`${COVALENT_BASE_URL}/${chainName}/address/${walletAddress}/balances_v2/`);
      const params = { 'quote-currency': currency, nft, 'no-nft-fetch': noNftFetch, 'no-spam': noSpam };
      url.search = new URLSearchParams(params).toString();

      const response = await axios.get(url, {
        headers: {
          'Authorization': `Bearer ${validatedToken}`
        }
      });

      return response.data;
    } catch (error) {
      console.error('Error fetching token balances for wallet:', walletAddress, 'on chain:', chainName, 'Error:', error);
      throw new Error(`Failed to fetch token balances for wallet ${walletAddress} on chain ${chainName}: ${error.message}`);
    }
  }

  ChainstackApi.prototype.fetchHistoricalPortfolioValue = async function({ chainName, walletAddress, currency, days }) {
    try {
      const validatedToken = await this.validateToken();

      const url = new URL(`${COVALENT_BASE_URL}/${chainName}/address/${walletAddress}/portfolio_v2/`);
      const params = { 'quote-currency': currency, 'days': days };
      url.search = new URLSearchParams(params).toString();

      const response = await axios.get(url, {
        headers: {
          'Authorization': `Bearer ${validatedToken}`
        }
      });

      return response.data;
    } catch (error) {
      console.error('Error fetching historical portfolio value for wallet:', walletAddress, 'on chain:', chainName, 'Error:', error);
      throw new Error(`Failed to fetch historical portfolio value for wallet ${walletAddress} on chain ${chainName}: ${error.message}`);
    }
  }

ChainstackApi.prototype.fetchERC20TokenTransfers = async function({ chainName, walletAddress, currency, contractAddress, startingBlock, endingBlock }) {
  try {
    const validatedToken = await this.validateToken();

    const url = new URL(`${COVALENT_BASE_URL}/${chainName}/address/${walletAddress}/transfers_v2/`);
    const params = { 
      'quote-currency': currency, 
      'contract-address': contractAddress, 
      'starting-block': startingBlock, 
      'ending-block': endingBlock 
    };
    url.search = new URLSearchParams(params).toString();

    const response = await axios.get(url, {
      headers: {
        'Authorization': `Bearer ${validatedToken}`
      }
    });

    return response.data;
  } catch (error) {
    console.error('Error fetching ERC20 token transfers for wallet:', walletAddress, 'on chain:', chainName, 'Error:', error);
    throw new Error(`Failed to fetch ERC20 token transfers for wallet ${walletAddress} on chain ${chainName}: ${error.message}`);
  }
 }

ChainstackApi.prototype.fetchTokenHolders = async function({ chainName, tokenAddress, blockHeight, pageSize, pageNumber }) {
  try {
    const validatedToken = await this.validateToken();

    const url = new URL(`${COVALENT_BASE_URL}/${chainName}/tokens/${tokenAddress}/token_holders_v2/`);
    const params = { 
      'block-height': blockHeight, 
      'page-size': pageSize,
      'page-number': pageNumber 
    };
    url.search = new URLSearchParams(params).toString();

    const response = await axios.get(url, {
      headers: {
        'Authorization': `Bearer ${validatedToken}`
      }
    });

    return response.data;
  } catch (error) {
    console.error('Error fetching token holders for token:', tokenAddress, 'on chain:', chainName, 'Error:', error);
    throw new Error(`Failed to fetch token holders for token ${tokenAddress} on chain ${chainName}: ${error.message}`);
  }
 }
} 
