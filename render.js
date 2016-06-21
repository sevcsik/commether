let thing = require('./thing.js');
let web3 = require('./web3.js');
let options = require('./options.js');


module.exports = (thingAddress) => {
	let v = options.verbose;
	let contract = thing.contract;

	if (!web3.isAddress(thingAddress)) {
		throw new Error(`Address given is not a valid address: ${thingAddress}`);
	}

	let theThing = thing.contract.at(thingAddress);

	if (!thing) {
		throw new Error(`Thing does not exist or not a Thing: ${thingAddress}`);
	}

	let reactions = thing.reactions.call();

	console.log(JSON.stringify(reactions));
};
