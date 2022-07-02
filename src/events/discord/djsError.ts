import { Client } from 'discord.js'
import { getWebhook } from '../../helpers/utils'
import chalk from 'chalk'
import config from '../../config'

export default (client: Client) => {
    client.on('error', async (error) => {
        if (config.logging.discordErrorLOGS !== true) return
        const info = getWebhook(config.developer.debugWebhookURL)
        if (!info) return

        const errorConsole = `Error: ${error}`
        console.log(chalk.redBright(errorConsole))

        return client.fetchWebhook(info.id, info.token).then((webhook) =>
            // webhook.send({
            //     embeds: [simpleEmbed('A error event has occurred', `Error: ${error}`, 'RED')],
            //     embeds: [simpleEmbed('A error event has occurred', `\`\`\`${stripAnsi(error)}\`\`\``, 'RED')],
            //     username: client.user?.tag,
            //     avatarURL: client.user?.displayAvatarURL({ dynamic: true }),
            // })
            console.log('rarw')
        )
    })
}