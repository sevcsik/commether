/**
 * Account
 */

let web3 = require('./web3.js');
let args = require('./args.js');
let account, v;

Object.defineProperty(module, 'exports', { get: () => {
	v = args.v;
	if (!account) {
		account = args.options.account
				? web3.eth.accounts[args.options.options.account]
				: web3.eth.coinbase;

		if (!account) {
			throw new Error(`Account #${args.options.options.account} does not exist`);
		}

		let balance = web3.eth.getBalance(account);
		v && console.log(`Using address ${account}.`);
		v && console.log(`The balance on this address is ${balance}.`);
	}

	return account;
}});
