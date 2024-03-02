import { Given } from "@wdio/cucumber-framework";
import * as chai from "chai";
// import logger from "../../helper/logger.js"
// import allure from "@wdio/allure-reporter"
import reporter from "../../helper/reporter.js";
import sauseHomePage from "../../page-objects/sause.home.page.js"

// import reporter from "../../helper/reporter.js"
// import sauseHomePage from "../../page-objects/sause.home.page.js"
import constants from "../../../data/constants.json" assert { type: "json" };
import apiHelper from "../../helper/apiHelper.js"
import fs from "fs"

/**
 * Web Interactions
 */
Given(
  /^As (a|an) (.*) user I login to inventory web app$$/,
  async function (prefixTxt, userType, dataTable) {
    try {
      reporter.addStep(this.testid, "info", "Login sause demo");
      // logger.info(`${this.testid}: Started to login sause demo app...`)
      // allure.addStep(`${this.testid}: Started to login sause demo app...`)

      // Get the testid
      // console.log(`>> Given Test ID: ${this.testid}`);
      // console.log(`Test username: ${process.env.TEST_STD_USERNAME}`)
      let dt = dataTable.hashes();
      // console.log(`The type of dt: ${typeof dt}`) // object
      // console.log(`The type of dt: ${dt.constructor}`) // function
      // console.log(`The value of dt: ${JSON.stringify(dt)}`)
      // console.log(`The userType: ${userType}`)
      // console.log(`Test browser: ${JSON.stringify(browser)}`)
      /** 1. launch browser */
      // await browser.url("https://www.saucedemo.com");
      // @ts-ignore
      await browser.url(browser.options.sauseDemoURL);
      // console.log(`Test browser.options: ${JSON.stringify(browser.options)}`)
      // @ts-ignore
      // await browser.url(browser.config.sauseDemoURL);
      // await browser.setTimeout({ implicit: 15000, pageLoad: 10000 });
      // await browser.maximizeWindow()

      /** 2. login to inventory */
      // let userNameEle = await $(`//*[@id="user-name"]`)
      // let passwordEle = await $(`//*[@id="password"]`)
      // let loginBtnEle = await $(`//*[@id="login-button"]`)

      // await userNameEle.setValue("standard_user")
      // await passwordEle.setValue("secret_sauce")
      // await loginBtnEle.click()

      // await $(`#user-name`).setValue(dt[0].Username)
      // // await $(`#user-name`).setValue(process.env.TEST_STD_USERNAME)
      // await $(`#password`).setValue(process.env.TEST_STD_PASSWORD)
      // await $(`#login-button`).click()
      await sauseHomePage.loginToSauseApp(this.testid, process.env.TEST_STD_USERNAME, process.env.TEST_STD_PASSWORD)
    } catch (err) {
      // console.log(`Error in first login. Retrying...`)
      // await browser.refresh();
      // await browser.pause(2000);
      // await $(`#user-name`).setValue(process.env.TEST_STD_USERNAME)
      // await $(`#password`).setValue(process.env.TEST_STD_PASSWORD)
      // await $(`#login-button`).click()
      err.message = `${this.testid}: Failed at login step, ${err.message}`
      throw err
    }

    await browser.pause(2000);

    /** 2. login to another user */
    // await browser.reloadSession();
    // await browser.url("https://www.saucedemo.com");
    // await $(`#user-name`).setValue("problem_user")
    // await $(`#password`).setValue("secret_sauce")
    // await $(`#login-button`).click()
    // await browser.pause(2000);

    // await browser.back();
    // await browser.pause(2000);
    // await browser.forward();
    // await browser.pause(2000);
    // await browser.debug();

    // this.appid = "ABC123"
    // logger.info(`${this.testid}: login in successful...`)
    // allure.addStep(`${this.testid}: login in successful...`)
    reporter.addStep(this.testid, "debug", "Login is successful");
  } 
)

/**
 * Get list of users from reqres api
 * Sub-steps:
 * 1. Get payload data
 * 2. Make get call by using API helper
 * 3. Store results
 */
Given(/^Get list of (.*) from reqres.in$/, async function (endpointRef) {
  if (!endpointRef) throw Error(`Given endpoint ref: ${endpointRef} is not valid`)

  try {
      /** 1. Get payload data*/
      reporter.addStep(this.testid, "info", `Getting the payload data for endpoint: ${endpointRef}`)
      let endpoint = ""
      if (endpointRef.trim().toUpperCase() === "USERS") {
          endpoint = constants.REQRES.GET_USERS
      }
      if (!endpoint) throw Error(`Error getting endpoint:${endpoint} from the constants.json`)

      /** 2. Make get call by using API helper */
      let testid = this.testid
      let res
      await browser.call(async function () {
          // @ts-ignore
          res = await apiHelper.GET(testid, browser.options.reqresBaseURL, endpoint, "", constants.REQRES.QUERY_PARAM)
      })
      // @ts-ignore
      if (res.status !== 200) chai.expect.fail(`Failed getting users from :${browser.options.reqresBaseURL}/${endpoint}`)
      reporter.addStep(this.testid, "debug", `API response received, data: ${JSON.stringify(res.body)}`)

      /** 3.Store results*/
      let data = JSON.stringify(res.body, undefined, 4)
      let filename = `${process.cwd()}/data/api-res/reqresAPIUsers.json`
      fs.writeFileSync(filename, data)
      reporter.addStep(this.testid, "info", `API response from ${endpoint} stored in json file`)
  } catch (err) {
      err.message = `${this.testid}: Failed at getting API users from reqres, ${err.message}`
      throw err
  }
})
