var Generator = require('yeoman-generator');
var chalk = require('chalk');
var path = require('path');
var titleCase = require('title-case');

module.exports = Generator.extend({
  prompting: function () {
    var prompts = [{
      type: 'input',
      name: 'componentName',
      required: true,
      message: 'What\'s the name of your component (component-name)?',
      description: 'Component name',
    }, {
      type: "confirm",
      name: "componentScript",
      message: "Add javascript boilerplate?",
      default: false
    }, {
      type: "confirm",
      name: "componentNotes",
      message: "Add a README?",
      default: false
    }, {
        type: 'list',
        name: 'componentStatus',
        required: true,
        message: 'Status flag',
        choices: ['fpo', 'wip', 'review', 'approved']
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
        componentName: this.props.componentName,
        componentLabel: titleCase(this.props.componentName),
      }
    );
  },

  componentNotes: function () {
    if (this.props.componentNotes) {
      this.fs.copyTpl(
        this.templatePath('_README.md'),
        this.destinationPath(`${this.props.componentDirectory}/README.md`),
        {
          componentName: this.props.componentName,
          componentLabel: titleCase(this.props.componentName),
        }
      );
    }
  },

  componentScript: function () {
    if (this.props.componentScript) {
      this.fs.copyTpl(
        this.templatePath('_component.js'),
        this.destinationPath(`${this.props.componentDirectory}/${this.props.componentName}.js`),
        {
          componentName: this.props.componentName,
          componentLabel: titleCase(this.props.componentName),
        }
      );
    }
  },

  componentTemplate: function () {
    this.fs.copyTpl(
      this.templatePath('_component.twig'),
      this.destinationPath(`${this.props.componentDirectory}/${this.props.componentName}.twig`),
      {
        componentName: this.props.componentName,
        componentLabel: titleCase(this.props.componentName),
      }
    );
  },

  componentConfig: function () {
    this.fs.copyTpl(
      this.templatePath('_component.config.yml'),
      this.destinationPath(`${this.props.componentDirectory}/${this.props.componentName}.config.yml`),
      {
        componentName: this.props.componentName,
        componentLabel: titleCase(this.props.componentName),
        componentStatus: this.props.componentStatus
      }
    );
  }

});
