import { MessageComponentInteraction } from 'discord.js'
import { ICommand } from 'wokcommands'
import { getRandomNumber, simpleCollector, simpleEmbed } from '../../../helpers/utils'
import { booleanOddEven, playerOddEvenTossEmbed, numberTossCheck, numberTossTotal, botBatBallToss, startBotBatGameEmbed, stringToNumber, botPlayerBatGameEmbed, botGameWicketsOverEmbed, numberTossEmbed, batBallTossEmbed, botPlayerBallGameEmbed, cannotHaveMultipleGenjutsuEmbed, botGameOverEmbed } from './!game-structure'
import instanceTracker from '../../../models/instanceTracker'

export default {
	category: 'Games',
	description: 'Play Hand Cricket with a bot!',

	slash: true,
	guildOnly: true,
	testOnly: true,

    options: [
        {
            type: 'NUMBER',
            name: 'wickets',
            description: 'Total number of wickets!',
            required: false,
        }
    ],

	callback: async ({ interaction, client }) => {
        const data = await instanceTracker.findOne({ _id: interaction.user.id })
        if (data) return cannotHaveMultipleGenjutsuEmbed(interaction)
        await instanceTracker.create({ _id: interaction.user.id })


        const botCollector = simpleCollector(interaction)

        let isPlayerOddEvenTossComplete = false
        let isPlayerNumberTossComplete = false
        let isBatBallTossComplete = false
        let isStartBotGameComplete = false

        let totalWickets: number
        if (interaction.options.getNumber('wickets')) {
            totalWickets = interaction.options.getNumber('wickets') as number
        } else {
            totalWickets =  1
        }
        let wicketsLeft = totalWickets
        
        let gamePlayerScore: number = 0 
        let gameBotScore: number = 0 
        let gameTotalPlayerScore: number = 0
        let gameTotalBotScore: number = 0

        let buttonPlayerOddEvenToss: string = ''
        let buttonNumberToss: string = ''

        let currentPlayerRole: string = ''
        let playerInitialRole: string = ''
        let botInitialRole: string = ''

        let didPlayerWinToss: boolean = false
        let didPlayerGuessCorrectToss: boolean = false

        let didPlayerBat: boolean = false
        let didPlayerBall: boolean = false

        playerOddEvenTossEmbed( interaction, 'Bot' )

        botCollector.on('collect', async (int: MessageComponentInteraction) => {
            if (int.customId === 'odd' || int.customId === 'even' && isPlayerOddEvenTossComplete === false) {
                buttonPlayerOddEvenToss = int.customId
                didPlayerWinToss = booleanOddEven(int)

                numberTossEmbed( int, didPlayerWinToss )
                isPlayerOddEvenTossComplete = true
            } else if (numberTossCheck(int) && isPlayerNumberTossComplete === false) {
                buttonNumberToss = int.customId

                const tossNumberTotal = numberTossTotal(int)
                botInitialRole = botBatBallToss()
                didPlayerGuessCorrectToss = tossNumberTotal % 2 === 0

                batBallTossEmbed(int, tossNumberTotal, didPlayerGuessCorrectToss, botInitialRole)
                isPlayerNumberTossComplete = true
            } else if (int.customId === 'bat' || int.customId === 'ball' && isBatBallTossComplete === false) {
                playerInitialRole = int.customId
                startBotBatGameEmbed(int)
                isBatBallTossComplete = true
            } else if (int.customId === 'startBotGame' && isStartBotGameComplete === false) {
                if (didPlayerGuessCorrectToss) {
                     switch (playerInitialRole) {
                         case 'bat':
                            currentPlayerRole = 'bat'
                            botPlayerBatGameEmbed( int, gameTotalPlayerScore, wicketsLeft, totalWickets, gamePlayerScore, gameBotScore)
                            break;
                         case 'ball':
                            currentPlayerRole = 'ball'
                            botPlayerBallGameEmbed( int, gameTotalPlayerScore, wicketsLeft, totalWickets, gamePlayerScore, gameBotScore)
                            break;
                     
                     }
                } else {
                    switch (botInitialRole) {
                        case 'bat':
                            currentPlayerRole = 'ball'
                            botPlayerBallGameEmbed( int, gameTotalPlayerScore, wicketsLeft, totalWickets, gamePlayerScore, gameBotScore)
                            break;
                        case 'ball':
                            currentPlayerRole = 'bat'
                            botPlayerBatGameEmbed( int, gameTotalPlayerScore, wicketsLeft, totalWickets, gamePlayerScore, gameBotScore)
                            break;
                    
                    }
                }

                isStartBotGameComplete = true             
            } else if ( int.customId === 'continue' || numberTossCheck(int) && isStartBotGameComplete === true ) {
                gamePlayerScore = stringToNumber(int.customId)
                gameBotScore = getRandomNumber(1,5)
                
                if (gameTotalPlayerScore >= 100 || gameTotalBotScore >= 100) {
                    botGameOverEmbed(int, gameTotalPlayerScore, gameTotalBotScore, totalWickets)
                    await instanceTracker.deleteMany({_id: interaction.user.id })
                    client.users.cache.delete(interaction.user.id)
                    botCollector.stop()
                }
                if (!didPlayerBat && !didPlayerBall) {
                    switch (currentPlayerRole) {
                        case 'bat':
                            playerBat(int)
                            break;
                        case 'ball':
                            playerBall(int)
                            break;
                    }
                } else if(didPlayerBat && !didPlayerBall) {
                    playerBall(int)
                } else if(!didPlayerBat && didPlayerBall) {
                    playerBat(int)
                } else if (didPlayerBat && didPlayerBall) {
                    botGameOverEmbed(int, gameTotalPlayerScore, gameTotalBotScore, totalWickets)
                    await instanceTracker.deleteMany({_id: interaction.user.id })
                    client.users.cache.delete(interaction.user.id)
                    botCollector.stop()
                }

            } else {
                return
            }
        })

        function playerBat (int: MessageComponentInteraction) {
            if (gamePlayerScore === gameBotScore) {
                wicketsLeft--
                if (wicketsLeft <= 0) {
                    wicketsLeft = totalWickets
                    didPlayerBat = true
                    return botGameWicketsOverEmbed(int, gameTotalPlayerScore, gameTotalBotScore, totalWickets, didPlayerBat, didPlayerBall, gamePlayerScore, gameBotScore)
                }
            } else {
                gameTotalPlayerScore = gameTotalPlayerScore + gamePlayerScore
            }
            botPlayerBatGameEmbed( int, gameTotalPlayerScore, wicketsLeft, totalWickets, gamePlayerScore, gameBotScore)
        }

        function playerBall (int: MessageComponentInteraction) {
            if (gamePlayerScore === gameBotScore) {
                wicketsLeft--
                if (wicketsLeft <= 0) {
                    wicketsLeft = totalWickets
                    didPlayerBall = true
                    return botGameWicketsOverEmbed(int, gameTotalPlayerScore, gameTotalBotScore, totalWickets, didPlayerBat, didPlayerBall, gamePlayerScore, gameBotScore)
                }
            } else {
                gameTotalBotScore = gameTotalBotScore + gameBotScore
            }
            botPlayerBallGameEmbed( int, gameTotalBotScore, wicketsLeft, totalWickets, gamePlayerScore, gameBotScore)
        }
	},
} as ICommand

/*
mECAHNISM FOR WIN AT 100
total stores gets to next instance
make player goes first even when balling
*/