import "dotenv/config"

import algoliasearch from 'algoliasearch';

const client = algoliasearch(process.env.ALG_CLIENT_STRING, process.env.ALG_CLIENT_API_KEY);
const index = client.initIndex(process.env.ALG_INDEX);


export {index}