import { chromium, Browser, Page } from "playwright";
import * as fs from "fs";
import * as path from "path";
import { createObjectCsvWriter } from "csv-writer";

(async () => {
  const browser: Browser = await chromium.launch({ headless: false });
  const page: Page = await browser.newPage();

  await page.goto("https://helloworld.kurly.com/");

  const selectors = {
    postTitle: ".post-title",
    titleSummary: ".title-summary",
    postAuthor: ".post-autor",
    postDate: ".post-date",
  };

  const extractedData: { [key: string]: string | null }[] = [];

  const rows = await Promise.all(
    Object.values(selectors).map((selector) => page.$$(selector))
  );

  const maxLength = Math.max(...rows.map((r) => r.length));
  for (let i = 0; i < maxLength; i++) {
    const data: { [key: string]: string | null } = {};
    let index = 0;
    for (const key in selectors) {
      const elements = rows[index++];
      data[key] = elements[i]
        ? (await elements[i].textContent())?.trim() ?? null
        : null;
    }
    extractedData.push(data);
  }

  const csvWriter = createObjectCsvWriter({
    path: path.join(__dirname, "extracted_data.csv"),
    header: Object.keys(selectors).map((key) => ({ id: key, title: key })),
  });

  await csvWriter.writeRecords(extractedData);
  console.log("Data has been written to extracted_data.csv");

  await browser.close();
})();
