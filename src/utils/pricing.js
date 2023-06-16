const axios = require('axios');
const { COVALENT_BASE_URL } = require('../config/config');

module.exports = function(ChainstackApi) {
  ChainstackApi.prototype.getHistoricalTokenPrices = async function({ chainName, quoteCurrency="USD", contractAddress, from, to, pricesAtAsc=false }) {
    try {
      const validatedToken = await this.validateToken();

      const url = new URL(`${COVALENT_BASE_URL}/pricing/historical_by_addresses_v2/${chainName}/${quoteCurrency}/${contractAddress}/`);
      const params = { 
        from: from, 
        to: to, 
        'prices-at-asc': pricesAtAsc 
      };
      url.search = new URLSearchParams(params).toString();

      const response = await axios.get(url, {
        headers: {
          'Authorization': `Bearer ${validatedToken}`
        }
      });

      return response.data;
    } catch (error) {
      console.error('Error fetching historical token prices for contract address:', contractAddress, 'on chain:', chainName, 'Error:', error);
      throw new Error(`Failed to fetch historical token prices for contract address ${contractAddress} on chain ${chainName}: ${error.message}`);
    }
  }
}
