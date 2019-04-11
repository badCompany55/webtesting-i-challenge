const { repair, succeed, fail } = require("./enhancer.js");
const faker = require("faker");
// test away!
//
// Items.
// Items have name, durability and enhancement.
// The item's enhancement it's a number from 0 to 20.
// The item's durability it's a number from 0 to 100.
//
// When enhancement succeeds
// The item's enhancement increases by 1.
// If the item enhancement level is 20, the enhancement level is not changed.
// The durability of the item is not changed.
//
// When enhancement fails
// If the item's enhancement is less than 15, the durability of the item is decreased by 5.
// If the item's enhancement is 15 or more, the durability of the item is decreased by 10.
// If the item's enhancement level is greater than 16, the enhancement level decreases by 1 (17 goes down to 16, 18 goes down to 17).

describe("enhancors", () => {
  describe("repair", () => {
    it("should accept an item object, return new item with durabilty == 100", () => {
      const zShield = {
        name: "shield",
        durability: 50,
        enhancement: 10
      };
      expect(repair(zShield)).toEqual({ ...zShield, durability: 100 });
    });
  });
  describe("succeed", () => {
    it("increase enhancement by 1, if enhancement == 20? no change, durability does not change", () => {
      const zShield = {
        name: "shield",
        durability: 50,
        enhancement: 10
      };
      expect(succeed(zShield)).toEqual({
        ...zShield,
        enhancement: zShield.enhancement + 1
      });
    });
  });
  describe("fail", () => {
    it("item enhancement < 15? durability decreases by 5, enhancement == 15 durability decreases by 10, enhancement > 15 durability decreases 10 and enhancement decreases by 1 ", () => {
      // const tShield = {
      //   name: "shield",
      //   durability: 4,
      //   enhancement: 10
      // };
      // const zShield = {
      //   name: "shield",
      //   durability: 50,
      //   enhancement: 10
      // };
      // const aShield = {
      //   name: "shield",
      //   durability: 50,
      //   enhancement: 15
      // };
      // const bShield = {
      //   name: "shield",
      //   durability: 50,
      //   enhancement: 16
      // };
      // const cShield = {
      //   name: "shield",
      //   durability: 50,
      //   enhancement: 17
      // };
      // const dShield = {
      //   name: "shield",
      //   durability: 9,
      //   enhancement: 17
      // };
      // expect(fail(zShield)).toEqual({
      //   ...zShield,
      //   durability: zShield.durability - 5
      // });
      // expect(fail(aShield)).toEqual({
      //   ...aShield,
      //   durability: aShield.durability - 10
      // });
      // expect(fail(bShield)).toEqual({
      //   ...bShield,
      //   durability: bShield.durability - 10,
      //   enhancement: bShield.enhancement - 1
      // });
      // expect(fail(cShield)).toEqual({
      //   ...cShield,
      //   durability: cShield.durability - 10,
      //   enhancement: cShield.enhancement - 1
      // });
      //
      let testData = [];
      for (let i = 0; i < 100; i++) {
        testData.push({
          name: faker.name.findName(),
          durability: faker.random.number({ min: 0, max: 100 }),
          enhancement: faker.random.number({ min: 0, max: 20 })
        });
      }
      testData.forEach(obj => {
        const { enhancement, durability } = obj;
        switch (true) {
          case enhancement < 15:
            durability > 4
              ? expect(fail(obj)).toEqual({
                  ...obj,
                  durability: obj.durability - 5
                })
              : expect(fail(obj)).toEqual({
                  ...obj,
                  durability: obj.durability - obj.durability
                });
            break;
          case enhancement === 15:
            durability > 9
              ? expect(fail(obj)).toEqual({
                  ...obj,
                  durability: obj.durability - 10
                })
              : expect(fail(obj)).toEqual({
                  ...obj,
                  durability: obj.durability - obj.durability
                });
            break;
          case enhancement > 15:
            durability > 9
              ? expect(fail(obj)).toEqual({
                  ...obj,
                  durability: obj.durability - 10,
                  enhancement: obj.enhancement - 1
                })
              : expect(fail(obj)).toEqual({
                  ...obj,
                  durability: obj.durability - obj.durability,
                  enhancement: obj.enhancement - 1
                });
            break;
        }
      });
    });
  });
});
