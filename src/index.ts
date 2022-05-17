import DiscordJS, { Intents } from 'discord.js'
import path from 'node:path'
import WOKCommands from 'wokcommands'
import chalk from 'chalk'
import config from './config'

export const client = new DiscordJS.Client({
	ws: {
		properties: { $browser: 'Discord Android' }
	},

	partials: ['CHANNEL', 'GUILD_MEMBER', 'GUILD_SCHEDULED_EVENT', 'MESSAGE', 'REACTION', 'USER'],

	intents: [
		Intents.FLAGS.GUILD_PRESENCES,
		Intents.FLAGS.GUILDS,
		Intents.FLAGS.GUILD_MESSAGES,
		Intents.FLAGS.GUILD_MEMBERS,
		Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
		Intents.FLAGS.GUILD_INVITES,
		Intents.FLAGS.GUILD_WEBHOOKS,
		Intents.FLAGS.GUILD_BANS,
		Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS,
		Intents.FLAGS.GUILD_VOICE_STATES,
		Intents.FLAGS.GUILD_SCHEDULED_EVENTS
	],

	allowedMentions: { parse: ['users'] },
})

client.login(config.credentials.token)
	.then(() => {
		console.log(chalk.blueBright('Successfully logged in'))
	})
	.catch((err) => {
		console.log(chalk.redBright(`Caught error: ${err.message} \n${err.stack}`))
	})

client.on('ready', async () => {
	new WOKCommands(client, {
		botOwners: config.owners,
		testServers: config.testServers,
		commandsDir: path.join(__dirname, 'commands'),
		featuresDir: path.join(__dirname, 'events'),
		debug: true,
		typeScript: true,
		mongoUri: config.credentials.mongoURI,
		showWarns: true,
	})
		.setColor('BLURPLE')
		.setDefaultPrefix(config.prefix)
})