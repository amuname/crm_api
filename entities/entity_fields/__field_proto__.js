const proto = {
	name: 'entity field proto',
	_val: undefined,
	get value () {
		value = {}
		value[this.name] = this._val 
		return value
	},
	set value (val) {
		this._val = val
	},
	error_message(){
		throw new TypeError(this.type_error_text)
	},
	type_error_text: 'wow',
}

module.exports.proto = proto
