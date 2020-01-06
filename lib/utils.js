const {
    PACT_BROKER_CONTRACT_NAME,
    PACT_BROKER_TOKEN,
    PACT_BROKER_URL,
    PACT_BROKER_CONTRACT_VERSION = "latest",
    PACT_BROKER_APPLICATION_URL,
    NODE_ENV
} = process.env;

/**
 * @description returns value based on environment
 * @param {*} dev
 * @param {*} prod
 */
const devOrProd = (dev, prod) => (NODE_ENV === "prod" ? prod : dev);

const defaultValues = {
    contractName: PACT_BROKER_CONTRACT_NAME,
    contractVersion: PACT_BROKER_CONTRACT_VERSION,
    contractTags: devOrProd(["dev"], ["prod"]),
    applicationUrl: PACT_BROKER_APPLICATION_URL,
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
