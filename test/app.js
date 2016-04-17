import path from 'path';
import test from 'ava';
import assert from 'yeoman-assert';
import helpers from 'yeoman-test';

function runWithPrompts(prompts, cb) {
	helpers
		.run(path.join(__dirname, '../generators/app'))
		.withPrompts(prompts)
		.on('end', cb);
}

test.cb('generator-codemod:app', t => {
	runWithPrompts({filename: 'my-codemod'}, err => {
		t.ifError(err);
		assert.file([
			'my-codemod.js'
		]);
		t.end();
	});
});
