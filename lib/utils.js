const { PACT_BROKER_CONTRACT_NAME, PACT_BROKER_TOKEN, PACT_BROKER_URL, NODE_ENV } = process.env;

/**
 * @description returns value based on environment
 * @param {*} dev
 * @param {*} prod
 */
const devOrProd = (dev, prod) => (NODE_ENV === "prod" ? prod : dev);

const defaultValues = {
    contractName: PACT_BROKER_CONTRACT_NAME,
    contractVersion: "1.0.2",
    contractTags: devOrProd(["dev"], ["prod"]),
    applicationUrl: "http://localhost:4000",
    pactBrokerUrl: PACT_BROKER_URL,
    pactBrokerToken: PACT_BROKER_TOKEN,
    publishVerificationResult: true,
    contractName: undefined,
    logLevel: undefined
};

/**
 * @description adds default values to config
 * @param {*} config
 */
const addDefaults = config =>
    Object.keys(defaultValues).reduce((total, curr) => {
        if (config[curr]) {
            total[curr] = config[curr];
        }

        return total;
    }, defaultValues);

module.exports = {
    addDefaults
};
