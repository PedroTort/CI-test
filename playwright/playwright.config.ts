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
      headless: true,
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