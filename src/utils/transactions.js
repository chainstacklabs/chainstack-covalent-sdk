const axios = require('axios');
const { COVALENT_BASE_URL } = require('../config/config');

module.exports = function(ChainstackApi) {
  ChainstackApi.prototype.fetchRecentTransactions = async function({ chainName, walletAddress, currency, noLogs }) {
    try {
      const validatedToken = await this.validateToken();

      const url = new URL(`${COVALENT_BASE_URL}/${chainName}/address/${walletAddress}/transactions_v3/`);
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

  ChainstackApi.prototype.fetchContractDeploymentTransactions = async function({ chainName, walletAddress }) {
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
}
