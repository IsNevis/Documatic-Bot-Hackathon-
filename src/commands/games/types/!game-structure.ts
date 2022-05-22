import { CommandInteraction, MessageActionRow, MessageComponentInteraction } from "discord.js"
import { getRandomNumber, simpleButtons, simpleEmbed, simpleURLButton } from "../../../helpers/utils"

const cancelButton = simpleButtons('cancel', 'Cancel', 'DANGER')
const infoButton = simpleURLButton('https://duckduckgo.com/?q=how+to+play+hand+cricket', 'Info')
const continueButton = simpleButtons('continue', 'Continue', 'PRIMARY')

const oneButton = simpleButtons('one', 'One', 'PRIMARY')
const twoButton = simpleButtons('two', 'Two', 'PRIMARY')
const threeButton = simpleButtons('three', 'Three', 'PRIMARY')
const fourButton = simpleButtons('four', 'Four', 'PRIMARY')
const fiveButton = simpleButtons('five', 'Five', 'PRIMARY')
const sixButton = simpleButtons('six', 'Six', 'PRIMARY')


const continueRow = new MessageActionRow().addComponents(continueButton, infoButton, cancelButton)
const numberRow1 = new MessageActionRow().addComponents(oneButton, twoButton, threeButton, fourButton)
const numberRow2 = new MessageActionRow().addComponents(fiveButton, sixButton, infoButton, cancelButton)


// Embeds

export async function playerOddEvenTossEmbed( interaction: CommandInteraction, type: string) {
    const oddButton = simpleButtons('odd', 'Odd', 'PRIMARY')
    const evenButton = simpleButtons('even', 'Even', 'PRIMARY')

    const playerOddEvenTossRow = new MessageActionRow().addComponents(oddButton, evenButton, infoButton, cancelButton)

    const playerOddEvenTossEmbed = simpleEmbed
    (
        `Hand Cricket (Player vs ${type})`,
        `Please Choose **Odd** or **Even**!
        Click **cancel** to cancel the match
        
        Note: This game has been modified to fit under time limitations!
        `
    )

    await interaction.reply({ embeds: [playerOddEvenTossEmbed], components: [playerOddEvenTossRow], ephemeral: true })
}

export async function invalidButtonEmbed( int: MessageComponentInteraction ) {
    const invalidButtonEmbed = simpleEmbed(
        'Invalid Interaction!',
        `${int.customId} is an invalid Button Interaction!` 
    ).setColor('GOLD')
    
    await int.update({ embeds: [invalidButtonEmbed], components: [] })
}

export function cannotHaveMultipleGenjutsuEmbed( interaction: CommandInteraction ) {
    const invalidButtonEmbed = simpleEmbed(
        'Multiple instance is not Supported!',
        `Cannot have multiple instance for the same player at once!!` 
    ).setColor('GOLD')
    
    interaction.reply({ embeds: [invalidButtonEmbed] })
}

export async function numberTossEmbed( int: MessageComponentInteraction, didPlayerWinToss: boolean ) {
    let playerTossResult: string

    switch (didPlayerWinToss) {
        case true:
            playerTossResult = 'won'
            break;
        case false:
            playerTossResult = 'lost'
            break;
    }

    const numberTossEmbed = simpleEmbed(
        'Choose a Number!',
        `You ${playerTossResult} the toss! Choose a number between 1 and 6!

        You get to choose first if you want to **Bat** or **Ball**, if the sum of both the players number is **${int.customId}**.
        ` 
    )
    
    await int.update({ embeds: [numberTossEmbed], components: [numberRow1, numberRow2] })
}

export async function batBallTossEmbed( int: MessageComponentInteraction, totalNumber: number, didPlayerGuessCorrectToss: boolean, botBatBallTossWord: string ) {
    const batButton = simpleButtons('bat', 'Bat', 'PRIMARY')
    const ballButton = simpleButtons('ball', 'Ball', 'PRIMARY')
    const startBotGameButton = simpleButtons('startBotGame', 'Start', 'SUCCESS')

    const startBotGameRow = new MessageActionRow().addComponents(startBotGameButton, infoButton, cancelButton)
    const batBallTossRow = new MessageActionRow().addComponents(batButton, ballButton, infoButton, cancelButton)

    const batBallTossEmbed = simpleEmbed(
        'Bat or Ball!',
        `Woah! The total numbed is ${totalNumber}!
        ` 
    )

    if (didPlayerGuessCorrectToss) {
        batBallTossEmbed.addField('\u200b', 'You were correct! \n Do you wanna **bat** first or **ball** first? The bot gets the other one!')
        await int.update({ embeds: [batBallTossEmbed], components: [batBallTossRow] })
    } else {
        batBallTossEmbed.addField('\u200b', `Aw! It seems like the bot wants to **${botBatBallTossWord}**! So you get the other one!`)
        await int.update({ embeds: [batBallTossEmbed], components: [startBotGameRow] })
    }
}

