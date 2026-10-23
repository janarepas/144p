import { chromium } from 'playwright';
export function launchBrowser() {
  const executablePath = process.env.CHROMIUM_EXECUTABLE_PATH;
  return chromium.launch(executablePath ? { executablePath } : {});
}
