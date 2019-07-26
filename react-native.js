#!/usr/bin/env node

const [,, ...args] = process.argv

var shell = require("shelljs");
var _ = require('lodash');

if(args[0] === "init" && args[1]) {
	shell.exec("git clone https://gitlab.com/evolvier/react-native-starter.git '"+_.replace(args[1]," ","")+"'");
	shell.exec("cd "+_.replace(args[1]," ","")+" && npm i");
	args[2] = args[2]?args[2]:"com.evolvier."+_.camelCase(args[1]);
	shell.exec("cd "+_.replace(args[1]," ","")+" && npm run rename '"+args[1]+"' "+ args[2]);
	shell.exec("cd "+_.replace(args[1]," ","")+" && rm -rf .git");
}

