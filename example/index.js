const { ApolloServer, gql } = require("apollo-server");

const typeDefs = gql`
    type Book {
        title: String
        author: String
    }

    type Query {
        books: [Book]
    }
`;

// UNCOMMENT BELOW AND THE CONTRACT WILL PASS AS THE REGRESSION FROM VERIFIED CONTRACT HAS BEEN RECTIFIED
const books = [
    {
        title: "Harry Potter and the Chamber of Secrets"
        //   author: 'J.K. Rowling',
    },
    {
        title: "Jurassic Park"
        //   author: 'Michael Crichton',
    }
];

const resolvers = {
    Query: {
        books: () => books
    }
};

const server = new ApolloServer({
    typeDefs,
    resolvers,
    formatError: error => {
        console.log(error);
        return error;
    },
    formatResponse: response => {
        console.log(response);
        return response;
    }
});

server.listen().then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
});
