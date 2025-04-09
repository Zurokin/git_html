// __tests__/popover.test.js

const puppeteer = require("puppeteer");

jest.setTimeout(30000); // Увеличиваем таймаут до 30 секунд для всего теста

let browser;
let page;

beforeAll(async () => {
  try {
    // Запускаем браузер Puppeteer с флагом --no-sandbox
    browser = await puppeteer.launch({
      headless: true, // Безголовый режим
      args: ["--no-sandbox", "--disable-setuid-sandbox"], // Обход sandbox
    });

    if (!browser) {
      throw new Error("Не удалось запустить браузер");
    }

    page = await browser.newPage();

    // Переходим на страницу, которую тестируем
    await page.goto("http://localhost:9000", { waitUntil: "load" });
  } catch (error) {
    console.error("Ошибка при запуске браузера или страницы:", error);
  }
});

afterAll(async () => {
  // Закрываем браузер после выполнения тестов
  if (browser) {
    try {
      await browser.close();
    } catch (error) {
      console.error("Ошибка при закрытии браузера:", error);
    }
  }
});

it("should show popover on button click", async () => {
  // Проверяем, что кнопка существует
  await page.waitForSelector("button"); // Ждем, пока кнопка не появится
  const button = await page.$("button");
  expect(button).not.toBeNull();

  // Кликаем по кнопке
  await button.click();

  // Проверяем, что поповер появился
  await page.waitForSelector(".popover"); // Ждем, пока поповер не появится
  const popover = await page.$(".popover");
  expect(popover).not.toBeNull();
});
