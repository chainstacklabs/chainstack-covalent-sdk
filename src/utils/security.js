const axios = require('axios');
const { COVALENT_BASE_URL } = require('../config/config');

module.exports = function(ChainstackApi) {
  ChainstackApi.prototype.getTokenApprovalsForAddress = async function({ chainName, walletAddress }) {
    try {
      const validatedToken = await this.validateToken();

      const url = new URL(`${COVALENT_BASE_URL}/${chainName}/approvals/${walletAddress}/`);

      const response = await axios.get(url, {
        headers: {
          'Authorization': `Bearer ${validatedToken}`
        }
      });

      return response.data;
    } catch (error) {
      console.error('Error getting token approvals for address:', walletAddress, 'on chain:', chainName, 'Error:', error);
      throw new Error(`Failed to get token approvals for address ${walletAddress} on chain ${chainName}: ${error.message}`);
    }
  }
}
