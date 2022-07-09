import { Client } from 'discord.js'
import { getWebhook, simpleEmbed } from '../../helpers/utils'
import chalk from 'chalk'
import config from '../../config'

export default (client: Client) => {
	client.on('warn', async (message) => {
		if (config.logging.discordWarnLOGS !== true) return
		const info = getWebhook(config.developer.debugWebhookURL)
		if (!info) return

		const warnConsole = `Warn: ${message}`
		console.log(chalk.yellowBright(warnConsole))

		return client.fetchWebhook(info.id, info.token).then((webhook) =>
			// webhook.send({
			//     embeds: [simpleEmbed('A warn event has occurred', `Warn: ${message}`, 'YELLOW')],
			//     embeds: [simpleEmbed('A warn event has occurred', `\`\`\`${stripAnsi(message)}\`\`\``, 'YELLOW')],
			//     username: client.user?.tag,
			//     avatarURL: client.user?.displayAvatarURL({ dynamic: true }),
			// })
			console.log('rarw')
		)
	})
}
