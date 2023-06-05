const axios = require('axios');
const { COVALENT_BASE_URL } = require('../config/config');

module.exports = function(ChainstackApi) {
  ChainstackApi.prototype.fetchNfts = async function({ chainName, walletAddress }) {
    try {
      const validatedToken = await this.validateToken();

      const url = new URL(`${COVALENT_BASE_URL}/${chainName}/address/${walletAddress}/balances_nft/`);

      const response = await axios.get(url, {
        headers: {
          'Authorization': `Bearer ${validatedToken}`
        }
      });

      return response.data;
    } catch (error) {
      console.error('Error fetching NFTs for wallet:', walletAddress, 'on chain:', chainName, 'Error:', error);
      throw new Error(`Failed to fetch NFTs for wallet ${walletAddress} on chain ${chainName}: ${error.message}`);
    }
  }

ChainstackApi.prototype.getNftsWithMetadata = async function({ chainName, contractAddress, noMetadata, pageSize, pageNumber, traitsFilter, valuesFilter }) {
    try {
      const validatedToken = await this.validateToken();

      const url = new URL(`${COVALENT_BASE_URL}/${chainName}/nft/${contractAddress}/metadata/`);
      const params = { 'no-metadata': noMetadata, 'page-size': pageSize, 'page-number': pageNumber, 'traits-filter': traitsFilter, 'values-filter': valuesFilter };
      url.search = new URLSearchParams(params).toString();

      const response = await axios.get(url, {
        headers: {
          'Authorization': `Bearer ${validatedToken}`
        }
      });

      return response.data;
    } catch (error) {
      console.error('Error fetching NFTs with metadata for contract:', contractAddress, 'on chain:', chainName, 'Error:', error);
      throw new Error(`Failed to fetch NFTs with metadata for contract ${contractAddress} on chain ${chainName}: ${error.message}`);
    }
  }

ChainstackApi.prototype.getSingleNftWithMetadata = async function({ chainName, contractAddress, tokenId, noMetadata }) {
    try {
      const validatedToken = await this.validateToken();

      const url = new URL(`${COVALENT_BASE_URL}/${chainName}/nft/${contractAddress}/metadata/${tokenId}/`);
      const params = { 'no-metadata': noMetadata };
      url.search = new URLSearchParams(params).toString();

      const response = await axios.get(url, {
        headers: {
          'Authorization': `Bearer ${validatedToken}`
        }
      });

      return response.data;
    } catch (error) {
      console.error('Error fetching single NFT with metadata for token:', tokenId, 'on contract:', contractAddress, 'on chain:', chainName, 'Error:', error);
      throw new Error(`Failed to fetch single NFT with metadata for token ${tokenId} on contract ${contractAddress} on chain ${chainName}: ${error.message}`);
    }
  }
  
ChainstackApi.prototype.getSingleNftWithExternalMetadata = async function({ chainName, contractAddress, tokenId }) {
    try {
      const validatedToken = await this.validateToken();

      const url = `${COVALENT_BASE_URL}/${chainName}/tokens/${contractAddress}/nft_metadata/${tokenId}/`;

      const response = await axios.get(url, {
        headers: {
          'Authorization': `Bearer ${validatedToken}`
        }
      });

      return response.data;
    } catch (error) {
      console.error('Error fetching single NFT with external metadata for token:', tokenId, 'on contract:', contractAddress, 'on chain:', chainName, 'Error:', error);
      throw new Error(`Failed to fetch single NFT with external metadata for token ${tokenId} on contract ${contractAddress} on chain ${chainName}: ${error.message}`);
    }
  }

ChainstackApi.prototype.getNftTransactionsForContract = async function({ chainName, contractAddress, tokenId, noSpam = false }) {
  try {
    const validatedToken = await this.validateToken();

    const url = new URL(`${COVALENT_BASE_URL}/${chainName}/tokens/${contractAddress}/nft_transactions/${tokenId}/`);

    const params = { 'no-spam': noSpam };
    url.search = new URLSearchParams(params).toString();

    const response = await axios.get(url, {
      headers: {
        'Authorization': `Bearer ${validatedToken}`
      }
    });

    return response.data;
  } catch (error) {
    console.error('Error fetching NFT transactions for token:', tokenId, 'on contract:', contractAddress, 'on chain:', chainName, 'Error:', error);
    throw new Error(`Failed to fetch NFT transactions for token ${tokenId} on contract ${contractAddress} on chain ${chainName}: ${error.message}`);
  }
}
  
ChainstackApi.prototype.getTraitsForCollection = async function({ chainName, collectionContract }) {
  try {
    const validatedToken = await this.validateToken();

    const url = new URL(`${COVALENT_BASE_URL}/${chainName}/nft/${collectionContract}/traits/`);

    const response = await axios.get(url, {
      headers: {
        'Authorization': `Bearer ${validatedToken}`
      }
    });

    return response.data;
  } catch (error) {
    console.error('Error fetching traits for collection:', collectionContract, 'on chain:', chainName, 'Error:', error);
    throw new Error(`Failed to fetch traits for collection ${collectionContract} on chain ${chainName}: ${error.message}`);
  }
}
  
ChainstackApi.prototype.getTraitSummaryForCollection = async function({ chainName, collectionContract }) {
  try {
    const validatedToken = await this.validateToken();

    const url = new URL(`${COVALENT_BASE_URL}/${chainName}/nft/${collectionContract}/traits_summary/`);

    const response = await axios.get(url, {
      headers: {
        'Authorization': `Bearer ${validatedToken}`
      }
    });

    return response.data;
  } catch (error) {
    console.error('Error fetching trait summary for collection:', collectionContract, 'on chain:', chainName, 'Error:', error);
    throw new Error(`Failed to fetch trait summary for collection ${collectionContract} on chain ${chainName}: ${error.message}`);
  }
}

ChainstackApi.prototype.getAttributesForCollectionTrait = async function({ chainName, collectionContract, trait }) {
  try {
    const validatedToken = await this.validateToken();

    const url = new URL(`${COVALENT_BASE_URL}/${chainName}/nft/${collectionContract}/traits/${trait}/attributes/`);

    const response = await axios.get(url, {
      headers: {
        'Authorization': `Bearer ${validatedToken}`
      }
    });

    return response.data;
  } catch (error) {
    console.error('Error fetching attributes for collection trait:', trait, 'on chain:', chainName, 'Error:', error);
    throw new Error(`Failed to fetch attributes for collection trait ${trait} on chain ${chainName}: ${error.message}`);
  }
}

ChainstackApi.prototype.getChainCollections = async function({ chainName, pageSize, pageNumber, noSpam = false }) {
  try {
    const validatedToken = await this.validateToken();

    const url = new URL(`${COVALENT_BASE_URL}/${chainName}/nft/collections/`);
    const params = { 
      'page-size': pageSize, 
      'page-number': pageNumber, 
      'no-spam': noSpam 
    };
    url.search = new URLSearchParams(params).toString();

    const response = await axios.get(url, {
      headers: {
        'Authorization': `Bearer ${validatedToken}`
      }
    });

    return response.data;
  } catch (error) {
    console.error('Error fetching chain collections on chain:', chainName, 'Error:', error);
    throw new Error(`Failed to fetch chain collections on chain ${chainName}: ${error.message}`);
  }
}
  
ChainstackApi.prototype.checkOwnershipInNftCollection = async function({ chainName, walletAddress, collectionContract }) {
  try {
    const validatedToken = await this.validateToken();

    const url = new URL(`${COVALENT_BASE_URL}/${chainName}/address/${walletAddress}/collection/${collectionContract}/`);

    const response = await axios.get(url, {
      headers: {
        'Authorization': `Bearer ${validatedToken}`
      }
    });

    return response.data;
  } catch (error) {
    console.error('Error checking ownership in NFT collection:', collectionContract, 'Error:', error);
    throw new Error(`Failed to check ownership in NFT collection ${collectionContract}: ${error.message}`);
  }
}

ChainstackApi.prototype.checkOwnershipInNftCollectionForSpecificToken = async function({ chainName, walletAddress, collectionContract, tokenId }) {
  try {
    const validatedToken = await this.validateToken();

    const url = new URL(`${COVALENT_BASE_URL}/${chainName}/address/${walletAddress}/collection/${collectionContract}/token/${tokenId}/`);

    const response = await axios.get(url, {
      headers: {
        'Authorization': `Bearer ${validatedToken}`
      }
    });

    return response.data;
  } catch (error) {
    console.error('Error checking ownership in NFT collection for specific token:', tokenId, 'Error:', error);
    throw new Error(`Failed to check ownership in NFT collection for specific token ${tokenId}: ${error.message}`);
  }
 }
}  
