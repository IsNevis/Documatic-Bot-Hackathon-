import { ColorResolvable, CommandInteraction, EmojiIdentifierResolvable, Interaction, MessageButton, MessageButtonStyleResolvable, MessageComponentInteraction, MessageEmbed, TextChannel } from "discord.js"
import { client } from "../index"
import { version, author } from '../../package.json'
import instanceTracker from "../models/instanceTracker"

export function getWebhook(webhookUrl: string) {
	let link = webhookUrl
	link = link.slice(8, link.length)
	const fields = link.split('/')
	if (fields[2] != 'webhooks') return
	const wwebhookId = fields[3]
	const webhookToken = fields[4]
	return { id: wwebhookId, token: webhookToken }
}

export function simpleEmbed( embedTitle: string, embedDescription: string, embedColor?: ColorResolvable, embedThumbnailURL?: string, embedURL?: string, embedImageURL?: string) {
	const embed = new MessageEmbed()
		.setTitle(embedTitle)
		.setDescription(embedDescription)
		.setColor('BLURPLE')
		.setFooter({ text: `Version: v${version} | By ${author}`, iconURL: client.user?.displayAvatarURL() })
		.setTimestamp()

		if (embedColor) embed.setColor(embedColor)
		if (embedThumbnailURL) embed.setThumbnail(embedThumbnailURL)
		if (embedURL) embed.setURL(embedURL)
		if (embedImageURL) embed.setImage(embedImageURL)

	return embed
}

export function simpleButtons( customId: string, label: string, style: MessageButtonStyleResolvable, emoji?: EmojiIdentifierResolvable, url?: string, disabled?: boolean) {
	const button = new MessageButton()
				.setCustomId(customId)
				.setLabel(label)
				.setStyle(style)

	if (disabled) button.setDisabled(disabled)
	if (emoji) button.setEmoji(emoji)
	if (url) button.setURL(url)

	return button
}

export function simpleURLButton( url: string, label: string, emoji?: EmojiIdentifierResolvable, disabled?: boolean) {
	const button = new MessageButton()
				.setURL(url)
				.setLabel(label)
				.setStyle('LINK')

	if (disabled) button.setDisabled(disabled)
	if (emoji) button.setEmoji(emoji)

	return button
}

export function simpleCollector(interaction: CommandInteraction) {
    const channel = interaction.channel as TextChannel

    const filter = (buttonInteraction: Interaction) => { return interaction.member?.user.id === buttonInteraction.user.id }

    const collector = channel.createMessageComponentCollector({
        filter,
        componentType: 'BUTTON',
        // time: 2 * 60 * 1000,
        time: 10 * 1000,
		dispose: true,
    })

    collector.on('collect', async (int: MessageComponentInteraction) => {
		collector.resetTimer()
		if (int.customId === 'cancel') { 
			int.update({embeds: [simpleEmbed('Canceled!', 'Interaction was Canceled!', 'GOLD')], components: []})
			await instanceTracker.deleteMany({_id: int.user.id })
			await client.users.cache.delete(int.user.id)
			await collector.stop()
		}
	})
	
	collector.on('end', async (int: MessageComponentInteraction) => {
		await interaction.editReply({ components: [] })
		await instanceTracker.deleteMany({_id: interaction.user.id })
		await client.users.cache.delete(interaction.user.id)
		await collector.stop()
	})


    return collector
}

export function getRandomNumber(min: number, max: number) {
	return Math.floor(Math.random() * (max - min + 1) ) + min;
} 
