let thing = require('./thing.js');
let web3 = require('./web3.js');
let mood = require('./mood.js');
let options = require('./options.js');

module.exports = (address) => {
	let theThing;
	let v = options.verbose;

	if (!web3.isAddress(address)) {
		throw new Error('Argument is not an address: ' + address);
	}

	v && console.log('Loading contract at ' + address);
	theThing = thing.at(address);

	console.log(
`Contract address: ${address}
Creator: ${theThing.owner()}
Content Type: ${theThing.mimetype()}
Mood: ${mood.format(theThing.mood())}
URL: ${theThing.url()}
Content:
${theThing.data()}



Reactions:
${theThing.reactions()}
`);
};

