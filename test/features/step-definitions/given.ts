import { Given } from "@wdio/cucumber-framework";
import * as chai from "chai";

/**
 * Web Interactions
 */
Given(/^Login to inventory web page$/, async function () {
    /** 1. launch browser */
    await browser.url("https://www.saucedemo.com");
    await browser.setTimeout({ implicit: 15000, pageLoad: 10000 });
    // await browser.maximizeWindow()

    /** 2. login to inventory */
    // let userNameEle = await $(`//*[@id="user-name"]`)
    // let passwordEle = await $(`//*[@id="password"]`)
    // let loginBtnEle = await $(`//*[@id="login-button"]`)

    // await userNameEle.setValue("standard_user")
    // await passwordEle.setValue("secret_sauce")
    // await loginBtnEle.click()

    try {
        await $(`#user-name`).setValue("standard_user")
        await $(`#password`).setValue("secret_sauce")
        await $(`#login-button`).click()
    } catch (err) {
        console.log(`Error in first login. Retrying...`)
        await browser.refresh();
        await browser.pause(2000);
        await $(`#user-name`).setValue("standard_user")
        await $(`#password`).setValue("secret_sauce")
        await $(`#login-button`).click()
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

  });