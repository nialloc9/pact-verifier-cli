const { addDefaults } = require("../utils");

describe("addDefaults test suite", () => {
    beforeEach(() => {
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

    const defaultValues = {
        applicationUrl: "PACT_BROKER_APPLICATION_URL",
        contractName: "PACT_BROKER_CONTRACT_NAME",
        contractTags: ["dev"],
        contractVersion: "PACT_BROKER_CONTRACT_VERSION",
        logLevel: undefined,
        pactBrokerToken: "PACT_BROKER_TOKEN",
        pactBrokerUrl: "PACT_BROKER_URL",
        publishVerificationResult: true
    };

    it("should provide default values", () => {
        expect(addDefaults({})).toEqual(defaultValues);
    });

    it("should override default values", () => {
        const newValues = {
            contractName: "test",
            contractVersion: "test",
            contractTags: ["test"],
            applicationUrl: "test",
            pactBrokerUrl: "test",
            pactBrokerToken: "test",
            publishVerificationResult: false,
            logLevel: "DEBUG"
        };

        expect(addDefaults(newValues)).toEqual(newValues);
    });

    it("should use prod tags", () => {
        process.env.NODE_ENV = "prod";

        expect(addDefaults({})).toEqual({ ...defaultValues, contractTags: ["prod"] });
    });
});
