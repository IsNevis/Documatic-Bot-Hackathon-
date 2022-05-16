import { type Snowflake } from 'discord.js'

export class Config {
	public credentials: Credentials
	public prefix: string
	public owners: Snowflake | Snowflake[]
	public testServers: Snowflake | Snowflake[]
	public debugWebhookURL: string

	public constructor(options: ConfigOptions) {
		this.credentials = options.credentials
		this.owners = options.owners
		this.prefix = options.prefix
		this.testServers = options.testServers
		this.debugWebhookURL = options.debugWebhookURL
	}
}

export interface ConfigOptions {
	credentials: Credentials
	prefix: string
	owners: Snowflake | Snowflake[]
	testServers: Snowflake | Snowflake[]
	debugWebhookURL: string
}

interface Credentials {
	token: string
	mongoURI: string
}