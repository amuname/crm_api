const { relation_proto } =  require('../__relation_proto__')

const source = {
	__proto__: relation_proto,
	name: 'source',
	type: 'user',
}

module.exports.source = source
