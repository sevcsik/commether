/**
 * The compiled Thing contract
 */

let web3 = require('./web3.js');
let options = require('./options.js');
let fs = require('fs');

let v, contract, contractCode;

let compile = () => {
	v = options.v;
	v && console.log('Compiling contract...');
	v && console.log(`Available compilers: ${web3.eth.getCompilers()}`);

	contractCode = web3.eth.compile.solidity(
		fs.readFileSync( `${__dirname}/thing.sol`
					   , { encoding: 'utf8' }
					   )
	);

	if (!contractCode) {
		throw new Error('failed to compile contract');
	}

	contract = web3.eth.contract(
		contractCode.Thing.info.abiDefinition
	);
};

module.exports = {
	get contract() {
		if (!contract) {
			compile();
		}

		return contract;
	},

	get contractCode() {
		if (!contractCode) {
			compile();
		}

		return contractCode;
	}
};
