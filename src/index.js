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
}

require('./operations/balances')(ChainstackApi);
require('./operations/nft')(ChainstackApi);
require('./operations/transactions')(ChainstackApi);
require('./operations/security')(ChainstackApi);
require('./operations/base')(ChainstackApi);

module.exports = {
  ChainstackApi
}
