#!/usr/bin/env node

const [,, ...args] = process.argv

var shell = require("shelljs");
var _ = require('lodash');

if(args.length > 2 && args[0] === "init") {
	let projectName = null;
	let packageName = null;
	let isPackageName = false;
	let mode = null;

	args.slice(1).forEach(arg => {
		if(arg === "-p") {
			isPackageName = true;
		} else if(isPackageName) {
			packageName = arg;
			isPackageName = false;
		} else if(arg === "--redux" || arg === "--meteor" || arg === "--meteor-redux") {
			mode = arg;
		} else if(!projectName && !arg.startsWith("-")) {
			projectName = arg;
		}
	});

	if(!packageName) {
		packageName = "com.evolvier."+_.camelCase(projectName)
	}

	if(projectName) {
		let projectNameString = _.replace(projectName," ","");
		shell.exec("git clone https://gitlab.com/evolvier/react-native-starter.git '"+projectNameString+"'");
		if(mode === "--redux") {
			shell.exec("cd "+projectNameString+" && git checkout --track origin/feature/redux");
		} else if (mode === "--meteor") {
			shell.exec("cd "+projectNameString+" && git checkout --track origin/feature/meteor");
		} else if (mode === "--meteor-redux") {
			shell.exec("cd "+projectNameString+" && git checkout --track origin/feature/meteor-redux-account");
		}
		shell.exec("cd "+projectNameString+" && npm i");
		shell.exec("cd "+projectNameString+" && npm run rename '"+projectName+"' "+ packageName);
		shell.exec("cd "+projectNameString+" && rm -rf .git");
	}
}

