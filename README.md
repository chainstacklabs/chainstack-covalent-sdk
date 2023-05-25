# Chainstack Covalent API SKD

 An SDK designed to streamline the process of developing using the inegration of Chainstack with Covalent APIs, enhancing the ease of use and efficiency.

## Quickstart

* Clone the repository
* Install dependencies
* Add a Chainstack API key to `.env.sample` and rename to `.env`
* Run `node index`

## Logic of the ChainstackAPI class in src/index.js


Dependencies: The code starts by importing necessary dependencies. axios is a popular library for making HTTP requests, and dotenv is a module that loads environment variables from a .env file into process.env.

Configuration: The COVALENT_BASE_URL is imported from a configuration file. This is the base URL for the Covalent API, which provides blockchain data.

Class Definition: The ChainstackApi class is defined with a constructor that takes an API key as an argument. This key is stored as an instance variable. The class also has a tokenCache object to store validated tokens.

Token Validation: The validateToken method checks if there's a cached token for the current API key that's less than an hour old. If there is, it returns that token. If not, it calls the validateApiKey function (imported from a validation utility module) to validate the API key and get a new token. The new token is then cached with the current timestamp and returned.

Fetching Transactions: The fetchTransactions method fetches transaction data for a given wallet on a specified blockchain. It constructs the URL for the request using the base URL, the chain name, and the wallet address. It also sets query parameters for the request. The method then sends a GET request to the constructed URL with the validated token in the Authorization header. If the request is successful, it returns the data from the response. If there's an error, it logs the error and throws a new Error with a descriptive message.

Export: Finally, the ChainstackApi class is exported as a module, so it can be imported and used in other parts of the application.