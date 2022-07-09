import { Config } from './helpers/configFormat'

export default new Config({
	credentials: {
		discordBotToken: 'bot-token',
		mongoURI: 'mongo',
	},
	developer: {
		owners: ['developer-user-id'],
		testServers: ['developer-test-server-id'],
		debugWebhookURL: 'discord-webhook',
	},
	settings: {
		prefix: '?',
		discordBotInviteURL: '',
		discordBotSupportServerURL: '',
		reloginCooldown: 10, // in seconds
	},
	logging: {
		fileLogs: false,
		webhookLogs: false,
		discordDebugLOGS: false,
		discordErrorLOGS: false,
		discordWarnLOGS: false,
		unhandledRejectionLOGS: false,
		uncaughtExceptionLOGS: false,
		exitLOGS: false,
	},
})
