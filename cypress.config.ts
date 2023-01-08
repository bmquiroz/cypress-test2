import { defineConfig } from 'cypress'

export default defineConfig({
  projectId: "qw7cqy",
  fixturesFolder: false,
  e2e: {
    setupNodeEvents(on, config) {},
    baseUrl: 'http://localhost:8888',
  },

})
