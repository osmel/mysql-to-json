var assert = require('assert');

var onlyOnce = require('../index.js');

describe('onlyOnce', function() {

	it('calls once', function() {

		var mockFuncCallCount = 0;

		function mockFunc(testArg1, testArg2) {
			assert.strictEqual(testArg1, 'testArg1');
			assert.strictEqual(testArg2, 'testArg2');
			mockFuncCallCount++;
		}

		onlyOnce(mockFunc)('testArg1', 'testArg2');

		assert.strictEqual(mockFuncCallCount, 1);

	});

	it('throws error when colled more then once', function() {

		var mockFuncCallCount = 0;
		var errorThownCallCount = 0;

		function mockFunc() {
			mockFuncCallCount++;
		}

		var limitedFunc = onlyOnce(mockFunc);

		limitedFunc(mockFunc);

		try {
			limitedFunc(mockFunc);
		} catch (e) {
			assert.strictEqual(e.message, 'The function is limited to call only once');
			errorThownCallCount++;
		}

		assert.strictEqual(mockFuncCallCount, 1);
		assert.strictEqual(errorThownCallCount, 1);

	});

});