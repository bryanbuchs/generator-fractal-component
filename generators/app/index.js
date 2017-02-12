var Generator = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var path = require('path');

module.exports = Generator.extend({
  prompting: function () {
    this.log(yosay(
      'Welcome to the magnificent ' + chalk.red('fractal-component') + ' generator!'
    ));

    var formats = ['css', 'scss', 'less'];

    var prompts = [{
      type: 'input',
      name: 'componentName',
      required: true,
      message: 'What\'s the name of your component?',
      description: 'Component name',
      default: this.appname // Default to current folder name
    }, {
      type: 'list',
      name: 'format',
      required: true,
      message: 'In what format would you like the stylesheet?',
      choices: formats
    }, {
      type: 'confirm',
      name: 'npm',
      message: 'Is it a npm package?',
      default: true
    }];

    return this.prompt(prompts).then(function (props) {
      this.props = props;
    }.bind(this));
  },

  componentStylesheet: function () {
    var outputFile = this.props.componentName + '.' + this.props.format;

    this.fs.copyTpl(
      this.templatePath(path.join('styles', '_component.' + this.props.format)),
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
    var outputFile = this.props.componentName + '.html';

    this.fs.copyTpl(
      this.templatePath('_component.html'),
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
  },

  componentPackageJSON: function () {
    if (this.props.npm) {
      this.fs.copyTpl(
        this.templatePath('_package.json'),
        this.destinationPath('package.json'),
        {
          componentName: this.props.componentName,
          componentStylesheet: this.props.componentName + '.' + this.props.format
        }
      );
    }
  }
});
