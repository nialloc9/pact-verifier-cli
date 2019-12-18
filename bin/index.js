#!/usr/bin/env node

const { runCLI } = require("jest-cli");

// Add any Jest configuration options here
const config = {
    projects: [__dirname],
    testRegex: "pact-provider.js"
};

// Run the Jest asynchronously
runCLI(config, [__dirname]);
