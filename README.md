# pact-verifier-cli

<p align="center">
  <img src="/logo.png" width="200" title="Pact provider logo">
</p>

An abstraction over pact.io's provider tests to hide away any complexities with integrating pact into your pipeline. 

To help with the buy in from other teams and to get them to integrate contract testing it is important to make it as easy as possible. To do this pact-verifier-cli is a reusable abstraction over the provider tests to allow data sources to run just 1 command inside their pipeline to run against our consumer contracts in the broker. 

This allows us to update the contract versions without having the data source update their code. Instead we can just ask them to update their version of the contract variable passed in.

## Usage CLI
    $ npm i -g pact-verifier-cli

    $ pact-verifier --contractName=NameOfContract --pactBrokerUrl=https://MY_BROKER.pact.dius.com.au/ --pactBrokerToken=XXXX

When using the CLI values can be set as global variables but any value passed in on the command line will override this.

<details><summary>Config CLI Options</summary>

| Parameter                   | Required | Type             | Description                                                                                                                                                                                                                                      |
| --------------------------- | :------: | ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `applicationUrl`           |   false   | string           | Running API provider host endpoint. e.g --applicationUrl=XXXX                                                                                                                                                                                                 |
| `contractName`                  |   false   | string           | Name of the provider contract. Overrides global variable PACT_BROKER_CONTRACT_NAME. e.g --contractName=XXXX         
| `pactBrokerUrl`             |  false   | string           | URL of the Pact Broker to retrieve pacts from. Required if not using pactUrls. e.g --pactBrokerUrl=XXXX                                        
| `contractTags`                      |  false   | array of strings | Array of tags, used to filter pacts from the Broker. e.g --contractTags={"dev", "prod"}                                                                                                                                |
| `pactBrokerToken`           |  false   | string           | Bearer token for Pact Broker authentication. If using Pactflow, you likely need this option. e.g --pactBrokerToken=XXXX                                                                                                                                                   |
| `publishVerificationResult` |  false   | boolean          | Publish verification result to Broker --pactBrokerToken=true                                                                                                                                                                                                           | boolean |
| `contractVersion`           |  false   | string           | Provider version, required to publish verification results to a broker --contractVersion=XXXX  

</details>

## Usage Progmatically
    // my-pact-provider-tests.js
    const { onRunPactTests } = require("pact-verifier-cli");

    onRunPactTests();

    $ PACT_BROKER_CONTRACT_NAME=NameOfContract PACT_BROKER_TOKEN=XXXX PACT_BROKER_URL=https://MY_BROKER.pact.dius.com.au/ my-pact-provider-tests.js

The global variables are required.

### Config Progmatically

A config object can also be passed to the pact tests. Any values passed in here will override environment variables.

    // my-pact-provider-tests.js
    const { onRunPactTests } = require("pact-verifier-cli");
    
    const config = {};

    onRunPactTests(config);

<details><summary>Config Progmatically Options</summary>

| Parameter                   | Required | Type             | Description                                                                                                                                                                                                                                      |
| --------------------------- | :------: | ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `applicationUrl`           |   false   | string           | Running API provider host endpoint.                                                                                                                                                                                                    |
| `contractName`                  |   false   | string           | Name of the provider contract. Overrides global variable PACT_BROKER_CONTRACT_NAME.                 
| `pactBrokerUrl`             |  false   | string           | URL of the Pact Broker to retrieve pacts from. Required if not using pactUrls.                                                                                                                                                                   |
| `contractTags`                      |  false   | array of strings | Array of tags, used to filter pacts from the Broker.                                                                                                                               |
| `pactBrokerToken`           |  false   | string           | Bearer token for Pact Broker authentication. If using Pactflow, you likely need this option.                                                                                                                                                     |
| `publishVerificationResult` |  false   | boolean          | Publish verification result to Broker                                                                                                                                                                                                            | boolean |
| `contractVersion`           |  false   | string           | Provider version, required to publish verification results to a broker         

</details>