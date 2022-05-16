import chalk from 'chalk'
import { MessageEmbed } from 'discord.js'
import process from 'node:process'
import stripAnsi from 'strip-ansi'
import config from '../config'
import { getWebhook } from '../helpers/utils'
import { client } from '../index'

process.on('unhandledRejection', async (error: Error) => { check('Unhandled rejection', error) })
process.on('uncaughtException', async (error) => { check('Unhandled Exception', error) })
process.on('exit', async (code) => {
	const exit = `Process ended with code <<${code}>>.`
	console.log(chalk.redBright(exit))	
})

function check( prefix: string, error: Error ) {
	const fields = error.stack?.split('\n')
	if (typeof fields == 'undefined' || fields[0].startsWith('DiscordAPIError')) return console.log(chalk.redBright(error.stack))

	const err = `${prefix}: ${error.stack}`

	console.log(chalk.redBright(err))
	errorEmbed(error)
}

function errorEmbed(error: Error) {
	const info = getWebhook(config.debugWebhookURL)
	if (!info) return
	const errorEmbed = new MessageEmbed().setColor('RED').setDescription(stripAnsi(error.message)).setTimestamp()

	return client.fetchWebhook(info.id, info.token).then((webhook) =>
		webhook.send({
			embeds: [errorEmbed],
			username: client.user?.tag,
			avatarURL: client.user?.displayAvatarURL({ dynamic: true }),
		})
	)
}