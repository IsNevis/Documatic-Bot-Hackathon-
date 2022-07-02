import { ApplicationCommand, Collection } from 'discord.js'
import { ICommand } from 'wokcommands'

export default {
	category: 'General',
	description: 'Replies with Pong!',

	slash: true,
	guildOnly: true,
	testOnly: true,
    ownerOnly: true,

	callback: async ({ client, interaction }) => {
        await client.guilds.fetch()
        const promises: Promise<Collection<string, ApplicationCommand>>[] = []
        client.guilds.cache.each((guild) => {
            promises.push(guild.commands.set([]))
        })
        await Promise.all(promises)

        await client.application!.commands.fetch()
        await client.application!.commands.set([])

        return await interaction.reply(`Removed guild commands and global commands.`)
	},
} as ICommand