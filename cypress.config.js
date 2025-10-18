const { defineConfig } = require("cypress");

module.exports = defineConfig({
  retries:{
    openMode: 0,
    runMode: 2
  },
  pageLoadTimeout: 90000,
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    }
  },
});
