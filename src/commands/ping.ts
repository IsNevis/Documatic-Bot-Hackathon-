import { MessageEmbed } from 'discord.js'
import { ICommand } from 'wokcommands'

export default {
	category: 'General',
	description: 'Replies with Pong!',

	slash: true,
	guildOnly: true,
	testOnly: true,

	callback: async ({ }) => {
        const embed = new MessageEmbed()
            .setTitle('Ping')
            .setColor('BLURPLE')
            .setDescription(':ping_pong: Pong!')
        return embed
	},
} as ICommand