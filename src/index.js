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

module.exports = {
  ChainstackApi
}
