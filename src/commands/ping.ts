import { ICommand } from 'wokcommands'
import { simpleEmbed } from '../helpers/utils'

export default {
	category: 'General',
	description: 'Replies with Pong!',

	slash: true,
	guildOnly: true,
	testOnly: true,

	callback: async ({ }) => {
		return simpleEmbed('Ping', ':ping_pong: Pong!')
	},
} as ICommand