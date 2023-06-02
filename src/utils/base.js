const axios = require('axios');
const { COVALENT_BASE_URL } = require('../config/config');

module.exports = function(ChainstackApi) {
  ChainstackApi.prototype.fetchLogEvents = async function({ chainName, contractAddress, startingBlock, endingBlock }) {
    try {
      const validatedToken = await this.validateToken();

      const url = new URL(`${COVALENT_BASE_URL}/${chainName}/events/address/${contractAddress}/`);
      const params = { 'starting-block': startingBlock, 'ending-block': endingBlock };
      url.search = new URLSearchParams(params).toString();

      const response = await axios.get(url, {
        headers: {
          'Authorization': `Bearer ${validatedToken}`
        }
      });

      return response.data;
    } catch (error) {
      console.error('Error fetching log events for contract:', contractAddress, 'on chain:', chainName, 'Error:', error);
      throw new Error(`Failed to fetch log events for contract ${contractAddress} on chain ${chainName}: ${error.message}`);
    }
  }
}
