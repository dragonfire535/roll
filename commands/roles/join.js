const Command = require('../../structures/Command');
const { ROLL_ROLES } = process.env;
const roles = ROLL_ROLES.split(',');

module.exports = class JoinCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'join',
			aliases: ['give', 'add', 'j'],
			group: 'roles',
			memberName: 'join',
			description: 'Joins you to a role.',
			guildOnly: true,
			args: [
				{
					key: 'role',
					prompt: 'What role do you want to join?',
					type: 'role'
				}
			]
		});
	}

	async run(msg, { role }) {
		if (!roles.includes(role.id)) return msg.reply('This roll is not available to join.');
		if (msg.member.roles.has(role.id)) return msg.reply('You already have this roll.');
		await msg.member.roles.add(role);
		return msg.say(`Rolled into the **${role.name}** roll!`);
	}
};
