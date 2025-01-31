// next.config.js
require('dotenv').config()

module.exports = {
  env: {
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
    NEXT_PUBLIC_APPWRITE_ENDPOINT: process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT,
    NEXT_PUBLIC_APPWRITE_PROJECT: process.env.NEXT_PUBLIC_APPWRITE_PROJECT,
    APPWRITE_DATABASE_ID: process.env.APPWRITE_DATABASE_ID,
    APPWRITE_USER_COLLECTION_ID: process.env.APPWRITE_USER_COLLECTION_ID,
    APPWRITE_BANK_COLLECTION_ID: process.env.APPWRITE_BANK_COLLECTION_ID,
    APPWRITE_TRANSACTION_COLLECTION_ID:
      process.env.APPWRITE_TRANSACTION_COLLECTION_ID,
    NEXT_APPWRITE_KEY: process.env.NEXT_APPWRITE_KEY,
    PLAID_CLIENT_ID: process.env.PLAID_CLIENT_ID,
    PLAID_SECRET: process.env.PLAID_SECRET,
    PLAID_ENV: process.env.PLAID_ENV,
    PLAID_PRODUCTS: process.env.PLAID_PRODUCTS,
    PLAID_COUNTRY_CODES: process.env.PLAID_COUNTRY_CODES,
    DWOLLA_KEY: process.env.DWOLLA_KEY,
    DWOLLA_SECRET: process.env.DWOLLA_SECRET,
    DWOLLA_BASE_URL: process.env.DWOLLA_BASE_URL,
    DWOLLA_ENV: process.env.DWOLLA_ENV
  }
}
