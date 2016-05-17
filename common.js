let Web3 = require('web3');
let fs = require('fs');

let v, web3, args, contract, contractCode, account;

let die = function(err) {
	throw new Error(err);
};

let compile = () => {
	v && console.log('Compiling contract...');
	v && console.log(`Available compilers: ${web3.eth.getCompilers()}`);

	contractCode = web3.eth.compile.solidity(
		fs.readFileSync( `${__dirname}/thing.sol`
					   , { encoding: 'utf8' }
					   )
	);

	if (!contractCode) throw new Error('failed to compile contract');

	contract = web3.eth.contract(
		contractCode.thing.info.abiDefinition
	);
};
		

module.exports = {
	setup(_args) {
		args = _args;
		web3 = new Web3();
		web3.setProvider(
			new web3.providers.HttpProvider(
				args.options.rpcurl || 'http://localhost:8545'));

		v = args.options.verbose;
		this.instance = web3;
	},

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
	},

	get account() {
		if (!account) {
			account = args.options.account
			        ? web3.eth.accounts[args.options.options.account]
			        : web3.eth.coinbase;

			account || die(`Account #${args.options.options.account} does not exist`);

			let balance = web3.eth.getBalance(account);
			v && console.log(`Using address ${account}.`);
			v && console.log(`The balance on this address is ${balance}.`);
		}

		return account;
	}	
};

