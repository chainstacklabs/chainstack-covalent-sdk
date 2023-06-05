const { ChainstackApi } = require('./src/index');

const CHAINSTACK_API_KEY = process.env.CHAINSTACK_API_KEY
const chainstack = new ChainstackApi(CHAINSTACK_API_KEY);

const commonConfig = {
  chainName: 'eth-mainnet',
  walletAddress: '0x45794810982d2024901a0972ee101ACfBc018E0B',
};

const fetchTokenBalancesConfig = {
  ...commonConfig,
  currency: 'USD',
  nft: true,
  noNftFetch: false,
  noSpam: true,
};

const fetchTransactionsConfig = {
  ...commonConfig,
  currency: 'USD',
  noLogs: true,
};

const getAllTransactionsInBlockConfig = {
  ...commonConfig,
  blockHeight: 100,
  quoteCurrency: 'USD',
  noLogs: true,
};

const getBulkTimeBucketTransactionsConfig = {
  ...commonConfig,
  timeBucket: 100,
  quoteCurrency: 'USD',
  noLogs: true,
};

const functionsConfigMap = {
  fetchTokenBalances: fetchTokenBalancesConfig,
  fetchNfts: commonConfig,
  getTokenApprovalsForAddress: commonConfig,
  fetchTransactions: fetchTransactionsConfig,
  getTransactionSummaryForAddress: commonConfig,
  getAllTransactionsInBlock: getAllTransactionsInBlockConfig,
  getBulkTimeBucketTransactionsForAddress: getBulkTimeBucketTransactionsConfig,
};

async function main() {
  async function executeChainstackFunction(functionName, config) {
    console.time(`${functionName} execution time`);
  
    try {
      const data = await chainstack[functionName](config);
      console.log(`Done with ${functionName}`);
      // console.log(`${functionName} data:`, JSON.stringify(data, null, 2));
    } catch (error) {
      console.error(`Failed to execute ${functionName}:`, error);
    } finally {
      console.timeEnd(`${functionName} execution time`);
    }
  }
  
  // Execute all functions sequentially
  for (const [functionName, config] of Object.entries(functionsConfigMap)) {
    await executeChainstackFunction(functionName, config);
  }
}


main()