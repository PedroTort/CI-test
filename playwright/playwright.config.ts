import { PlaywrightTestConfig, devices } from '@playwright/test'


const config: PlaywrightTestConfig = {


    projects: [
      {
        name: "Chrome",
        use: {
          ...devices["Desktop Chrome"],
          viewport: {
            width: 1920,
            height: 1080,
          },
        },
      }
    ],


    testMatch: ["tests/example.test.ts"],
    use: {
        // baseURL: "https://automationintesting.online",
        headless: true,
        screenshot: "on",
        video: "on",   
    },
    
    fullyParallel: true,
    retries: 0,

    reporter: [
    ["dot"], 

    ['html', { outputFolder: 'playwright-report', open: 'never' }],
    ['json', { outputFolder: 'playwright-report', outputFile: 'report.json' }],
]

};


export default config;