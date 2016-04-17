'use strict';

module.exports = function <%= camelName %>(file, api) {
	var j = api.jscodeshift;

	// Adding a method to all collections
	j.registerMethods({
		findCalls: function(name) {
			return this.find(j.CallExpression, {
				callee: {
					type: 'Identifier',
					name: name
				}
			});
		}
	});

	// Adding a method to all CallExpressions
	j.registerMethods({
		renameCallee: function (name) {
			return this.forEach(function (path) {
				path.get('callee').replace(j.identifier(name))
			});
		}
	}, j.CallExpression);

	return j(file.source)
		.findCalls('foo')
		.renameCallee('bar')
		.toSource({
			useTabs: true,
			quote: 'single'
		});
};
