#!/usr/bin/env node

let index = require('./index.js');
let common = require('./common.js');

let fs = require('fs');
let argv = require('argv');
let args = argv.option([ { name: 'verbose'
						 , short: 'v'
                         , type: 'boolean'
                         , description: 'Verbose mode'
                         }
                       , { name: 'dryrun'
                         , short: 'd'
                         , type: 'boolean'
                         , description: 

`Don\'t commit changes to the blockchain'`

                         }
                       , { name: 'rpcurl'
                         , short: 'r'
                         , type: 'string'
                         , description:

`URL of the JSON RPC interface
   (provided by go-ehtereum for example,
   defaults to http://localhost:8545)`

                         }
                       , { name: 'account'
                         , short: 'a'
                         , type: 'int'
                         , description:

`Account number (index) to use, by default,
   the coinbase address is used.`

                         }
                       , { name: 'url'
                         , short: 'u'
                         , type: 'string'
                         , description:

`URL of the thing. Useful if it's too large to be persisted
   on the blockchain.`

                         }
                       , { name: 'mimetype'
                         , short: 't'
                         , type: 'string'
                         , description:

`MIME type of the body (from stdin or from a file). The
   default is text/plain.`

                         }
                       ]).run();

argv.info('Available commands: publish, react');

let v = args.options.verbose;
let command = args.targets[0];

if (!command) {
	console.error('No command given, exiting.');
	argv.help();
	process.exit(1);
} else if (index.hasOwnProperty(command) &&
           typeof index[command] === 'function') {
	common.setup(args);

	if (args.targets[1]) {
		data = fs.readFileSync(args.targets[1]);
		index[command](args, data);
	} else {
		// load file from stdin or second argument
		let data = '';
		process.stdin.on('readable', function() {
			let chunk = this.read();
			if (chunk) {
				data += chunk;
			}
		});

		process.stdin.on('end', function() {
			if (!data) {
				v && console.log(
					'No input data - empty thing will be created.'
				);
			}
			
			index[command](args, data);
		});
	}
} else {
	console.error(`No such command: ${command}`);
	argv.help();
	process.exit();
}




