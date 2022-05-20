import { ColorResolvable, CommandInteraction, EmojiIdentifierResolvable, Interaction, MessageActionRow, MessageButton, MessageButtonStyleResolvable, MessageComponentInteraction, MessageEmbed, TextChannel } from "discord.js"
import { client } from "../index"
import { version, author } from '../../package.json'

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
    const { member } = interaction

    const filter = (buttonInteraction: Interaction) => { return member?.user.id === buttonInteraction.user.id }

    const collector = channel.createMessageComponentCollector({
        filter,
        componentType: 'BUTTON',
        // time: time * 1000, // 6 secs
        time: 15 * 60 * 1000, // 15 minutes
		idle: 2 * 60 * 1000,
		dispose: true
    })

    collector.on('collect', (int: MessageComponentInteraction) => { if (int.customId === 'cancel') int.update({embeds: [simpleEmbed('Canceled!', 'Interaction was Canceled!', 'GOLD')], components: []}) })
    collector.on('end', async (int: MessageComponentInteraction) => { await int.update({ components: [] }) })

    return collector
}

export function getRandomNumber(min: number, max: number) {
	return Math.floor(Math.random() * (max - min + 1) ) + min;
} 

