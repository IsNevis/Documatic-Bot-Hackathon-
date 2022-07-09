import { ICommand } from 'wokcommands'
import { homepage } from '../../package.json'
import config from '../config'
import { simpleEmbed } from '../helpers/utils'

export default {
	category: 'General',
	description: 'Replies with Pong!',

	slash: true,
	guildOnly: true,
	testOnly: true,

	callback: async ({ client, instance }) => {
		let x: number = 0
		const cmds = instance.commandHandler.commands

		const helpEmbed = simpleEmbed(`${client.user?.username} Help`, '').addField(
			`Following is a list of ${client.user?.username} commands.`,
			'\u200b'
		)

		cmds.forEach((command: any) => {
			const commandName = cmds[x].names[0]
			helpEmbed.addFields({ name: `/${commandName}`, value: `\`\`\`${command.description}\`\`\`` })
			x++
		})

		helpEmbed
			.addField('\u200b', '\u200b')
			.addField(`It's Open Source`, `[Github Link](${homepage})`, true)
			.addField('Add bot to your server', `[Click to Add](${config.settings.discordBotInviteURL})`, true)
			.addField('Support Server', `[Click to Join](${config.settings.discordBotSupportServerURL})`, true)

		return helpEmbed
	},
} as ICommand
