#!/usr/bin/env node

const { onRunPactTests } = require("../lib/index");

const {
    contractName,
    contractVersion,
    applicationUrl,
    pactBrokerUrl,
    pactBrokerToken,
    publishVerificationResult,
    logLevel
} = process.env;

const config = {
    contractName,
    contractVersion,
    applicationUrl,
    pactBrokerUrl,
    pactBrokerToken,
    publishVerificationResult,
    logLevel
};

onRunPactTests(config);
