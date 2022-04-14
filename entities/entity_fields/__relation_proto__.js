const { proto } =  require('./__field_proto__')

const relation_proto = {
	__proto__: proto,
	_val:{
		data:{
            type: null,
            id: null,
        },
	},
	get value () { 
		return this._val
	},
	set value (val) {
		const value = Number(val)
		if (isNaN(value)) this.error_message()
		this._val.data.type = this.type
		this._val.data.id = value
	},
	type_error_text: 'Value must be type of crm entity ID (Int32)',
	type: (function(){return this.name})(),
	name: null,
}

module.exports.relation_proto = relation_proto
