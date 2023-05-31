const axios = require('axios');
require('dotenv').config();

const { COVALENT_BASE_URL } = require('../src/config/config');
const {validateApiKey} = require('./utils/validation')

class ChainstackApi {
  constructor(key) {
    this.apiKey = key;
    this.tokenCache = {};
  }

  async validateToken() {
  
    const cachedToken = this.tokenCache[this.apiKey];
    const oneHour = 55 * 60 * 1000; // in milliseconds
  
    if (cachedToken && (Date.now() - cachedToken.timestamp < oneHour)) {
      return cachedToken.token;
    }
  
    try {
      const response = await validateApiKey(this.apiKey);
      this.tokenCache[this.apiKey] = { token: response.access_token, timestamp: Date.now() };
      return response.access_token;
    } catch (error) {
      console.error('Error validating token:', error);
      throw new Error(`Failed to validate API key ${this.apiKey}: ${error.message}`);
    }
  }
  
  

  async fetchTransactions({ chainName, walletAddress, currency, noLogs }) {
    try {
      const validatedToken = await this.validateToken();
  
      const url = new URL(`${COVALENT_BASE_URL}/${chainName}/address/${walletAddress}/transactions_v2/`);
      const params = { 'quote-currency': currency, 'no-logs': noLogs };
      url.search = new URLSearchParams(params).toString();
  
      const response = await axios.get(url, {
        headers: {
          'Authorization': `Bearer ${validatedToken}`
        }
      });
  
      return response.data;
    } catch (error) {
      console.error('Error fetching transactions for wallet:', walletAddress, 'on chain:', chainName, 'Error:', error);
      throw new Error(`Failed to fetch transactions for wallet ${walletAddress} on chain ${chainName}: ${error.message}`);
    }
  }
}

  async fetchContractDeploymentTransactions({ chainName, walletAddress }) {
    try {
      const validatedToken = await this.validateToken();

      const url = new URL(`${COVALENT_BASE_URL}/${chainName}/address/${walletAddress}/transactions_v2/`);

      const response = await axios.get(url, {
        headers: {
          'Authorization': `Bearer ${validatedToken}`
        }
      });

      const transactions = response.data.data.items;

      const contractDeploymentTransactions = transactions.filter(tx => tx.to_address === null);

      return contractDeploymentTransactions;

    } catch (error) {
      console.error('Error fetching contract deployment transactions for wallet:', walletAddress, 'on chain:', chainName, 'Error:', error);
      throw new Error(`Failed to fetch contract deployment transactions for wallet ${walletAddress} on chain ${chainName}: ${error.message}`);
    }
  }

  async fetchTokenTransfers({ chainName, walletAddress }) {
    try {
      const validatedToken = await this.validateToken();

      const url = new URL(`${COVALENT_BASE_URL}/${chainName}/address/${walletAddress}/transfers_v2/`);

      const response = await axios.get(url, {
        headers: {
          'Authorization': `Bearer ${validatedToken}`
        }
      });

      return response.data;
    } catch (error) {
      console.error('Error fetching token transfers for wallet:', walletAddress, 'on chain:', chainName, 'Error:', error);
      throw new Error(`Failed to fetch token transfers for wallet ${walletAddress} on chain ${chainName}: ${error.message}`);
    }
  }

  async fetchLogEvents({ chainName, walletAddress, noLogs }) {
    try {
      const validatedToken = await this.validateToken();

      const url = new URL(`${COVALENT_BASE_URL}/${chainName}/address/${walletAddress}/events_v2/`);
      const params = { 'no-logs': noLogs };
      url.search = new URLSearchParams(params).toString();

      const response = await axios.get(url, {
        headers: {
          'Authorization': `Bearer ${validatedToken}`
        }
      });

      return response.data;
    } catch (error) {
      console.error('Error fetching log events for wallet:', walletAddress, 'on chain:', chainName, 'Error:', error);
      throw new Error(`Failed to fetch log events for wallet ${walletAddress} on chain ${chainName}: ${error.message}`);
    }
  }

  async fetchNfts({ chainName, walletAddress }) {
    try {
      const validatedToken = await this.validateToken();

      const url = new URL(`${COVALENT_BASE_URL}/${chainName}/address/${walletAddress}/nft_balances/`);

      const response = await axios.get(url, {
        headers: {
          'Authorization': `Bearer ${validatedToken}`
        }
      });

      return response.data;
    } catch (error) {
      console.error('Error fetching NFTs for wallet:', walletAddress, 'on chain:', chainName, 'Error:', error);
      throw new Error(`Failed to fetch NFTs for wallet ${walletAddress} on chain ${chainName}: ${error.message}`);
    }
  }

  async fetchHistoricalPortfolioValue({ chainName, walletAddress, currency }) {
    try {
      const validatedToken = await this.validateToken();

      const url = new URL(`${COVALENT_BASE_URL}/${chainName}/address/${walletAddress}/portfolio_v2/`);
      const params = { 'quote-currency': currency };
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


  async fetchTokenBalances({ chainName, walletAddress }) {
    try {
      const validatedToken = await this.validateToken();

      const url = new URL(`${COVALENT_BASE_URL}/${chainName}/address/${walletAddress}/balances_v2/`);

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




module.exports = {
  ChainstackApi
}
