#!/usr/bin/env node

const argv = require("minimist")(process.argv.slice(2));
const { onRunPactTests } = require("../lib/index");
const { addDefaults } = require("../lib/utils");

/**
 * @description maps errors to user friendly error
 * @param {*} error
 */
const mapError = error => {
    if (error.message.includes("Invalid URL")) {
        error.message = `applicationUrl and pactBrokerUrl must be valid URL's`;
    }

    return error;
};

/**
 * handles errors in async functions
 * @param promise
 * returns an array. first item is an error second is the result
 */
const errorHandler = promise => promise.then(data => [null, data]).catch(err => [mapError(err)]);

const main = async () => {
    const {
        contractName,
        contractVersion,
        contractTags,
        applicationUrl,
        pactBrokerUrl,
        pactBrokerToken,
        publishVerificationResult,
        logLevel
    } = argv;

    const config = {
        contractName,
        contractVersion,
        contractTags,
        applicationUrl,
        pactBrokerUrl,
        pactBrokerToken,
        publishVerificationResult,
        logLevel
    };

    const [error, data] = await errorHandler(onRunPactTests(addDefaults(config)));
    console.log([error, data]);
    if (error) {
        console.error(error);
        process.exit(1);
    }
};

main();
