let args = require('./args.js');
let Web3 = require('web3');
let fs = require('fs');

let web3;

Object.defineProperty(module, 'exports', { get: () => {
	if (!web3) {
		web3 = new Web3();
		web3.setProvider(
			new web3.providers.HttpProvider(
				args.options.rpcurl || 'http://localhost:8545'));
	}

	return web3;
}});

