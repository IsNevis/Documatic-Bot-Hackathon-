import chalk from 'chalk'
import { MessageEmbed } from 'discord.js'
import process from 'node:process'
import stripAnsi from 'strip-ansi'
import config from '../config'
import { getWebhook, simpleEmbed } from '../helpers/utils'
import { client } from '../index'

process.on('unhandledRejection', async (error: Error) => check('Unhandled rejection', error))
process.on('uncaughtException', async (error) => check('Unhandled Exception', error))
process.on('exit', async (code) => console.log(chalk.redBright(`Process ended with code <<${code}>>.`)))

function check( prefix: string, error: Error ) {
	const fields = error.stack?.split('\n')
	if (typeof fields == 'undefined' || fields[0].startsWith('DiscordAPIError')) return console.log(chalk.redBright(error.stack))

	const err = `${prefix}: ${error.stack}`

	console.log(chalk.redBright(err))
	errorEmbed(error)
}

function errorEmbed(error: Error) {
	const info = getWebhook(config.developer.debugWebhookURL)
	if (!info) return

	return client.fetchWebhook(info.id, info.token).then((webhook) =>
		webhook.send({
			// embeds: [errorEmbed],
			embeds: [simpleEmbed(error.name, `\`\`\`${stripAnsi(error.message)}\`\`\``, 'RED')],
			username: client.user?.tag,
			avatarURL: client.user?.displayAvatarURL({ dynamic: true }),
		})
	)
}