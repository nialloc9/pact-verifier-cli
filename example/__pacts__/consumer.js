/* istanbul ignore file */
const path = require("path");
const { Pact } = require("@pact-foundation/pact");

module.exports = new Pact({
    consumer: "ExampleConsumer",
    provider: "ExampleProvider",
    port: 5000,
    dir: path.resolve(__dirname, "."),
    log: path.resolve(__dirname, "..", "pact.log"),
    logLevel: "error"
});
