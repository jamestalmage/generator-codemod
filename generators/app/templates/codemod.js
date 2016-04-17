'use strict';

module.exports = function <%= camelName %>(file, api) {
	var j = api.jscodeshift;
	var ast = j(file.source);

	ast.find(j.CallExpression, {
		callee: {
			type: 'Identifier',
			name: 'foo'
		}
	}).forEach(function (p) {
		p.get('callee').replace(j.identifier('bar'));
	});

	return ast.toSource();
};
