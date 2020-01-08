const { Verifier } = require("@pact-foundation/pact");
const { addDefaults } = require("./utils");

/**
 * @description maps options from user friendly to pact.io structure
 * @param {*} config
 */
const mapOptions = ({
    contractName,
    applicationUrl,
    pactBrokerUrl,
    pactBrokerToken,
    contractTags,
    publishVerificationResult,
    contractVersion,
    logLevel
}) => ({
    provider: contractName,
    providerBaseUrl: applicationUrl,
    pactBrokerUrl,
    pactBrokerToken,
    consumerVersionTag: contractTags,
    publishVerificationResult,
    providerVersion: contractVersion,
    logLevel
});

/**
 * @description checks required params
 * @param {[*]} params
 * @param {[string]} required
 */
const checkIfValid = (params, required) => {
    const invalid = required.find(o => params[o] === undefined || (!params[o] && params[o] !== 0));

    if (invalid) {
        return `${invalid} was not supplied`;
    }
};

/**
 * @description runs pact tests against server
 * @param {*} config
 */
const onRunPactTests = async (config = {}) => {
    const opts = addDefaults(config);

    const invalidOption = checkIfValid(opts, ["contractName", "pactBrokerUrl", "pactBrokerToken"]);

    if (invalidOption) {
        throw new Error(invalidOption);
    }
    console.log("=====OPTIONS=======");
    console.log(mapOptions(opts));
    console.log("=====OPTIONS=======");
    await new Verifier(mapOptions(opts)).verifyProvider();

    console.info(
        `${opts.contractName} pact verification completed against ${opts.applicationUrl} using ${opts.contractTags[0]} contracts...`
    );
};

module.exports = {
    onRunPactTests
};
