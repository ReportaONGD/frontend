// Karma configuration file, see link for more information
// https://karma-runner.github.io/1.0/config/configuration-file.html

module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine', '@angular/cli'],
    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-jasmine-html-reporter'),
      require('karma-coverage-istanbul-reporter'),
      require('@angular/cli/plugins/karma'),
      require('karma-junit-reporter')
    ],
    client:{
      clearContext: false // leave Jasmine Spec Runner output visible in browser
    },
    coverageIstanbulReporter: {
      reports: [ 'html', 'lcovonly', 'cobertura', 'text-summary' ],
      'report-config': {
        cobertura: {
          file: 'cobertura.xml'
        }
      },
      fixWebpackSourcePaths: true
    },
    angularCli: {
      environment: 'dev'
    },
    // reporters: ['progress', 'kjhtml', 'dots', 'junit'],
    reporters: config.angularCli && config.angularCli.codeCoverage
    ? ['progress', 'junit', 'coverage-istanbul']
    : ['progress', 'kjhtml'],    
    singleRun: false,
    junitReporter: {
      outputDir: "test-results",
      outputFile: 'test-results.xml'
    },
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['ChromeDebug'],
    customLaunchers: {
      ChromeHeadlessNoSandbox: {
          base: 'ChromeHeadless',
          flags: [
              '--no-sandbox', // required to run without privileges in docker
              '--user-data-dir=/tmp/chrome-test-profile',
              '--disable-web-security'
          ]
      },
      ChromeNoSandbox: {
        base: 'Chrome',
        flags: [
            '--no-sandbox', // required to run without privileges in docker
            '--user-data-dir=/tmp/chrome-test-profile',
            '--disable-web-security'
        ]
      },
      ChromeDebug: {
        base: 'Chrome',
        flags: [ '--remote-debugging-port=9333' ],
        debug: true
      }
    }
  });
};
