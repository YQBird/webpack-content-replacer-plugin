'use strict';

const fs = require('fs');
const path = require('path');
const expect = require('expect.js');
const webpack = require('webpack');
const config = require('./../workflow_test/webpack.config.js');
const reverse = require('./../workflow_test/webpack.config.reverse.js');
const except = require('./../workflow_test/webpack.config.exception.js');

describe('Webpack workflow test cases', () => {
  afterEach(() => {
    webpack(reverse, (err, stats) => {
      if (err) return err;
      if (stats.hasErrors()) return new Error(stats.toString());
      return stats;
    });
  });

  it('should make new build', (done) => {
    webpack(config, (err, stats) => {
      if (err) return done(err);
      if (stats.hasErrors()) return done(new Error(stats.toString()));

      expect(stats).to.not.be.empty();
      return done();
    });
  });

  it('should replace element value in html file', (done) => {
    webpack(config, (err, stats) => {
      if (err) return done(err);
      if (stats.hasErrors()) return done(new Error(stats.toString()));

      const testFilePath = path.join(__dirname, '../workflow_test/index.html');
      const target = ['First Test has been Replaced', 'Second Test has been Replaced'];
      const data = fs.readFileSync(testFilePath, 'utf8').toString();
      target.forEach((value) => {
        expect(data.indexOf(value) !== -1).to.equal(true);
      });
      return done();
    });
  });

  it('should replace style value in css file', (done) => {
    webpack(config, (err, stats) => {
      if (err) return done(err);
      if (stats.hasErrors()) return done(new Error(stats.toString()));

      const testCssPath = path.join(__dirname, '../workflow_test/style.css');
      const target = ['blue', 'width'];
      const data = fs.readFileSync(testCssPath, 'utf8').toString();
      target.forEach((value) => {
        expect(data.indexOf(value) !== -1).to.equal(true);
      });
      return done();
    });
  });
});

// describe('Exception Handler test case', () => {
//   it('should return error in log level', (done) => {
//     webpack(except.invalidOpt, (err, stats) => {
//       if (err) {
//         console.log('**********', JSON.stringify(err));
//         return done(err);
//       }
//       if (stats.hasErrors()) {
//         console.log('**********', JSON.stringify(stats));
//         return done(new Error(stats.toString()));
//       }
//       const log = fs.readFileSync(path.join(__dirname, '../warning.log'));
//       expect(log).to.not.be.empty();
//       return stats;
//     });
//   });
// });

describe('Exception Handler test case', () => {
  it('should return error in log level', (done) => {
    webpack(except.noFileOpt, (err, stats) => {
      if (err) {
        console.log('**********', JSON.stringify(err));
        return done(err);
      }
      if (stats.hasErrors()) {
        console.log('**********', JSON.stringify(stats));
        return done(new Error(stats.toString()));
      }
      const log = fs.readFileSync(path.join(__dirname, '../warning.log'));
      expect(log).to.not.be.empty();
      return stats;
    });
  });
});
