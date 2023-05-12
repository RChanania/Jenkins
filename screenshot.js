const { Builder, By, until } = require("selenium-webdriver");
const chrome = require('selenium-webdriver/chrome');
const fs = require('fs');
const http = require("http");
const options = new chrome.Options();
options.addArguments('start-maximized');

async function screenshot() {
    let driver = await new Builder().forBrowser('chrome').setChromeOptions(options).build();
    try{
        const url = 'http://10.131.83.24:5000/api/entity/fm/productdetails';
        await driver.get('http://10.131.83.24:5000/');
        const username = await driver.wait(until.elementLocated(By.id("username")), 10000);
        await driver.wait(until.elementIsVisible(username),1000);
        username.sendKeys("root");
        const password = await driver.wait(until.elementLocated(By.id("password")), 10000);
        await driver.wait(until.elementIsVisible(password),1000);
        password.sendKeys("panasonic123");
        const login = await driver.wait(until.elementLocated(By.id("submit")), 10000);
        await driver.wait(until.elementIsVisible(login),1000);
        login.click(); 
        // const config = await driver.wait(until.elementLocated(By.id("idConfigureMenu")), 10000);
        // await driver.wait(until.elementIsVisible(config),1000);
        // config.click();
        // await driver.sleep(5000);
        // const line = await driver.wait(until.elementLocated(By.id("idConfigureProductionLine")), 10000);
        // await driver.wait(until.elementIsVisible(line),1000);
        // line.click();
        // await driver.sleep(5000);
        // const restart = await driver.wait(until.elementLocated(By.id("idLineRestart")), 10000);
        // await driver.wait(until.elementIsVisible(restart),1000);
        // restart.click();
        // await driver.sleep(5000);
        // const yes = await driver.wait(until.elementLocated(By.xpath("//\*[@id='confirmationBox']/div[2]")), 10000);
        // await driver.wait(until.elementIsVisible(yes),1000);
        // yes.click();
        // await driver.sleep(30000);
        // await driver.get('http://10.131.83.24:5000/');
        // const openFactoryManager = await driver.wait(until.elementLocated(By.id("idFactoryManager")), 10000);
        // await driver.wait(until.elementIsVisible(openFactoryManager),1000);
        // openFactoryManager.click();
        // await driver.sleep(5000);
        // const monitor = await driver.wait(until.elementLocated(By.id("idMonitor")), 10000);
        // await driver.wait(until.elementIsVisible(monitor),1000);
        // monitor.click();
        // await driver.sleep(5000);
        // const menuFactoryManager = [ "idFMStatus", "idFMConfiguration", "idFMLogging", "idFMServiceStatus", "idFMElinkMap" ];
        // await driver.sleep(5000);
        let isServerRunning = false;
        while(isServerRunning == false) {
          await driver.sleep(30
            * 1000);
          try {
            // const url = await driver.getCurrentUrl();
            console.log('url to be requested: ' + url);
            // send an HTTP request to the website
            http.get(url, (res) => {
                // get the HTTP status code of the response
              const statusCode = res.statusCode;
              console.log('server response:' + res.statusCode);
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
    } catch(error) {
        console.log('An error occurred at the top level:', JSON.stringify(error));
        console.log(error.message);
        console.log(error.stack);
    }
}
screenshot()