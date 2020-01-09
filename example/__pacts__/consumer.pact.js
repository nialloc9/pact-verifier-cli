require("graphql-import-node");
const { GraphQLInteraction, Matchers } = require("@pact-foundation/pact");
const { print } = require("graphql/language/printer");
const provider = require("./consumer");
const { apolloClient } = require("./client");
const query = require("./query.graphql");

const { term } = Matchers;

const generate = async () => {
    await provider.setup();

    const contentTypeJsonMatcher = term({
        matcher: "application\\/json",
        generate: "application/json"
    });

    const graphqlQuery = new GraphQLInteraction()
        .uponReceiving("an example request")
        .withRequest({
            path: "/",
            method: "POST"
        })
        .withOperation(null)
        .withVariables({})
        .withQuery(print(query))
        .willRespondWith({
            status: 200,
            headers: {
                "Content-Type": contentTypeJsonMatcher
            },
            body: {
                data: {
                    books: [
                        {
                            title: "Harry Potter and the Chamber of Secrets",
                            author: "J.K. Rowling"
                        },
                        {
                            title: "Jurassic Park",
                            author: "Michael Crichton"
                        }
                    ]
                }
            }
        });

    await provider.addInteraction(graphqlQuery);

    await apolloClient.query({ query });

    await provider.verify();
    await provider.finalize();
};

generate();
