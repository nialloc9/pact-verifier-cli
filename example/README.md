# pact-verifier-cli

<p align="center">
  <img src="/logo.png" width="200" title="Pact verifier logo">
</p>

An example of how to use the pact-verifier-cli.

## Usage

* Start the server i.e npm run start:test:server
* Run the verified contract against the server and notice the test fails i.e npm run contract:test
* Fix the regression from the contract by uncommenting the 2 lines in index.js
* Run the test again and notice it now passes i.e npm run contract:test

## Create contract

This generates the contract. As the contract has already been created so no need to do this. Just comment and uncomment the server code to demonstarte the regression from the verified contract.

    $ npm run pact:update

## Publish contract

This pushes the contract to the broker. Same as creating the contract. No need to do this.

    $ npm run pact:publish