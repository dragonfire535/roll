const Command = require('../../structures/Command');
const { stripIndents } = require('common-tags');
const { ROLL_ROLES } = process.env;
const roles = ROLL_ROLES.split(',');

module.exports = class ListCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'list',
			aliases: ['roles', 'rolls'],
			group: 'roles',
			memberName: 'list',
			description: 'Shows a list of joinable roles.',
			guildOnly: true
		});
	}

	run(msg) {
		const list = msg.guild.roles.filter(role => roles.includes(role.id));
		return msg.say(stripIndents`
			__**Roll List (${list.size})**__
			${list.map(role => role.name).join('\n')}
		`);
	}
};
