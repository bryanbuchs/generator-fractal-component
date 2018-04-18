var Generator = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var path = require('path');

module.exports = Generator.extend({
  prompting: function () {
    this.log(yosay(
      'Welcome to the magnificent ' + chalk.red('fractal-component') + ' generator!'
    ));

    var prompts = [{
      type: 'input',
      name: 'componentName',
      required: true,
      message: 'What\'s the name of your component?',
      description: 'Component name',
      default: this.appname // Default to current folder name
    }];

    return this.prompt(prompts).then(function (props) {
      this.props = props;
    }.bind(this));
  },

  componentStylesheet: function () {
    var outputFile = this.props.componentName + '.less';

    this.fs.copyTpl(
      this.templatePath(path.join('styles', '_component.less')),
      this.destinationPath(outputFile),
      {
        componentName: this.props.componentName
      }
    );
  },

  componentNotes: function () {
    this.fs.copyTpl(
      this.templatePath('_README.md'),
      this.destinationPath('README.md'),
      {
        componentName: this.props.componentName
      }
    );
  },

  componentTemplate: function () {
    var outputFile = this.props.componentName + '.twig';

    this.fs.copyTpl(
      this.templatePath('_component.twig'),
      this.destinationPath(outputFile),
      {
        componentName: this.props.componentName
      }
    );
  },

  componentConfig: function () {
    var outputFile = this.props.componentName + '.config.js';

    this.fs.copyTpl(
      this.templatePath('_component.config.js'),
      this.destinationPath(outputFile),
      {
        componentName: this.props.componentName
      }
    );
  }

});
