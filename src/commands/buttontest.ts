import { Interaction, MessageActionRow, MessageButton, MessageComponentInteraction } from 'discord.js'
import { ICommand } from 'wokcommands'

export default {
	category: 'Testing',
	description: 'Testing',

	slash: true,
	testOnly: true,

	callback: async ({ interaction: message, channel }) => {
		const row =  new MessageActionRow().addComponents(
			new MessageButton()
				.setCustomId('random1')
				.setLabel('1')
				.setStyle('SUCCESS'),
			new MessageButton()
				.setCustomId('random2')
				.setLabel('2')
				.setStyle('SUCCESS'),
			new MessageButton()
				.setCustomId('random3')
				.setLabel('3')
				.setStyle('SUCCESS'),
			new MessageButton()
				.setCustomId('random4')
				.setLabel('4')
				.setStyle('SUCCESS'),
			new MessageButton()
				.setCustomId('random5')
				.setLabel('5')
				.setStyle('SUCCESS'),
		)

		const linkRow = new MessageActionRow().addComponents(
			new MessageButton()
				.setStyle('LINK')
				.setLabel('Visit Github')
				.setURL('https://github.com/IsNevis')
		)

		await message.reply({
			content: 'HEllo buttons',
			components: [row, linkRow]
		})

		

		const filter = (buttonInteraction: Interaction) => {
			return message.user.id === buttonInteraction.user.id
		}

		const collector =  channel.createMessageComponentCollector({
			filter,
			componentType: 'BUTTON',
			time: 6 * 1000, // 6 sec
			// time: 2 * 60 * 1000, // 2 minutes
		})

		collector.on('collect', (int: MessageComponentInteraction) => {
			const msg = `You pressed button - ${int.customId}`
			int.reply ({
				content: msg,
				ephemeral: true,
			})
		})

		collector.on('end', async (collection, reason) => {
			channel.send(`**Reason** - ${reason}`)

			collection.forEach((click) => {
				const msg = `${click.user.id} - ${click.customId}`
				channel.send(msg)
				console.log(msg)
			}) 
			message.editReply({
				components: []
			})
		})
	},
} as ICommand