import { ApolloClient, InMemoryCache } from '@apollo/client';

/* 
* Configuration for the Apollo Client used to interact with a GraphQL API.
* Sets up the API URL, cache, and enables development tools. 
*/

const API_URL = process.env.REACT_APP_GRAPHQL_API ?? "";

const client = new ApolloClient({
  uri: API_URL, 
  cache: new InMemoryCache(), // Cache implementation for query results
  connectToDevTools: true, // Enables Apollo DevTools for debugging
});

export default client;