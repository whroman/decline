const { nativeOutput } = require('./tasks/checks/output.cjs');

module.exports = {
    require: ['babel-register'],
    spec: ['{generator,app,tables}/**/*.spec.js'],
    forbidOnly: true,
    reporter: 'allure-mocha',
    reporterOptions: {
        resultsDir: `${process.env.CHECKS_SUITE_DIR || nativeOutput('mocha')}/allure-results`,
        extraReporters: ['spec']
    }
};
