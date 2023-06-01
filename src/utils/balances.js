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
}
