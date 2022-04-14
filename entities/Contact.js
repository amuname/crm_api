const { Entity } = require('./entityConstructor')

class Contact extends Entity {
	constructor (params) {
		super(params)

		this.NAME = 'Contact'
	}

	// ставит доступными поля в конструкторе
	fieldsConstruct () {
		this.attributes = ['id', 'email', 'description']
		this.relationships = ['responsible']
		// console.log('contact attrs ',this.attributes, this.relationships)
	}

}

// console.log(Contact.createEntityList( [{ phone: 8798797, description: 'text' },{ phone: 8798797, description: 'text' }]))
const c = new Contact({ email: 8798797, description: 'text', name: 'qwe' })
const d = Contact.create({ email: 22222, description: '2222', name: 'qwe' })

// Contact.create({ email: '111@sas.dsa', description: 'gooo', name: 'qwe' }).post()
// console.log('contact', c)
// console.log('contact.desc', c.description)
console.log('contact c.model', c.model)
console.log('contact c.model', d.model)
// console.log(Contact.create())
// c.post().then(e=> console.log(e))

module.exports.Contact = Contact
