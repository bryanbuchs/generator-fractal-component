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
    }];

    return this.prompt(prompts).then((props) => {
        props.componentDirectory = `./${props.componentName}`;
        return this.props = props;
    });
  },

  componentStylesheet: function () {
    this.fs.copyTpl(
      this.templatePath('_component.less'),
      this.destinationPath(`${this.props.componentDirectory}/${this.props.componentName}.less`),
      {
        componentName: this.props.componentName
      }
    );
  },

  componentNotes: function () {
    this.fs.copyTpl(
      this.templatePath('_README.md'),
      this.destinationPath(`${this.props.componentDirectory}/README.md`),
      {
        componentName: this.props.componentName
      }
    );
  },

  componentTemplate: function () {
    this.fs.copyTpl(
      this.templatePath('_component.twig'),
      this.destinationPath(`${this.props.componentDirectory}/${this.props.componentName}.twig`),
      {
        componentName: this.props.componentName
      }
    );
  },

  componentConfig: function () {
    this.fs.copyTpl(
      this.templatePath('_component.config.yml'),
      this.destinationPath(`${this.props.componentDirectory}/${this.props.componentName}.config.yml`),
      {
        componentName: this.props.componentName
      }
    );
  }

});
