const axios = require('axios');
require('dotenv').config();
const { API_BASE_URL } = require('../config/config');
/**
 * This function validates the API key by making a POST request to the Chainstack API.
 * @param {string} key - The API key to be validated.
 * @returns {Promise<Object>} - The response data from the Chainstack API.
 * @throws {Error} - Throws an error if the POST request fails.
 */
async function validateApiKey(key) {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/marketplace/applications/covalent/token/`,
      {},
      {
        headers: {
          'Authorization': `Bearer ${key}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error('An error occurred while validating the API key:', error);
    throw error;
  }
}

// Export the validation function
module.exports = {
  validateApiKey,
};
