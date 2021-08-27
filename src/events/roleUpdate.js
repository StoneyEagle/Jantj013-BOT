module.exports = {
	name: 'roleDelete',
	once: true,
	execute: (oldRole, newRole) => {
		console.log(`Deleted role`, oldRole, newRole);
	},
};