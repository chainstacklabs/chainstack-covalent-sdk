const {ChainstackApi} = require('./src/index')

async function main() {
    try {
     
    
      // Define the settings
     const chainstack = new ChainstackApi();                              // create a new instance of the Chainstack API using the API key
     const chainName = 'eth-mainnet';                                     // define the blockchain network to fetch transactions from   
     const walletAddress = '0x48D46B9E4093ebED3E269454975A433EeA08d5eA';  // define the wallet address to query transactions from   
     const currency = 'USD';                                              // define the currency in which the values should be returned   
     const noLogs = true;                // define whether we need to include event logs with the response. true = no logs, false = logs
  
      const { data: transactionsData } = await chainstack.fetchTransactions(chainName, walletAddress, currency, noLogs);
      console.log(transactionsData);
  
    } catch (error) {
  
      console.error('Error:', error);
    }
  }
  
  main();