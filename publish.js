let common = require('./common.js');

let v;

module.exports = args => {
	v = args.options.verbose;

	common.contract;
};
