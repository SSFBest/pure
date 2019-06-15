#!/usr/bin/env node

var pkg = require('./package.json');
var fs = require('fs');
var hint = require("jshint").JSHINT;
var uglify = require('uglify-js');

var banner = '';

var releases = {
	lite: {
		files: [
			// 'src/js/gallery.js',
			// 'src/js/util.js',
			'simple/js/simple.iife.js',
		]
	},

	iscroll: {
		files: [
			'indicator/_initIndicators.js',
			'wheel/wheel.js',
			'snap/snap.js',
			'keys/keys.js',
			'default/_animate.js',
			'default/handleEvent.js',
			'indicator/indicator.js'
		]
	},

	probe: {
		files: [
			'indicator/_initIndicators.js',
			'wheel/wheel.js',
			'snap/snap.js',
			'keys/keys.js',
			'probe/_animate.js',
			'default/handleEvent.js',
			'indicator/indicator.js'
		]
	},

	zoom: {
		files: [
			'indicator/_initIndicators.js',
			'zoom/zoom.js',
			'wheel/wheel.js',
			'snap/snap.js',
			'keys/keys.js',
			'default/_animate.js',
			'zoom/handleEvent.js',
			'indicator/indicator.js'
		]
	},

	infinite: {
		files: [
			'wheel/wheel.js',
			'snap/snap.js',
			'keys/keys.js',
			'probe/_animate.js',
			'infinite/infinite.js',
			'default/handleEvent.js',
		]
	}
};

var args = process.argv.slice(2);

if ( !args.length ) {
	args = [''];
}

if ( args[0] == 'dist' ) {
	args = ['lite', 'iscroll', 'zoom', 'probe', 'infinite'];
}

// Get the list of files
args.forEach(function (release) {
	if ( !(release in releases) ) {
		console.log('Unrecognized release: ' + release);
		return;
	}

	console.log('Building release: ' + release);
	build(release);
});

function build (release) {
	var out = '';
	var value = '';

	var fileList = [];

	fileList = fileList.concat(releases[release].files);

	// fileList.push('close.js');

	// Concatenate files
	out = banner + fileList.map(function (filePath) {
				return fs.readFileSync(filePath, 'utf-8');
			}).join('');

	// Update version


	// Post processing


	// Write build file
	var buildFile = './build/yljs' + (release != 'lite' ? '-' + release : '') + '.js';
	fs.writeFileSync(buildFile, out);

	// JSHint
	if ( !hint(out) ) {
		var lines = out.split('\n');
		hint.errors.forEach(function (err) {
			console.log('\033[31m[' + err.code + ']\033[0m ' + err.line + ':' + err.character + '\t- ' + err.reason);
			console.log('\033[33m' + lines[err.line-1].replace(/\t/g, ' ') + '\033[0m\n');
		});

		process.exit();
	}

	// Write dist file
	var distFile = buildFile.replace('/build/', '/dist/').replace('.js', '-min.js');
	out = uglify.minify(out, { fromString: true });

	// Make sure dist folder exists
	if ( !fs.existsSync('dist') ) {
		fs.mkdirSync('dist');
	}

	// Write files to target
	fs.writeFileSync(distFile, banner + out.code);
}
