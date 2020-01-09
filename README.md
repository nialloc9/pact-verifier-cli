# pact-verifier-cli

<p align="center">
  <img src="/logo.png" width="200" title="Pact verifier logo">
</p>

An abstraction over pact.io's provider tests to hide away any complexities with integrating pact into your pipeline. 

To help with getting 'buy in' from other teams and to get them to integrate contract testing it is important to make it as easy as possible. To do this pact-verifier-cli is a reusable abstraction over the provider tests to allow data sources to run just 1 command inside their pipeline to run against our consumer contracts in the broker. 

This allows us to update the contract versions without having the data source update their code. Instead we can just ask them to update their version of the contract variable passed in.

## Global Variables

The pact-verifier tool can be used with global variables to define required information. This is the most common use case but can also be used with cli arguements or progamatically as outlined below.

| Parameter                   | Required | Type             | Description                                                                                                                                                                                                                                      |
| --------------------------- | :------: | ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `PACT_BROKER_URL`           |   true   | string           | Running API provider host endpoint.                                                                                                                                                                                               |
| `PACT_BROKER_CONTRACT_NAME`                  |   false   | string           | Name of the provider contract. Pact.io equivelant is providerName.      
| `PACT_BROKER_TOKEN`             |  true   | string           | URL of the Pact Broker to retrieve pacts from. Required if not using pactUrls.
| `PACT_BROKER_CONTRACT_VERSION`                  |   false   | string           | Contract version. Defaults to ^1 and uses semver. Pact.io equivelant is providerVersion.        
| `PACT_BROKER_APPLICATION_URL`             |  true   | string           | URL of the Pact Broker to retrieve pacts from. Required if not using pactUrls. Pact.io equivelant is providerBaseUrl.           
| `NODE_ENV`                      |  false   | dev/prod | Will set contract tags to ["prod"] if prod or ["dev"] if environemnt variable is dev. If you use other tag names please use the cli arguments (or progmatical arguements) to override the global variables.                                                                                                        

## Usage CLI

Start your application and have it running.

    $ npm i -g pact-verifier-cli

    $ pact-verifier --contractName=NameOfContract --pactBrokerUrl=https://MY_BROKER.pact.dius.com.au/ --pactBrokerToken=XXXX

When using the CLI values can be set as global variables but any value passed in on the command line will override this.

<details><summary>Config CLI Options</summary>

| Parameter                   | Required | Type             | Description                                                                                                                                                                                                                                      |
| --------------------------- | :------: | ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `applicationUrl`           |   true   | string           | Running API provider host endpoint. Pact equivelant is providerBaseUrl. e.g --applicationUrl=XXXX                                                                                                                                                                                                 |
| `contractName`                  |   true   | string           | Name of the provider contract. Overrides global variable PACT_BROKER_CONTRACT_NAME. Pact.io equivelant is providerName. e.g --contractName=XXXX         
| `pactBrokerUrl`             |  true   | string           | URL of the Pact Broker to retrieve pacts from. Required if not using pactUrls. e.g --pactBrokerUrl=XXXX                                        
| `contractTags`                      |  false   | array of strings | Array of tags, used to filter pacts from the Broker. Pact.io equivelant is consumerVersionTag. e.g --contractTags={"dev", "prod"}                                                                                                                                |
| `pactBrokerToken`           |  true   | string           | Bearer token for Pact Broker authentication. If using Pactflow, you likely need this option. e.g --pactBrokerToken=XXXX                                                                                                                                                   |
| `publishVerificationResult` |  false   | boolean          | Publish verification result to Broker --pactBrokerToken=true                                                                                                                                                                                                           | boolean |
| `contractVersion`           |  false   | string           | Contract version, required to publish verification results to a broker. Pact.io equivelant is providerVersion. e.g --contractVersion=XXXX  

</details>

## Usage Progmatically

Start your application and have it running.

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
| `applicationUrl`           |   true   | string           | Running API provider host endpoint. Pact equivelant is providerBaseUrl.                                                                                                                                                                                                   |
| `contractName`                  |   true   | string           | Name of the provider contract. Overrides global variable PACT_BROKER_CONTRACT_NAME. Pact equivelant is providerName.                
| `pactBrokerUrl`             |  true   | string           | URL of the Pact Broker to retrieve pacts from. Required if not using pactUrls.                                                                                                                                                                   |
| `contractTags`                      |  false   | array of strings | Array of tags, used to filter pacts from the Broker. Pact equivelant is consumerVersionTag.                                                                                                                               |
| `pactBrokerToken`           |  true   | string           | Bearer token for Pact Broker authentication. If using Pactflow, you likely need this option.                                                                                                                                                     |
| `publishVerificationResult` |  false   | boolean          | Publish verification result to Broker                                                                                                                                                                                                            | boolean |
| `contractVersion`           |  false   | string           | Contract version, required to publish verification results to a broker. Pact.io equivelant is providerVersion.         

</details>