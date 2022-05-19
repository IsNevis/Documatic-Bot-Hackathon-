import { MessageComponentInteraction, TextChannel } from 'discord.js'
import { ICommand } from 'wokcommands'
import { simpleCollector } from '../../../helpers/utils'
import { oddEven, tossOddEvenEmbed } from './!game-structure'

export default {
	category: 'Games',
	description: 'Play Hand Cricket with a Player!',

	slash: true,
	guildOnly: true,
	testOnly: true,

	callback: async ({ interaction }) => {
        const channel = interaction.channel as TextChannel
        const { member, options } = interaction

        tossOddEvenEmbed( interaction, 'Player' )

        simpleCollector(interaction).on('collect', (int: MessageComponentInteraction) => {
            if (int.customId === 'odd' || int.customId === 'even') {

                const result = oddEven(int)
                const resultString: string = result as any
                
                channel.send(resultString.toString())
                console.log(resultString.toString())
            }
        })
	},
} as ICommand