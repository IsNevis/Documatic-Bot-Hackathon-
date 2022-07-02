import { ICommand } from 'wokcommands'
import { simpleEmbed } from '../../helpers/utils'

export default {
	category: 'General',
	description: 'Forfeits the currently ongoing match.',

	slash: true,
	guildOnly: true,
	testOnly: true,

	callback: async ({ }) => {
		return simpleEmbed('Ping', ':ping_pong: Pong!')
	},
} as ICommand