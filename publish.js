let common = require('./common.js');
let web3;

let v;

module.exports = (args, data) => {
	v = args.options.verbose;
	web3 = common.instance;

	let dataSize = data ? data.length : 0;
	let urlSize = args.url ? new Buffer(args.url).length : 0;

	v && console.log(`Payload size: ${dataSize + urlSize}`);
	
	let transaction = { from: common.account
	                  , data: common.contractCode.Thing.code
                      , gas: 100000
	                  };
	// if we have an empty payload, it's not necessary to
	// store the mime type.
	let mimeType = dataSize ? (args.mimetype || 'text/plain')
	                        : '';

	v && mimeType && console.log(`Payload type: ${mimeType}`);
	
	let url = args.url || '';
	let dataAsString = `${data.length} bytes`;

	console.log(

`Creating contract Thing( _url: ${url}
                       , _data: ${dataAsString}
                       , _mood: 0
                       , _mimetype: ${mimeType}
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
