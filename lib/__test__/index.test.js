const { onRunPactTests } = require("../index");

describe("index test suite", () => {
    beforeAll(() => {
        process.env = {
            ...process.env,
            PACT_BROKER_CONTRACT_NAME: "PACT_BROKER_CONTRACT_NAME",
            PACT_BROKER_CONTRACT_VERSION: "PACT_BROKER_CONTRACT_VERSION",
            NODE_ENV: "dev",
            PACT_BROKER_APPLICATION_URL: "PACT_BROKER_APPLICATION_URL",
            PACT_BROKER_URL: "PACT_BROKER_URL",
            PACT_BROKER_TOKEN: "PACT_BROKER_TOKEN"
        };
    });

    it("should throw an error if contractName is undefined", async () => {
        process.env.PACT_BROKER_CONTRACT_NAME = undefined;

        await expect(onRunPactTests()).rejects.toThrow();
    });

    it("should throw an error if pactBrokerUrl is undefined", async () => {
        process.env.PACT_BROKER_CONTRACT_NAME = "test";
        process.env.PACT_BROKER_URL = undefined;

        await expect(onRunPactTests()).rejects.toThrow();
    });

    it("should throw an error if pactBrokerToken is undefined", async () => {
        process.env.PACT_BROKER_URL = "test";
        process.env.PACT_BROKER_TOKEN = undefined;

        await expect(onRunPactTests()).rejects.toThrow();
    });
});
