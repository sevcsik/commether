#!/bin/env node

let index = require('./index.js');

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
                       , { name: 'rpcurl'
                         , short: 'r'
                         , type: 'string'
                         , description:

`URL of the JSON RPC interface
   (provided by go-ehtereum for example,
   defaults to http://localhost:8545)`

                         }
                       ]).run();

argv.info('Available commands: publish, react');

let command = args.targets[0];

console.log(args);

if (!command) {
	console.error('No command given, exiting.');
	argv.help();
	process.exit(1);
} else if (index.hasOwnProperty(command) &&
           typeof index[command] === 'function') {
	index[command](args);
} else {
	console.error(`No such command: ${command}`);
	args.help();
	process.exit();
}




