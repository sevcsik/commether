#!/bin/env node

let argv = require('argv');
let args = argv.option([ { name: 'verbose'
						 , short: 'v'
                         , type: 'boolean'
                         , description: 'Verbose mode'
                         }
                       , { name: 'dryrun'
                         , short: 'd'
                         , type: 'boolean'
                         , description: 'Don\'t commit changes to the blockchain'
                         }
                       ]).run();
let index = require('index');

argv.info('Available commands: publish, react');

let command = args.targets[0];

if (!command) {
	console.error('No command given, exiting.');
	argv.help();
	process.exit(1);
} else if (index.hasOwnProperty(command) &&
           typeof index[command] === 'function') {
	index[command](args);
}




