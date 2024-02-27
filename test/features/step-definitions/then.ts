import { Then } from "@wdio/cucumber-framework";
import * as chai from "chai";

Then(/^Invetory page should list (.*)$/, async function (noOfProducts) {
  if (!noOfProducts)
    throw Error(`Invalid product count provided: ${noOfProducts}`);

  let eleArr = await $$(`.inventory_item_name`);
  chai.expect(eleArr.length).to.equal(parseInt(noOfProducts)); // ===
  console.log(`>> eleArr: ${eleArr.length}`);

  await browser.pause(1000);
});

/**
 * Steps:
 * 1. Get price list
 * 2. Convert string to number
 * 3. Assert if any value is <=0
 */
Then(/^Validate all products have valid price$/, async function () {
  /** 1. Get price list */
  let eleArr = await $$(`.inventory_item_price`);
  let priceStrArr = [];
  for (let i = 0; i < eleArr.length; i++) {
    let priceStr = await eleArr[i].getText();
    priceStrArr.push(priceStr);
  }

  console.log(`>> Price with : ${priceStrArr}`);

  /** 2. Convert string to number */
  let priceNumArr = priceStrArr.map((ele) => +ele.replace("$", ""));
  console.log(`>> Price Number : ${priceNumArr}`);

  /** 3. Assert if any value is <=0 */
  let invalidPriceArr = priceNumArr.filter((ele) => ele <= 0);
  chai.expect(invalidPriceArr.length).to.equal(0);
});
