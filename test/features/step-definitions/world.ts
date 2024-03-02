import { setWorldConstructor } from "@cucumber/cucumber";
// Seems this is NOT required anymore for newer versions
class CustomWorld {
    testid: string
    appid: string
    constructor() {
        this.appid = "",
        this.testid = ""
    }
}
setWorldConstructor(CustomWorld)
