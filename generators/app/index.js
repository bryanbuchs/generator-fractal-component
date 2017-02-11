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
      type: 'String',
      name: 'componentName',
      required: true,
      message: 'What\'s the name of your component?',
      description: 'Component name'
    }, {
      type: 'list',
      name: 'format',
      required: true,
      message: 'In what format would you like the stylesheet?',
      choices: formats
    }];

    return this.prompt(prompts).then(function (props) {
      this.props = props;
    }.bind(this));
  },

  componentStylesheet: function () {
    var outputFile = this.props.componentName + '.' + this.props.format;

    this.fs.copyTpl(
      this.templatePath(path.join('styles', '_component.' + this.props.format)),
      this.destinationPath(path.join(this.props.componentName, outputFile)),
      {
        componentName: this.props.componentName
      }
    );
  },

  componentNotes: function () {
    this.fs.copyTpl(
      this.templatePath('_README.md'),
      this.destinationPath(path.join(this.props.componentName, 'README.md')),
      {
        componentName: this.props.componentName
      }
    );
  },

  componentTemplate: function () {
    var outputFile = this.props.componentName + '.html';

    this.fs.copyTpl(
      this.templatePath('_component.html'),
      this.destinationPath(path.join(this.props.componentName, outputFile)),
      {
        componentName: this.props.componentName
      }
    );
  },

  componentConfig: function () {
    var outputFile = this.props.componentName + '.config.js';

    this.fs.copyTpl(
      this.templatePath('_component.config.js'),
      this.destinationPath(path.join(this.props.componentName, outputFile)),
      {
        componentName: this.props.componentName
      }
    );
  }
});
