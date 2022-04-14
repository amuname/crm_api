const fs = require('fs')
const { post } = require('./crm_methods/crm_post')

const FIELDS_ATTRIBUTES = fs.readdirSync('./entity_fields/attributes');
const FIELDS_RELATIONSHIPS = fs.readdirSync('./entity_fields/relationships');
// console.log(FIELDS_MODULES)

const ATTRIBUTES = {}

const RELATIONSHIPS = {}

for (const f_module of FIELDS_ATTRIBUTES) {
	try {
		// if (f_module.includes('proto')) continue
		const field_name = f_module.match(/_(\D.+).js/)[1]	
		ATTRIBUTES[field_name] = require(`./entity_fields/attributes/${f_module}`)[field_name]
	} catch (err) {
		console.log(err)
		continue
	}

}

for (const f_module of FIELDS_RELATIONSHIPS) {
	try {
		// if (f_module.includes('proto')) continue
		const field_name = f_module.match(/_(\D.+).js/)[1]	
		RELATIONSHIPS[field_name] = require(`./entity_fields/relationships/${f_module}`)[field_name]
	} catch (err) {
		console.log(err)
		continue
	}

}

class Entity {
	constructor(params){
		this._RELATIONSHIPS = RELATIONSHIPS

		this._ATTRIBUTES= ATTRIBUTES

		this.NAME= 'ENTITY'

		this._MODEL= {
	       	data: {
	        	type: null,
	         	attributes: {},
	         	relationships: {},
			},
	    }

		this._attributes= ['id']

		this._relationships = []

		this._create(params)
	}

    get name () { return this.NAME }

    get model () { 
    	if(!this._MODEL.data.type) this._MODEL.data.type = `${this.name.toLocaleLowerCase()}s`
    	return this._MODEL 
    }

    set model (val) { return undefined }


	get attributes () {
		return this._attributes
	}

	set attributes (attributes_array) {
		if (!Array.isArray(attributes_array)) attributes_array = [attributes_array]
		// console.log(this._ATTRIBUTES)
		const actual = attributes_array.map(
			field => Object.keys(this._ATTRIBUTES).includes(field) && field
		)
		const all_attributes = [...actual, ...this._attributes]

		const attributes = all_attributes.filter( (elem, index, array)=> array.indexOf(elem) === index)

		this._attributes = attributes
	}

	get relationships () {
		return this._relationships
	}

	set relationships (relationships_array) {
		if (!Array.isArray(relationships_array)) relationships_array = [relationships_array]
		// console.log(this._RELATIONSHIPS)
		const actual = relationships_array.map(
			field => Object.keys(this._RELATIONSHIPS).includes(field) && field
		)
		const all_relationships = [...actual, ...this._relationships]

		const relationships = all_relationships.filter( (elem, index, array)=> array.indexOf(elem) === index)

		this._relationships = relationships
	}

	fieldsConstruct () {}

	_create (params) {

		this.fieldsConstruct()

		this.attributes.forEach(
			attribute => this.addAttribute(attribute, params[attribute] || null)
		)

		return this
		// return 0
	}

	addAttribute (name, value = null) {
		this.addEntityParam({
			model: 'attributes',
			name,
			value,
		})
	}
	
	addRelation (type, crm_id) {
		this.addEntityParam({
			model: 'relationships',
			name,
			value,
		})
	}

	addEntityParam (creation_opts) {
		const { model, name, value } = creation_opts

		if(!this[model].includes(name)) return undefined

		this[`_${model.toUpperCase()}`][name].value = value 

		const param_model = this[`_${model.toUpperCase()}`][name].value

		Object.assign(this._MODEL.data[model], param_model)
	}

	get help () {
		return 'use Entity.create or new Entity\r\n' +
		'use instance.model to get crm data\r\n' + 
		'override instance.fieldsConstruct to declare\r\n' +
		'attributes and relationships'
	}

	// async post () {
	// 	const res = await post.call(this)
	// 	const model = JSON.parse(res)
	// 	const entity = this.create(model.data.attributes)
	// 	entity.model = model
	// 	entity.id = model.data.id
	// 	return entity
	// }
}

Entity.create = function (params) { 
	return new this(params) 
}

module.exports.Entity = Entity
