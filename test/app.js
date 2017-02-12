'use strict';
var path = require('path');
var assert = require('yeoman-assert');
var helpers = require('yeoman-test');

describe('generator-fractal-component:css-with-npm', function () {
  before(function () {
    return helpers.run(path.join(__dirname, '../generators/app'))
      .withPrompts({componentName: 'myComponent', format: 'css', npm: true})
      .toPromise();
  });

  it('creates files', function () {
    assert.file([
      'myComponent.config.js',
      'myComponent.css',
      'myComponent.html',
      'package.json',
      'README.md'
    ]);
  });
});

describe('generator-fractal-component:less-without-npm', function () {
  before(function () {
    return helpers.run(path.join(__dirname, '../generators/app'))
      .withPrompts({componentName: 'myOtherComponent', format: 'less', npm: false})
      .toPromise();
  });

  it('creates files', function () {
    assert.file([
      'myOtherComponent.config.js',
      'myOtherComponent.less',
      'myOtherComponent.html',
      'README.md'
    ]);
  });
});
