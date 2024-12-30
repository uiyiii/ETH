const SimpleStorage = artifacts.require("SimpleStorage");

contract("SimpleStorage", (accounts) => {
    let simpleStorageInstance;

    beforeEach(async () => {
        simpleStorageInstance = await SimpleStorage.deployed();
    });

    it("should store the value 89.", async () => {
        await simpleStorageInstance.set(89, { from: accounts[0] });
        const storedData = await simpleStorageInstance.get();
        assert.equal(storedData, 89, "The value 89 was not stored.");
    });
});