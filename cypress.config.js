const { defineConfig } = require("cypress");

module.exports = defineConfig({
  video: true,// pour générer une vidéo du test 
  reporter: 'cypress-mochawesome-reporter', // Pour gérer les rapports 

  e2e: {
    baseUrl: 'https://www.demoblaze.com/',
    setupNodeEvents(on, config) {
      // implement node event listeners here
      require('cypress-mochawesome-reporter/plugin')(on);
    },
  },
});

