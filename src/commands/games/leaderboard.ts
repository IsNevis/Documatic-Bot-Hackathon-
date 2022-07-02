import { ICommand } from 'wokcommands'
import { simpleEmbed } from '../../helpers/utils'

export default {
	category: 'General',
	description: 'Leaderboard of high scores.',

	slash: true,
	guildOnly: true,
	testOnly: true,

	callback: async ({ }) => {
  
		return simpleEmbed(
			'Leaderboards',
			'Following is the list of the top match(s) with high scores'
		)
				
	},
} as ICommand