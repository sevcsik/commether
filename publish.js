let Web3 = require('web3');
let web3 = new Web3();

module.exports = args => {
	web3.setProvider(new web3.providers.HttpProvider(
		args.rpcurl || 'http://localhost:8545'));

	console.log(web3.eth.accounts);
};
