import { test } from "../playwright/fixtures/base.fixture";
import * as fs from "fs";
import { e2eStorageState } from "./utils/login";

const loginData = [{ file: e2eStorageState }];
for (const { file } of loginData) {
  const treshold = 600 * 1000;
  const minutes = treshold / 60000;
  const stats = fs.existsSync(file) ? fs.statSync(file) : null;
  //If storagestate exists and is created less than 10 minutes ago, then skip login
  if (stats && stats.mtimeMs > new Date().getTime() - treshold) {
    console.log(
      `GlobalSetup: Storage State time < than ${minutes} minutes, skiping Login`
    );
  } else {
    test("Login", async ({ loginPage }) => {
      await loginPage.loginGlobalSetup();
    });
  }
}
