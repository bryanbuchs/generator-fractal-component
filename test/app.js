'use strict';
var path = require('path');
var assert = require('yeoman-assert');
var helpers = require('yeoman-test');

describe('generator-fractal-component:app', function () {
  before(function () {
    return helpers.run(path.join(__dirname, '../generators/app'))
      .withPrompts({componentName: 'myComponent', format: 'css'})
      .toPromise();
  });

  it('creates files', function () {
    assert.file([
      'myComponent/myComponent.config.js',
      'myComponent/myComponent.css',
      'myComponent/myComponent.html',
      'myComponent/README.md'
    ]);
  });
});
