import { MessageComponentInteraction, TextChannel } from 'discord.js'
import { ICommand } from 'wokcommands'
import { getRandomNumber, simpleCollector } from '../../../helpers/utils'
import { oddEven, tossOddEvenEmbed, tossNumberChooseWonEmbed } from './!game-structure'

export default {
	category: 'Games',
	description: 'Play Hand Cricket with a bot!',

	slash: true,
	guildOnly: true,
	testOnly: true,

	callback: async ({ interaction }) => {
        const channel = interaction.channel as TextChannel
        const { member, options } = interaction

        tossOddEvenEmbed( interaction, 'Bot' )


        const botCollector = simpleCollector(interaction)
        
        botCollector.on('collect', (int: MessageComponentInteraction) => {
            const tossNumberChooseOptions = ['one', 'two', 'three', 'four', 'five', 'six'] 

            
            if (int.customId === 'odd' || int.customId === 'even') {

                if (oddEven(int)) {
                    tossNumberChooseWonEmbed( interaction, int )
                } else {
                    tossNumberChooseWonEmbed( interaction, int )
                    channel.send('false')
                }

            } else if (tossNumberChooseOptions.includes(int.customId)) {

                const playerTossNumberWord = int.customId
                let playerTossNumber = 0
                const botTossNumber = getRandomNumber(1, 6)

                switch (playerTossNumberWord) {         
                    case 'one':
                        playerTossNumber = 1
                        break;
                    case 'two':
                        playerTossNumber = 2
                        break;
                    case 'three':
                        playerTossNumber = 3
                        break;
                    case 'four':
                        playerTossNumber = 4
                        break;
                    case 'five':
                        playerTossNumber = 5
                        break;
                    case 'six':
                        playerTossNumber = 6
                        break;
                }

                const totalNumber: number = playerTossNumber + botTossNumber
                console.log(botTossNumber)
                if (totalNumber % 2 === 0) {
                    console.log(`${totalNumber} is even`)
                } else {
                    console.log(`${totalNumber} is odd`)
                }
            } else {
               
            }
        })
	},
} as ICommand