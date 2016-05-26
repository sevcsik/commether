let common = require('./common.js');
let web3, v;

module.exports = args => {
	web3 = common.instance;
	v = args.options.verbose;

	let thingAddress = args.targets[1];
	let reactionAddress = args.targets[2];
	if (!web3.isAddress(thingAddress) || !web3.isAddress(reactionAddress)) {
		throw new Error('Given address is not a valid Ethereum address');
	}

	// older versions?
	let thing = common.contract.at(thingAddress);
	let reaction = common.contract.at(reactionAddress);

	if (!thing) {
		throw new Error(`Contract at address ${thingAddress} is not a Thing`);
	}
	
	if (!reaction) {
		throw new Error(`Contract at address ${reactionAddress} is not a Thing`);
	}

	if (args.options.dryrun) {
		v && console.log('Running #react locally');
		console.log(thing.react.call(reactionAddress));
	} else {
		v && console.log('Sending transaction to call #react. Result:'); 
		console.log(thing.react.sendTransaction( reaction.address
		                                       , { from: common.account
		                                         , gas: 2000000
		                                         }));
	}
};
