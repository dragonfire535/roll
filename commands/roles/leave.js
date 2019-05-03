const Command = require('../../structures/Command');
const { ROLL_ROLES } = process.env;
const roles = ROLL_ROLES.split(',');

module.exports = class LeaveCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'leave',
			aliases: ['delete', 'remove', 'exit', 'l'],
			group: 'roles',
			memberName: 'leave',
			description: 'Removes you from a role.',
			guildOnly: true,
			args: [
				{
					key: 'role',
					prompt: 'What role do you want to leave?',
					type: 'role'
				}
			]
		});
	}

	async run(msg, { role }) {
		if (!roles.includes(role.id)) return msg.reply('This roll is not available to leave.');
		if (msg.member.roles.has(role.id)) return msg.reply('You already have this roll.');
		await msg.member.roles.remove(role);
		return msg.say(`Rolled out of the **${role.name}** roll!`);
	}
};
