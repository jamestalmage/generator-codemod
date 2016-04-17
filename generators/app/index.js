'use strict';
var path = require('path');
var yeoman = require('yeoman-generator');
var camelcase = require('camelcase');

module.exports = yeoman.Base.extend({
	prompting: function () {
		var done = this.async();

		var prompts = [{
			name: 'filename',
			message: 'Specify a folder/filename',
			default: 'lib/my-codemod'
		}];

		this.prompt(prompts, function (props) {
			var filename = props.filename;
			var ext = path.extname(filename);
			var base = path.basename(filename, ext);

			if (ext === '') {
				ext = '.js';
			}

			this.props = {
				filename: path.join(path.dirname(filename), base + ext),
				camelName: camelcase(base)
			};

			done();
		}.bind(this));
	},

	writing: function () {
		this.fs.copyTpl(
			this.templatePath('codemod.js'),
			this.destinationPath(this.props.filename),
			this.props
		);
	}
});
