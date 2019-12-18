const { Verifier } = require("@pact-foundation/pact");

const { PACT_BROKER_CONTRACT_NAME, PACT_BROKER_TOKEN, PACT_BROKER_URL, NODE_ENV } = process.env;

/**
 * @description returns value based on environment
 * @param {*} dev
 * @param {*} prod
 */
const devOrProd = (dev, prod) => (NODE_ENV === "prod" ? prod : dev);

/**
 * @description runs pact tests against server
 * @param {*} config
 */
module.exports.onRunPactTests = ({
    contractName = PACT_BROKER_CONTRACT_NAME,
    contractVersion = "1.0.2",
    contractTags = devOrProd(["dev"], ["prod"]),
    applicationUrl = "http://localhost:4000",
    pactBrokerUrl = PACT_BROKER_URL,
    pactBrokerToken = PACT_BROKER_TOKEN,
    publishVerificationResult = true,
    logLevel
} = {}) => {
    describe("Pact Verification", () => {
        it("validates the contract provided by the consumer", async () => {
            const opts = {
                provider: contractName,
                providerBaseUrl: applicationUrl,
                pactBrokerUrl,
                pactBrokerToken,
                consumerVersionTag: contractTags,
                publishVerificationResult,
                providerVersion: contractVersion,
                logLevel
            };

            await new Verifier(opts).verifyProvider();

            console.info(
                `${contractName} pact verification completed against ${applicationUrl} using ${contractTags[0]} contracts...`
            );
        });
    });
};
