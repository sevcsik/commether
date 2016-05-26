let common = require('./common.js');
let mood = require('./mood.js');
let web3, v;

module.exports = (args) => {
	let address = args.targets[1];
	web3 = common.instance;
	v = args.options.verbose;

	if (!web3.isAddress(address))
		throw new Error('Argument is not an address: ' + address);

	v && console.log('Loading contract at ' + address);
	contract = common.contract.at(address);

	console.log(
`Contract address: ${address}
Creator: ${contract.owner()}
Content Type: ${contract.mimetype()}
Mood: ${mood.format(contract.mood())}
URL: ${contract.url()}
Content:
${contract.data()}



Reactions:
${contract.reactions()}
`);
};

