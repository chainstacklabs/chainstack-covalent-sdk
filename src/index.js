const axios = require('axios');
require('dotenv').config();

// Import validation function
const {validateApiKey} = require('./utils/validation')

/**
 * ChainstackApi class provides methods to interact with the Chainstack API.
 * In this case it uses Axios to call the Covalent API.
 */
class ChainstackApi {
  /**
   * Constructor for the ChainstackApi class.
   * Initializes the JWT Token.
   */
  constructor() {
    this.apiKey = process.env.CHAINSTACK_API_KEY;
    this.slug = process.env.APP_SLUG;
  }

  /**
   * Validate the token.
   */
  async validateToken() {
    try {
      const response = await validateApiKey(this.slug, this.apiKey);
      console.log(response)
      return response.access_token

    } catch (error) {
      console.error('Error validating token:', error);
      throw error;
    }
  }

  /**
   * Fetch all transactions ever made by a wallet address on a given blockchain.
   * @param {string} chainName - The blockchain name (e.g. 'eth-mainnet').
   * @param {string} walletAddress - The wallet address to fetch transactions for.
   * @param {string} currency - The quote currency (e.g. 'USD').
   * @param {boolean} noLogs - Whether to exclude logs from the response.
   * @returns {Promise<Object>} - The transaction data.
   */
  async fetchTransactions(chainName, walletAddress, currency, noLogs) {
    try {
      const validatedToken = await validateApiKey()
      const response = await axios.get(`https://api.covalenthq.com/v1/${chainName}/address/${walletAddress}/transactions_v2/?quote-currency=${currency}&no-logs=${noLogs}`, {
        headers: {
          'Authorization': `Bearer ${validatedToken}`
        }
      });

      return response.data;
    } catch (error) {
      console.error('Error fetching transactions:', error);
      throw error;
    }
  }
}
