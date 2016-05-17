let Web3 = require('web3');
let web3 = new Web3();

let die = function(err) {
	throw new Error(err);
};

module.exports = args => {
	let v = args.options.verbose;

	web3.setProvider(new web3.providers.HttpProvider(
		args.rpcurl || 'http://localhost:8545'));

	let addr = args.options.account ? web3.eth.accounts[args.options.account]
	                                : web3.eth.coinbase;

	addr || die(`Account #${args.options.account} does not exist`);

	let balance = web3.eth.getBalance(addr);
	v && console.log(`Using address ${addr}.`);
	v && console.log(`The balance on this address is ${balance}.`);

};
