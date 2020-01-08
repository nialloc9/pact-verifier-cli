/**
 * @description returns value based on environment
 * @param {*} dev
 * @param {*} prod
 */
const devOrProd = (dev, prod) => {
    const { NODE_ENV } = process.env;
    return NODE_ENV === "prod" ? prod : dev;
};

/**
 * @description adds default values to config
 * @param {*} config
 */
const addDefaults = config => {
    const {
        PACT_BROKER_CONTRACT_NAME,
        PACT_BROKER_TOKEN,
        PACT_BROKER_URL,
        PACT_BROKER_CONTRACT_VERSION = "^1",
        PACT_BROKER_APPLICATION_URL
    } = process.env;

    const defaultValues = {
        contractName: PACT_BROKER_CONTRACT_NAME,
        contractVersion: PACT_BROKER_CONTRACT_VERSION,
        contractTags: devOrProd(["dev"], ["prod"]),
        applicationUrl: PACT_BROKER_APPLICATION_URL,
        pactBrokerUrl: PACT_BROKER_URL,
        pactBrokerToken: PACT_BROKER_TOKEN,
        publishVerificationResult: true,
        logLevel: undefined
    };

    return Object.keys(defaultValues).reduce(
        (total, curr) => {
            if (config[curr] || config[curr] === false) {
                total[curr] = config[curr];
            }

            return total;
        },
        { ...defaultValues }
    );
};

module.exports = {
    addDefaults
};
