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
      throw new Error(`Failed to fetch recent transactions for wallet ${walletAddress} on chain ${chainName}: ${error.message}`);
    }
  }

  ChainstackApi.prototype.fetchContractDeploymentTransactions = async function({ chainName, walletAddress }) {
    try {
      const validatedToken = await this.validateToken();

      let url = `${COVALENT_BASE_URL}/${chainName}/address/${walletAddress}/transactions_v3/page/0/`;

      let contractDeploymentTransactions = [];

      while (url) {
        const response = await axios.get(url, {
          headers: {
            'Authorization': `Bearer ${validatedToken}`
          }
        });

        const transactions = response.data.data.items;
        const filteredTransactions = transactions.filter(tx => tx.to_address === null);
        contractDeploymentTransactions = contractDeploymentTransactions.concat(filteredTransactions);

        url = response.data.data.links.next;
      }

      return contractDeploymentTransactions;

    } catch (error) {
      console.error('Error fetching contract deployment transactions for wallet:', walletAddress, 'on chain:', chainName, 'Error:', error);
      throw new Error(`Failed to fetch contract deployment transactions for wallet ${walletAddress} on chain ${chainName}: ${error.message}`);
    }
}

ChainstackApi.prototype.getTransaction = async function({ chainName, txHash, quoteCurrency, noLogs, withDex, withNftSales, withLending }) {
  try {
    const validatedToken = await this.validateToken();

    const url = new URL(`${COVALENT_BASE_URL}/${chainName}/transaction_v2/${txHash}/`);
    const params = {
      'quote-currency': quoteCurrency,
      'no-logs': noLogs,
      'with-dex': withDex,
      'with-nft-sales': withNftSales,
      'with-lending': withLending
    };
    url.search = new URLSearchParams(params).toString();

    const response = await axios.get(url, {
      headers: {
        'Authorization': `Bearer ${validatedToken}`
      }
    });

    return response.data;
  } catch (error) {
    console.error('Error fetching transaction with hash:', txHash, 'on chain:', chainName, 'Error:', error);
    throw new Error(`Failed to fetch transaction with hash ${txHash} on chain ${chainName}: ${error.message}`);
  }
}

ChainstackApi.prototype.getTransactionSummaryForAddress = async function({ chainName, walletAddress }) {
  try {
    const validatedToken = await this.validateToken();

    const url = new URL(`${COVALENT_BASE_URL}/${chainName}/address/${walletAddress}/transactions_summary/`);

    const response = await axios.get(url, {
      headers: {
        'Authorization': `Bearer ${validatedToken}`
      }
    });

    return response.data;
  } catch (error) {
    console.error('Error fetching transaction summary for address:', walletAddress, 'on chain:', chainName, 'Error:', error);
    throw new Error(`Failed to fetch transaction summary for address ${walletAddress} on chain ${chainName}: ${error.message}`);
  }
}

ChainstackApi.prototype.getAllTransactionsInBlock = async function({ chainName, blockHeight, quoteCurrency, noLogs }) {
  try {
    const validatedToken = await this.validateToken();

    const url = new URL(`${COVALENT_BASE_URL}/${chainName}/block/${blockHeight}/transactions_v3/`);
    const params = { 
      'quote-currency': quoteCurrency, 
      'no-logs': noLogs 
    };
    url.search = new URLSearchParams(params).toString();

    const response = await axios.get(url, {
      headers: {
        'Authorization': `Bearer ${validatedToken}`
      }
    });

    return response.data;
  } catch (error) {
    console.error('Error fetching all transactions in block:', blockHeight, 'on chain:', chainName, 'Error:', error);
    throw new Error(`Failed to fetch all transactions in block ${blockHeight} on chain ${chainName}: ${error.message}`);
  }
}

ChainstackApi.prototype.getBulkTimeBucketTransactionsForAddress = async function({ chainName, walletAddress, timeBucket, quoteCurrency, noLogs }) {
  try {
    const validatedToken = await this.validateToken();

    const url = new URL(`${COVALENT_BASE_URL}/${chainName}/bulk/transactions/${walletAddress}/${timeBucket}/`);
    const params = { 
      'quote-currency': quoteCurrency, 
      'no-logs': noLogs 
    };
    url.search = new URLSearchParams(params).toString();

    const response = await axios.get(url, {
      headers: {
        'Authorization': `Bearer ${validatedToken}`
      }
    });

    return response.data;
  } catch (error) {
    console.error('Error fetching bulk time bucket transactions for address:', walletAddress, 'on chain:', chainName, 'Error:', error);
    throw new Error(`Failed to fetch bulk time bucket transactions for address ${walletAddress} on chain ${chainName}: ${error.message}`);
  }
 }
}  
