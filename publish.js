let common = require('./common.js');

let v;

module.exports = (args, data) => {
	v = args.options.verbose;

	let dataSize = data ? data.length : 0;
	let urlSize = args.url ? new Buffer(args.url).length : 0;

	v && console.log(`Payload size: ${dataSize + urlSize}`);
};
