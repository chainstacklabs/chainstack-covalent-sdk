const axios = require('axios');
require('dotenv').config();

async function validateApiKey(slug, key) {
  try {
    const response = await axios.post(`https://api.chainstack.com/v1/marketplace/applications/${slug}/token/`, {}, {
      headers: {
        'Authorization': `Bearer ${key}`
      }
    });

    return response.data;
  } catch (error) {
    console.error('Error sending POST request:', error);
    throw error;
  }
}

// Export the validation function
module.exports = {
    validateApiKey
}
