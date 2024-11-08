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
      },
      {
        name: "Firefox",
        use: {
          ...devices["Desktop Firefox"],
          viewport: {
            width: 1920,
            height: 1080,
          },
        },
      },
      {
        name: "Safari",
        use: {
          ...devices["Desktop Safari"],
          viewport: {
            width: 1920,
            height: 1080,
          },
        },
      }
    ],


    testMatch: ["tests/playwrightactions.test.ts"],

    use: {
        baseURL: "https://automationintesting.online",
        headless: false,
        screenshot: "on",
        video: "on",   
    },
    
    fullyParallel: true,
    retries: 0,

    reporter: [
    ["dot"], 

     ["json", {
         outputFile: "jsonReports/jsonReport.json"
     }], 

    ["html", {
        open: "always"
    }]
]

};


export default config;