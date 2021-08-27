module.exports = {
	name: 'roleCreate',
	once: true,
	execute: (role) => {
		console.log(`created role`, roles.find(r => r.id == role).name);
	},
};