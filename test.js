const { Builder, By, until } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");
const { FileDetector } = require("selenium-webdriver/remote");
const fs = require("fs");
const http = require("http");

const options = new chrome.Options();
options.addArguments("start-maximized");

async function test() {
  let driver = await new Builder()
    .forBrowser("chrome")
    .setChromeOptions(options)
    .build();
  try {
    await driver.get("http://10.131.83.24:5000/");
    const username = await driver.wait(
      until.elementLocated(By.id("username")),
      10000
    );
    await driver.wait(until.elementIsVisible(username), 1000);
    username.sendKeys("root");
    const password = await driver.wait(
      until.elementLocated(By.id("password")),
      10000
    );
    await driver.wait(until.elementIsVisible(password), 1000);
    password.sendKeys("panasonic123");
    const login = await driver.wait(
      until.elementLocated(By.id("submit")),
      10000
    );
    await driver.wait(until.elementIsVisible(login), 1000);
    login.click();
    const openFactoryManager = await driver.wait(
      until.elementLocated(By.id("idFactoryManager")),
      10000
    );
    await driver.wait(until.elementIsVisible(openFactoryManager), 1000);
    openFactoryManager.click();
    await driver.sleep(5000);
    const lineStatus = await driver.wait(
      until.elementLocated(By.id("idFMStatus")),
      10000
    );
    await driver.wait(until.elementIsVisible(lineStatus), 1000);
    lineStatus.click();
    await driver.sleep(5000);
    const selectLine = await driver.wait(
      until.elementLocated(By.xpath("/\/*[@id='linesDivBody']/tr/td[2]")),
      10000
    );
    await driver.wait(until.elementIsVisible(selectLine), 2000);
    selectLine.click();
    await driver.sleep(2000);
    const filePath =
      "C:/Users/Chirag.Singh2/Desktop/Builds/10.16.3.0/PanaCIM10.16.3.0.B7526.iso";
    driver.setFileDetector(new FileDetector());
    const uploadFile = driver.wait(
      until.elementLocated(By.id("fileBrowser")),
      10000
    );
    await driver.sleep(2000);
    uploadFile.sendKeys(filePath);
    driver.wait(until.elementLocated(By.id("submit"))).click();
    const uploadButton = await driver.wait(
      until.elementLocated(By.className("btn action actionUpload")),
      10000
    );
    await driver.wait(until.elementIsVisible(uploadButton), 1000);
    uploadButton.click();
    await driver.sleep(5000);
    const yes = await driver.wait(
      until.elementLocated(By.xpath("/\/*[@id='confirmationBox']/div[2]")),
      10000
    );
    await driver.wait(until.elementIsVisible(yes), 1000);
    yes.click();
    const upgrade = await driver.wait(
      until.elementLocated(By.className("btn action actionUpgrade")),
      900000
    );
    await driver.wait(until.elementIsVisible(upgrade), 900000);
    upgrade.click();
    driver.sleep(5000);
    const xpressPassword = await driver.wait(
      until.elementLocated(By.id("password_input")),
      10000
    );
    await driver.wait(until.elementIsVisible(xpressPassword), 1000);
    xpressPassword.sendKeys("Xpress2#2021");
    const ok = await driver.wait(
      until.elementLocated(By.id("idConfirm")),
      10000
    );
    await driver.wait(until.elementIsVisible(ok), 1000);
    ok.click();
    console.log("upgrade start");
    await driver.sleep(10000);
    // await driver.sleep(960000);
    // await driver.sleep(480000);
    let isServerRunning = false;
    while(!isServerRunning) {
      await driver.sleep(60000);
      try {
        const url = await driver.getCurrentUrl();
        // send an HTTP request to the website
        http.get(url, (res) => {
          // get the HTTP status code of the response
          const statusCode = res.statusCode;

          // check if the status code is 200 (OK)
          if (statusCode === 200) {
            isServerRunning = true;  
            console.log("The website is responding.");
          }
        });
      } catch (ex) {
        console.log('error while getting server status: ' + JSON.stringify(ex));
      }
    }
    //const menu = ["idPlanMenu", "idConfigureMenu", "idPmdMenu", "idPAMenu", "idFactoryManager"];
    await driver.get("http://10.131.83.24:5000/");
    const menuPlan = ["idPlanProducts", "idCarriers"];
    const menuConfig = [
      "iduUserConfiguration",
      "idConfigureProductionLine",
      "idConfigureProductionLine",
      "idControlVerification",
      "idBarcodeParsing",
      "idSystem",
      "idElink",
      "idProductionPlanning",
      "idMachineState",
      "idProgramDataFiltering",
    ];
    const menuPMD = ["idPMDOperators", "idPMDEventMsg", "idPMDConfig"];
    const menuAnalysis = [
      "idReports",
      "idPA",
      "idLines",
      "idExpressionBuilder",
      "idChartBuilder",
      "idDashboardBuilder",
      "idDashboardViewer",
    ];
    const menuMonitor = ["idComponentStatus"];
    const menuFactoryManager = [
      "idFMStatus",
      "idFMConfiguration",
      "idFMLogging",
      "idFMServiceStatus",
      "idFMElinkMap",
    ];
    const factoryManager = await driver.wait(
      until.elementLocated(By.id("idFactoryManager")),
      10000
    );
    await driver.wait(until.elementIsVisible(factoryManager), 1000);
    factoryManager.click();
    await driver.sleep(5000);
    for (let i = 0; i < menuFactoryManager.length; i++) {
      let element = await driver.wait(
        until.elementLocated(By.id(menuFactoryManager[i])),
        10000
      );
      await driver.wait(until.elementIsVisible(element), 1000);
      element.click();
      await driver.sleep(5000);
      driver.takeScreenshot().then(function (data) {
        fs.writeFileSync(
          "Factory_Manager_Screen" + (i + 1) + ".png",
          data,
          "base64"
        );
      });
    }
    await driver.sleep(5000);
    const plan = await driver.wait(
      until.elementLocated(By.id("idPlanMenu")),
      10000
    );
    await driver.wait(until.elementIsVisible(plan), 1000);
    plan.click();
    await driver.sleep(5000);
    for (let i = 0; i < menuPlan.length; i++) {
      let element = await driver.wait(
        until.elementLocated(By.id(menuPlan[i])),
        10000
      );
      await driver.wait(until.elementIsVisible(element), 1000);
      element.click();
      await driver.sleep(5000);
      driver.takeScreenshot().then(function (data) {
        fs.writeFileSync("Plan_Screens" + (i + 1) + ".png", data, "base64");
      });
    }
    await driver.sleep(5000);
    const config = await driver.wait(
      until.elementLocated(By.id("idConfigureMenu")),
      10000
    );
    await driver.wait(until.elementIsVisible(config), 1000);
    config.click();
    await driver.sleep(5000);
    for (let i = 0; i < menuConfig.length; i++) {
      let element = await driver.wait(
        until.elementLocated(By.id(menuConfig[i])),
        10000
      );
      await driver.wait(until.elementIsVisible(element), 1000);
      element.click();
      await driver.sleep(5000);
      driver.takeScreenshot().then(function (data) {
        fs.writeFileSync(
          "Configure_Screens" + (i + 1) + ".png",
          data,
          "base64"
        );
      });
    }
    await driver.sleep(5000);
    const pmd = await driver.wait(
      until.elementLocated(By.id("idPmdMenu")),
      10000
    );
    await driver.wait(until.elementIsVisible(pmd), 1000);
    pmd.click();
    await driver.sleep(5000);
    for (let i = 0; i < menuPMD.length; i++) {
      let element = await driver.wait(
        until.elementLocated(By.id(menuPMD[i])),
        10000
      );
      await driver.wait(until.elementIsVisible(element), 1000);
      element.click();
      await driver.sleep(5000);
      driver.takeScreenshot().then(function (data) {
        fs.writeFileSync("PMD_Screens" + (i + 1) + ".png", data, "base64");
      });
    }
    await driver.sleep(5000);
    const analysis = await driver.wait(
      until.elementLocated(By.id("idPmdMenu")),
      10000
    );
    await driver.wait(until.elementIsVisible(analysis), 1000);
    analysis.click();
    await driver.sleep(5000);
    for (let i = 0; i < menuAnalysis.length; i++) {
      let element = await driver.wait(
        until.elementLocated(By.id(menuAnalysis[i])),
        10000
      );
      await driver.wait(until.elementIsVisible(element), 1000);
      element.click();
      await driver.sleep(5000);
      driver.takeScreenshot().then(function (data) {
        fs.writeFileSync("Analysis_Screens" + (i + 1) + ".png", data, "base64");
      });
    }
    await driver.sleep(5000);
    const monitor = await driver.wait(
      until.elementLocated(By.id("idPmdMenu")),
      10000
    );
    await driver.wait(until.elementIsVisible(monitor), 1000);
    monitor.click();
    await driver.sleep(5000);
    for (let i = 0; i < menuMonitor.length; i++) {
      let element = await driver.wait(
        until.elementLocated(By.id(menuMonitor[i])),
        10000
      );
      await driver.wait(until.elementIsVisible(element), 1000);
      element.click();
      await driver.sleep(5000);
      driver.takeScreenshot().then(function (data) {
        fs.writeFileSync("Monitor_Screens" + (i + 1) + ".png", data, "base64");
      });
    }
  } catch (error) {
    console.error("An error occurred:", JSON.stringify(error));
    console.log(error.message);
    console.log(error.stack);
  }
}
test();
