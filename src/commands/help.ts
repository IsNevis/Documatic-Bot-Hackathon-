import { ICommand } from 'wokcommands'
import { homepage } from '../../package.json';
import config from '../config'
import { simpleEmbed } from '../helpers/utils';

export default {
	category: 'Help',
	description: 'Shows this Menu!',

	slash: true,
	guildOnly: true,
	testOnly: true,

	callback: async ({ interaction, client }) => {
		return simpleEmbed(
			`${client.user?.username} Help`,
			''
		).addField(`Following is a list of ${client.user?.username} commands.`, '\u200b')
		.addFields(
			{
				name: '/help',
				value: 'Shows this Menu!'
			},
			{
				name: '/ping',
				value: 'Replies with Pong!'
			},
			{
				name: '/play',
				value: 'Play Hand Cricket with a bot!'
			},
			{
				name: '/gamerules',
				value: 'Explains the rules of the game!'
			},
		)
		.addField('\u200b', '\u200b')
		.addField(`It's Open Source`, `[Github Link](${homepage})`, true)
		.addField('Add bot to your server', `[Click to Add](${config.settings.discordBotInviteURL})`, true)
		.addField('Support Server', `[Click to Join](${config.settings.discordBotSupportServerURL})`, true)
	}
} as ICommand