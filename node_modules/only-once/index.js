var _ = require('lodash');

module.exports = function(func, context) {
	if (!_.isFunction(func)) {
		throw new TypeError('Argument func is not a function');
	}
	var called = false;
	return function() {
		if (called) {
			throw new Error('The function is limited to call only once');
		}
		called = true;
		func.apply(context, arguments);
	}
}