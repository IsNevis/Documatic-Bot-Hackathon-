import { MessageComponentInteraction, TextChannel } from 'discord.js'
import { ICommand } from 'wokcommands'
import { getRandomNumber, simpleCollector, simpleEmbed } from '../../../helpers/utils'
import { oddEven, oddEvenChooseEmbed, tossNumberChooseEmbed, numberChooseCheck, tossNumberChooseTotal, batBallChooseEmbed, batBallChooseBotEmbed, botBatBallChoose, startBotGameEmbed, stringToNumber, botGameEmbed } from './!game-structure'

export default {
	category: 'Games',
	description: 'Play Hand Cricket with a bot!',

	slash: true,
	guildOnly: true,
	testOnly: true,

	callback: async ({ interaction }) => {
        const channel = interaction.channel as TextChannel
        const { member, options } = interaction
        const botCollector = simpleCollector(interaction)

        let isOddEvenChooseComplete = false
        let isTossNumberChooseComplete = false
        let isBatBallChooseComplete = false
        let isStartBotGameComplete = false
        let isBotGameComplete = false

        let configGameWickets = 3
        let gameWickets = configGameWickets - 1
        let gameTotalPlayerScore: number = 0
        let gameTotalBotScore: number = 0

        oddEvenChooseEmbed( interaction, 'Bot' )
        
        botCollector.on('collect', async (int: MessageComponentInteraction) => {
            if (int.customId === 'odd' || int.customId === 'even' && isOddEvenChooseComplete === false) {
                if (oddEven(int)) tossNumberChooseEmbed( interaction, int, 'won' )
                else tossNumberChooseEmbed( interaction, int, 'loss' )
                isOddEvenChooseComplete = true
            } else if (numberChooseCheck(int) && isTossNumberChooseComplete === false) {
                const totalNumber = tossNumberChooseTotal(int)
                const botBatBallChooseWord = botBatBallChoose()

                if (totalNumber % 2 === 0) {
                    batBallChooseEmbed(interaction, int, totalNumber)
                } else {
                    batBallChooseBotEmbed(interaction, int, totalNumber, botBatBallChooseWord)
                }
                isTossNumberChooseComplete = true
            } else if (int.customId === 'bat' || int.customId === 'ball' && isBatBallChooseComplete === false) {
                startBotGameEmbed(interaction, int)
                isBatBallChooseComplete = true
            } else if (int.customId === 'startBotGame' || numberChooseCheck(int) && isStartBotGameComplete === false) {
                
                botGameEmbed(interaction, int, gameTotalPlayerScore)
                isStartBotGameComplete = true
                // if (numberChooseCheck(int)) {
                //     wickets = wickets - 1
                //     for (let i = 0; i < wickets; i ) {
                //         console.log(wickets + ': ' + i)

                //         let playerScore: number = stringToNumber(int.customId)
                //         let botScore: number = getRandomNumber(0,6)
                //         console.log(`player: ${playerScore}, bot: ${botScore}`)

                //         botGameEmbed(interaction, int, totalPlayerScore)
    
                //         if (playerScore === botScore) {
                //             i++
                //         } else {
                //             totalPlayerScore = totalPlayerScore + playerScore
                //             // botGameEmbed(interaction, int, totalPlayerScore, botScore)
                //         }
                //         isStartBotGameComplete = true
                //     }
                // } else {
                //     return
                // }                
            } else if (numberChooseCheck(int) && isStartBotGameComplete === true && isBotGameComplete === false) {
                
                console.log(gameWickets)

                let playerScore: number = stringToNumber(int.customId)
                let botScore: number = getRandomNumber(0,6)
                console.log(`player: ${playerScore}, bot: ${botScore}`)

                if (playerScore === botScore) {
                    gameWickets--
                    if (gameWickets < 0) isBotGameComplete = true
                } else {
                    gameTotalPlayerScore = gameTotalPlayerScore + playerScore
                }
                
                botGameEmbed(interaction, int, gameTotalPlayerScore)


                // const wickets = gameWickets - 1

                // for (let i = 0; i < wickets; i ) {
                //     console.log(wickets + ': ' + i)

                //     let playerScore: number = stringToNumber(int.customId)
                //     let botScore: number = getRandomNumber(0,6)
                //     console.log(`player: ${playerScore}, bot: ${botScore}`)

                //     botGameEmbed(interaction, int, gameTotalPlayerScore)

                //     if (playerScore === botScore) {
                //         i++
                //     } else {
                //         gameTotalPlayerScore = gameTotalPlayerScore + playerScore
                //     }
                // }
            } else {
               return
            }
        })
	},
} as ICommand