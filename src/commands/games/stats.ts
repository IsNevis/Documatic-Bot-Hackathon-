import { ICommand } from 'wokcommands'
import { simpleEmbed } from '../../helpers/utils'

export default {
	category: 'General',
	description: 'Stats about the bot.',

	slash: true,
	guildOnly: true,
	testOnly: true,

	callback: async ({}) => {
		const matchesPlayed = '' // singlePlayer, multiPlayer, global

		return simpleEmbed('Hand Cricket Stats', '')
			.addField('1P Matches Played', `\`${matchesPlayed}\``, true)
			.addField('2P Matches Played', `\`${matchesPlayed}\``, true)
			.addField('Global Matches Played', `\`${matchesPlayed}\``, true)
	},
} as ICommand
