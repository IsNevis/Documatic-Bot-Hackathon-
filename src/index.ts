import DiscordJS, { Intents } from 'discord.js'
import path from 'node:path'
import WOKCommands from 'wokcommands'
import chalk from 'chalk'
import config from './config'

const reloginCooldown = config.settings.reloginCooldown * 1000

export const client = new DiscordJS.Client({
	ws: { properties: { $browser: 'Discord Android' } },
	partials: ['CHANNEL', 'GUILD_MEMBER', 'MESSAGE', 'REACTION', 'USER'],
	allowedMentions: { parse: ['users'] },

	intents: [
		Intents.FLAGS.GUILD_PRESENCES,
		Intents.FLAGS.GUILDS,
		Intents.FLAGS.GUILD_MESSAGES,
		Intents.FLAGS.GUILD_MEMBERS,
		Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
		Intents.FLAGS.GUILD_INVITES,
		Intents.FLAGS.GUILD_WEBHOOKS,
		Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS,
	],

	presence: {
		activities: [{
			name: '/help',
			type: 'LISTENING' 
		}],
		status: 'online'
	}
})

client.login(config.credentials.discordBotToken)
	.then(() => console.log(chalk.blueBright(`Successfully logged in as ${client.user?.username}`)))
	.catch((err) => reLogin(err))


client.on('ready', async () => {
	new WOKCommands(client, {
		botOwners: config.developer.owners,
		testServers: config.developer.testServers,
		commandsDir: path.join(__dirname, 'commands'),
		featuresDir: path.join(__dirname, 'events'),
		debug: true,
		typeScript: true,
		mongoUri: config.credentials.mongoURI,
		showWarns: true,
	})
		.setColor('BLURPLE')
		.setDefaultPrefix(config.settings.prefix)
})

function reLogin (err: Error) {
	console.log(chalk.redBright(`Caught error: ${err.message} \n${err.stack}`))
	console.log('Trying again, Login Failed')
	setTimeout(() => client.login(config.credentials.discordBotToken).catch(reLogin), reloginCooldown)
}