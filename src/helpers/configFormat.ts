import { type Snowflake } from 'discord.js'

export class Config {
	public credentials: Credentials
	public developer: Developer
	public settings: Settings

	public constructor(options: ConfigOptions) {
		this.credentials = options.credentials
		this.developer = options.developer
		this.settings = options.settings
	}
}

export interface ConfigOptions {
	credentials: Credentials
	developer: Developer
	settings: Settings
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
	reloginCooldown: number
}