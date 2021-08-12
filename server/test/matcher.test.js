const Matcher = require("../app/matcher");
const Order = require("../app/order");

describe("Matcher", () => {
    let matcher;
    
    beforeEach(() => {
        matcher = new Matcher();
    });

    it("returns false if matchNewOrder is passed an invalid order object", () => {
        expect(matcher.validateOrder("badOrder")).toBe(false);
    });

    it("returns false if the order object has invalid action", () => {
        expect(matcher.validateOrder(new Order(1, 1, 1, "INVALID_ACTION"))).toBe(false);
    });

    it("returns true if the order object has valid SELL action", () => {
        expect(matcher.validateOrder(new Order(1, 1, 1, "SELL"))).toBe(true);
    });

    it("returns true if the order object has valid BUY action", () => {
        expect(matcher.validateOrder(new Order(1, 1, 1, "BUY"))).toBe(true);
    });
    
});