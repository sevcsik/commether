const values = [ 'nothing'
               , 'agree'
               , 'disagree'
               , 'amused'
               , 'angry'
               , 'sad'
               ];

module.exports = {
	format: i => values[i],
	parse: str => {
		let val = values.indexOf(str);
		if (val === -1) {
			throw new Error('invalid mood ' + val);
		}
		
		return val;
	}
};
