let common = require('./common.js');

module.exports = (args) => {
	let thingAddress = args.targets[1];
	let web3 = common.instance;
	let v = args.options.verbose;
	let contract = common.contract;

	if (!web3.isAddress(thingAddress)) {
		throw new Error(`Address given is not a valid address: ${thingAddress}`);
	}
	
	let thing = common.contract.at(thingAddress);

	if (!thing) {
		throw new error(`Thing does not exist or not a Thing: ${thingAddress}`);
	}

	let reactions = thing.reactions.call();

	console.log(JSON.stringify(reactions));
};
