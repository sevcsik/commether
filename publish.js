let common = require('./common.js');
let moodT = require('./mood.js');
let web3, v;

module.exports = (args, data) => {
	v = args.options.verbose;
	web3 = common.instance;

	let url = args.options.url || '';
	let dataSize = data ? data.length : 0;
	let urlSize = url ? new Buffer(args.options.url).length : 0;
	let mood = moodT.parse(args.options.mood || 'nothing');

	v && console.log(`Payload size: ${dataSize + urlSize}`);
	
	let transaction = { from: common.account
	                  , data: common.contractCode.Thing.code
                      , gas: 1000000
	                  };
	// if we have an empty payload, it's not necessary to
	// store the mime type.
	let mimeType = dataSize ? (args.mimetype || 'text/plain')
	                        : '';

	v && mimeType && console.log(`Payload type: ${mimeType}`);
	
	let dataAsString = mimeType === 'text/plain' ? data 
	                                             : `${data.length} bytes`;

	console.log(

`Creating contract Thing( url: ${url}
                       , mood: ${moodT.format(mood)}
                       , mimetype: ${mimeType}
                       , data: ${dataAsString}
                       )
`
    );

	if (args.options.dryrun) {
		console.log('Dry run, executing locally.');
		let estimatedGas = web3.eth.estimateGas(transaction);
		let estimatedPrice = web3.eth.gasPrice * estimatedGas;
		console.log(`Gas burnt: ${estimatedGas} (${estimatedPrice} ETH)`);
	} else {
		let address = common.contract.new(
			url, data, 0, mimeType, transaction);
		if (address) {
			console.log(`Contract mined. Address: ${address}`);
		} else {
			console.error(`Something went wrong.`);
		}
	}
};
