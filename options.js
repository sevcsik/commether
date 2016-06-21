/**
 * Global application config
 */

module.exports = {
	init(args) {
		for (let k in args) {
			this[k] = args[k];
		}
	}
};
