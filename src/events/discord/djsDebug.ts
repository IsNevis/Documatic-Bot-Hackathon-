import { Client } from 'discord.js'
import { getWebhook, simpleEmbed } from '../../helpers/utils'
import chalk from 'chalk'
import config from '../../config'

export default (client: Client) => {
    client.on('debug', async (message) => {
        if (config.logging.discordDebugLOGS !== true) return
        const info = getWebhook(config.developer.debugWebhookURL)
        if (!info) return

        const debug = `Debug: ${message}`
        console.log(chalk.grey(debug))

        return client.fetchWebhook(info.id, info.token).then((webhook) =>
            // webhook.send({
            //     embeds: [simpleEmbed('A debug event has occurred', `Debug: ${message}`, 'GREY')],
            //     embeds: [simpleEmbed('A debug event has occurred', `\`\`\`${stripAnsi(message)}\`\`\``, 'GREY')],
            //     username: client.user?.tag,
            //     avatarURL: client.user?.displayAvatarURL({ dynamic: true }),
            // })
            console.log('rarw')
        )
    })
}