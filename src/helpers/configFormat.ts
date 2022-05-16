import { type Snowflake } from 'discord.js'

export class Config {
	public credentials: Credentials
	public prefix: string
	public owners: Snowflake | Snowflake[]
	public testServers: Snowflake | Snowflake[]
	public webhookURL: string

	public constructor(options: ConfigOptions) {
		this.credentials = options.credentials
		this.owners = options.owners
		this.prefix = options.prefix
		this.testServers = options.testServers
		this.webhookURL = options.webhookURL
	}
}

export interface ConfigOptions {
	credentials: Credentials
	prefix: string
	owners: Snowflake | Snowflake[]
	testServers: Snowflake | Snowflake[]
	webhookURL: string
}

interface Credentials {
	token: string
	mongoURI: string
}