export async function startBotBatGameEmbed( int: MessageComponentInteraction ) {
    const startBotGameButton = simpleButtons('startBotGame', 'Start', 'SUCCESS')
    const startBotGameRow = new MessageActionRow().addComponents(startBotGameButton, infoButton, cancelButton)
    
    const startBotBatGameEmbed = simpleEmbed(
        'Are you Ready to play!',
        `
        You are going to **${int.customId}** first!

        Click on **Start** to Start the games
        ` 
    )
    
    await int.update({ embeds: [startBotBatGameEmbed], components: [startBotGameRow] })
}

export async function botPlayerBatGameEmbed( int: MessageComponentInteraction, totalPlayerScore: number, wicketsLeft: number, totalWickets: number,  gamePlayerScore: number, gameBotScore: number) {
    
    const botPlayerBatGameEmbed = simpleEmbed(
        `Choose a Number (${totalPlayerScore}/100)! | Batting`,
        `
        Total Player Score: **${totalPlayerScore}**
        Wickets: **${wicketsLeft}/${totalWickets}**

        You: **${gamePlayerScore}**, Bot: **${gameBotScore}**

        Click on a number between **1** and **6**!
        Click **info** for info and **cancel** to stop the match!
        `
    )
    
    await int.update({ embeds: [botPlayerBatGameEmbed], components: [numberRow1, numberRow2] })
}

export async function botPlayerBallGameEmbed( int: MessageComponentInteraction, totalBotScore: number, wicketsLeft: number, totalWickets: number, gamePlayerScore: number, gameBotScore: number) {
    
    const botPlayerBallGameEmbed = simpleEmbed(
        `Choose a Number (${totalBotScore}/100)! | Balling`,
        `
        Total Bot Score: **${totalBotScore}**
        Wickets: **${wicketsLeft}/${totalWickets}**

        You: **${gamePlayerScore}**, Bot: **${gameBotScore}**

        Click on a number between **1** and **6**!
        Click **info** for info and **cancel** to stop the match!
        `
    )
    
    await int.update({ embeds: [botPlayerBallGameEmbed], components: [numberRow1, numberRow2] })
}

export async function botGameWicketsOverEmbed( int: MessageComponentInteraction, totalPlayerScore: number, totalBotScore: number, totalWickets: number, didPlayerBat: boolean, didPlayerBall: boolean, gamePlayerScore: number, gameBotScore: number) {
        
    const botGameWicketsOverEmbed = simpleEmbed(
        `STOP!!`,
        `
        All wickets are gone!
        You: **${gamePlayerScore}**, Bot: **${gameBotScore}**


        Total Player Score: **${totalPlayerScore}**
        Total Bot Score: **${totalBotScore}**
        Total Wickets: **${totalWickets}**
        `
    )
        await int.update({ embeds: [botGameWicketsOverEmbed], components: [continueRow] })
}

export async function botGameOverEmbed( int: MessageComponentInteraction, totalPlayerScore: number, totalBotScore: number, totalWickets: number) {
    
    const botGameOverEmbed = simpleEmbed(
        `Game Over!`,
        `
        Total Player Score: **${totalPlayerScore}**
        Total Bot Score: **${totalBotScore}**
        Total Wickets: **${totalWickets}**
        `
    )

    await int.update({ embeds: [botGameOverEmbed], components: [] })
}

// Functions

export function booleanOddEven( int: MessageComponentInteraction ) {
    const tossOddEven: number = getRandomNumber(0,1)
    const playerOddEven = int.customId

    let playerOddEvenNumber

    switch (playerOddEven) {
        case 'odd':
            playerOddEvenNumber = 0
            break;
        case 'even':
            playerOddEvenNumber = 1
            break;
    }

    return tossOddEven === playerOddEvenNumber
}

export function numberTossCheck(int: MessageComponentInteraction) {
    const numberTossOptions = ['one', 'two', 'three', 'four', 'five', 'six'] 
    return numberTossOptions.includes(int.customId)
}

export function numberTossTotal (int: MessageComponentInteraction) {
    const botNumberToss = getRandomNumber(1, 6)
    const playerNumberToss = stringToNumber(int.customId)

    return playerNumberToss + botNumberToss
}

export function botBatBallToss () {
    const botBatBallNumberToss = getRandomNumber(0, 1)
    let botBatBallTossWord: string = ''

    switch (botBatBallNumberToss) {         
        case 0:
            botBatBallTossWord = 'bat'
            break;
        case 1:
            botBatBallTossWord = 'ball'
            break;
    }

    return botBatBallTossWord
}

export function stringToNumber(numberString: string) {
    let stringNumber = 0

    switch (numberString) {         
        case 'one':
            stringNumber = 1
            break;
        case 'two':
            stringNumber = 2
            break;
        case 'three':
            stringNumber = 3
            break;
        case 'four':
            stringNumber = 4
            break;
        case 'five':
            stringNumber = 5
            break;
        case 'six':
            stringNumber = 6
            break;
    }

    return stringNumber
}