const { proto } =  require('../__field_proto__')

const general_phone = {
	__proto__: proto,
	set value (val) {
		const number_id = Number(val)
		if (isNaN(number_id)) this.error_message()
		this._val = val
		return number_id
	},
	name: 'general_phone',
	type_error_text: 'Not a number!',
}

module.exports.general_phone = general_phone
