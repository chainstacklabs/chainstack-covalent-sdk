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
  
ChainstackApi.prototype.fetchBlock = async function({ chainName, blockHeight }) {
  try {
    const validatedToken = await this.validateToken();

    const url = new URL(`${COVALENT_BASE_URL}/${chainName}/block_v2/${blockHeight}/`);

    const response = await axios.get(url, {
      headers: {
        'Authorization': `Bearer ${validatedToken}`
      }
    });

    return response.data;
  } catch (error) {
    console.error('Error fetching block:', blockHeight, 'on chain:', chainName, 'Error:', error);
    throw new Error(`Failed to fetch block ${blockHeight} on chain ${chainName}: ${error.message}`);
  }
}
  
ChainstackApi.prototype.resolveAddress = async function({ chainName, walletAddress }) {
  try {
    const validatedToken = await this.validateToken();

    const url = new URL(`${COVALENT_BASE_URL}/${chainName}/address/${walletAddress}/resolve_address/`);

    const response = await axios.get(url, {
      headers: {
        'Authorization': `Bearer ${validatedToken}`
      }
    });

    return response.data;
  } catch (error) {
    console.error('Error resolving address:', walletAddress, 'on chain:', chainName, 'Error:', error);
    throw new Error(`Failed to resolve address ${walletAddress} on chain ${chainName}: ${error.message}`);
  }
}

ChainstackApi.prototype.getBlockHeights = async function({ chainName, startDate, endDate }) {
  try {
    const validatedToken = await this.validateToken();

    const url = new URL(`${COVALENT_BASE_URL}/${chainName}/block_v2/${startDate}/${endDate}/`);

    const response = await axios.get(url, {
      headers: {
        'Authorization': `Bearer ${validatedToken}`
      }
    });

    return response.data;
  } catch (error) {
    console.error('Error fetching block heights between', startDate, 'and', endDate, 'on chain:', chainName, 'Error:', error);
    throw new Error(`Failed to fetch block heights between ${startDate} and ${endDate} on chain ${chainName}: ${error.message}`);
  }
}

ChainstackApi.prototype.getLogs = async function({ chainName, startingBlock, endingBlock, address, topics, blockHash, skipDecode }) {
  try {
    const validatedToken = await this.validateToken();

    const url = new URL(`${COVALENT_BASE_URL}/${chainName}/events/`);
    const params = { 
      'starting-block': startingBlock, 
      'ending-block': endingBlock, 
      'address': address, 
      'topics': topics, 
      'block-hash': blockHash,
      'skip-decode': skipDecode
    };
    url.search = new URLSearchParams(params).toString();

    const response = await axios.get(url, {
      headers: {
        'Authorization': `Bearer ${validatedToken}`
      }
    });

    return response.data;
  } catch (error) {
    console.error('Error fetching logs on chain:', chainName, 'Error:', error);
    throw new Error(`Failed to fetch logs on chain ${chainName}: ${error.message}`);
  }
}

ChainstackApi.prototype.getLogsByTopicHash = async function({ chainName, topicHash, startingBlock, endingBlock, secondaryTopics }) {
    try {
      const validatedToken = await this.validateToken();

      const url = new URL(`${COVALENT_BASE_URL}/${chainName}/events/topics/${topicHash}/`);
      const params = { 
        'starting-block': startingBlock, 
        'ending-block': endingBlock, 
        'secondary-topics': secondaryTopics 
      };
      url.search = new URLSearchParams(params).toString();

      const response = await axios.get(url, {
        headers: {
          'Authorization': `Bearer ${validatedToken}`
        }
      });

      return response.data;
    } catch (error) {
      console.error('Error fetching log events by topic hash:', topicHash, 'on chain:', chainName, 'Error:', error);
      throw new Error(`Failed to fetch log events by topic hash ${topicHash} on chain ${chainName}: ${error.message}`);
    }
  }
  
ChainstackApi.prototype.getAllChains = async function() {
    try {
      const validatedToken = await this.validateToken();

      const url = new URL(`${COVALENT_BASE_URL}/chains/`);

      const response = await axios.get(url, {
        headers: {
          'Authorization': `Bearer ${validatedToken}`
        }
      });

      return response.data;
    } catch (error) {
      console.error('Error fetching all chains:', error);
      throw new Error(`Failed to fetch all chains: ${error.message}`);
    }
  }
  
ChainstackApi.prototype.getAllChainStatuses = async function() {
    try {
      const validatedToken = await this.validateToken();

      const url = new URL(`${COVALENT_BASE_URL}/chains/status/`);

      const response = await axios.get(url, {
        headers: {
          'Authorization': `Bearer ${validatedToken}`
        }
      });

      return response.data;
    } catch (error) {
      console.error('Error fetching all chain statuses:', error);
      throw new Error(`Failed to fetch all chain statuses: ${error.message}`);
    }
  }
} 
