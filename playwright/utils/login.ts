import { test } from "@playwright/test";

export const e2eStorageState = "playwright/auth/e2eStorageState.json";

export const resetStorageState = () => {
  test.use({ storageState: { cookies: [], origins: [] } });
};
