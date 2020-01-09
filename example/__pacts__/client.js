const { ApolloClient } = require("apollo-client");
const { InMemoryCache } = require("apollo-cache-inmemory");
const { HttpLink } = require("apollo-link-http");
const nodeFetch = require("node-fetch");

const cache = new InMemoryCache({
    addTypename: false
});

const link = new HttpLink({
    uri: "http://localhost:5000",
    // this is due to differences in expected fetch (es6)
    // and node-fetch type declaration (fails only in build stage)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    fetch: nodeFetch
});

const apolloClient = new ApolloClient({
    cache,
    link,
    defaultOptions: {
        query: {
            fetchPolicy: "no-cache",
            errorPolicy: "all"
        }
    }
});

module.exports = {
    apolloClient
};
