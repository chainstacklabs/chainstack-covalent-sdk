const {ChainstackApi} = require('./src/index')
require('dotenv').config();

const CHAINSTACK_API_KEY = process.env.CHAINSTACK_API_KEY

/*
 * Usage example: This script demonstrates how to use the ChainstackApi class to fetch transactions from a specific address.
 * Two calls to the fetchTransactions method are made in succession. The execution time for each call is measured and logged.
 * The first call fetches a new JWT token, while the second call uses the token cached from the first call.
 * This demonstrates the efficiency gained from caching the JWT token, as the second call does not need to spend time fetching a new token.
 * Uncomment the console.log(transactionsData) line to see the API response.
 */

async function main() {
    try {
      // Create a new ChainstackApi object using a Chainstack API key
      const chainstack = new ChainstackApi(CHAINSTACK_API_KEY);
        
      // The different endpoint take a config object as a parameter
      const configObject = {
        chainName: 'eth-mainnet',
        walletAddress: 'jaredfromsubway.eth',
        currency: 'USD',
        noLogs: true
      }
  
      console.time('fisrtCall');
  
      const { data: transactionsData } = await chainstack.fetchTransactions(configObject);
  
      console.timeEnd('fisrtCall');
      
      console.time('secondCall');
  
      const { data: secondTransactionsData } = await chainstack.fetchTransactions(configObject);
  
      console.timeEnd('secondCall');
      //console.log(transactionsData);
    } catch (error) {
      console.error('Error:', error);
    }
  }
  
  
  main();