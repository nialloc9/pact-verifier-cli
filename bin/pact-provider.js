#!/usr/bin/env node

const argv = require("minimist")(process.argv.slice(2));
const { onRunPactTests } = require("../lib/index");

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

onRunPactTests(config);
