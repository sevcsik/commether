let thing = require('./thing.js');
let account = require('./account.js');
let web3 = require('./web3.js');
let moodT = require('./mood.js');
let web3, v;

module.exports = (args, data) => {
	v = args.options.verbose;

	let url = args.options.url || '';
	let dataSize = data ? data.length : 0;
	let urlSize = url ? new Buffer(args.options.url).length : 0;
	let mood = moodT.parse(args.options.mood || 'nothing');

	v && console.log(`Payload size: ${dataSize + urlSize}`);

	// if we have an empty payload, it's not necessary to
	// store the mime type.
	let mimeType = dataSize ? (args.mimetype || 'text/plain')
	                        : '';

	v && mimeType && console.log(`Payload type: ${mimeType}`);

	let dataAsString = mimeType === 'text/plain' ? `>>>\n${data}<<<`
	                                             : `${data.length} bytes`;

	console.log(

`Creating contract Thing( url: ${url}
                        , mood: ${moodT.format(mood)}
                        , mimetype: ${mimeType}
                        , data: ${dataAsString}
                        )
`
	);

	let transaction = { from: account
	                  , data: thing.contractCode.code
	                  };
	console.log('hello');
	let gas = web3.eth.estimateGas(transaction);
	console.log('sync:' + gas);
	process.exit();

	transaction.data = thing.contract.new.getData(url, data, mood, mimeType, transaction);

	let estimatedPrice = web3.eth.gasPrice * gas;
	console.log(`Using gas: ${gas} (${web3.fromWei(estimatedPrice, 'ether')} ETH)`);

	if (!args.options.dryrun) {
		v && console.log(`Sending transaction.`);
		transaction.gas = gas;
		let tx = web3.eth.sendTransaction(transaction);
		console.log(`Contract to be mined. TX Hash: ${tx}`);
	} else {
		v && console.log('Dry dun, not sending transaction.');
	}
};
