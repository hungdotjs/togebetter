/* eslint-disable import/prefer-default-export */
// for the default version
import algoliasearch from 'algoliasearch';

const client = algoliasearch('XF4PC6QNDW', '147cbc41f86aba505c64bb6072d89475');

const questionsIndex = client.initIndex('questions');

export { questionsIndex };
