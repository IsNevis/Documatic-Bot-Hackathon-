import { type Snowflake } from 'discord.js'

export class Config {
	public credentials: Credentials
	public developer: Developer
	public settings: Settings
	public logging: Logging

	public constructor(options: ConfigOptions) {
		this.credentials = options.credentials
		this.developer = options.developer
		this.settings = options.settings
		this.logging = options.logging
	}
}

export interface ConfigOptions {
	credentials: Credentials
	developer: Developer
	settings: Settings
	logging: Logging
}

interface Credentials {
	discordBotToken: string
	mongoURI: string
}

interface Developer {
	owners: Snowflake | Snowflake[]
	testServers: Snowflake | Snowflake[]
	debugWebhookURL: string
}

interface Settings {
	prefix: string
	discordBotInviteURL: string
	discordBotSupportServerURL: string
	reloginCooldown: number
}

interface Logging {
	fileLogs: boolean
	webhookLogs: boolean
	discordDebugLOGS: boolean
	discordErrorLOGS: boolean
	discordWarnLOGS: boolean
	unhandledRejectionLOGS: boolean
	uncaughtExceptionLOGS: boolean
	exitLOGS: boolean
}
