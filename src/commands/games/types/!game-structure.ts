import { ButtonInteraction, CacheType, CommandInteraction, InteractionCollector, MessageActionRow, MessageComponentInteraction } from "discord.js"
import { getRandomNumber, simpleButtons, simpleEmbed, simpleURLButton } from "../../../helpers/utils"
const wait = require('node:timers/promises').setTimeout

const cancelButton = simpleButtons('cancel', 'Cancel', 'DANGER')
const infoButton = simpleURLButton('https://www.google.com', 'Info')

const oneButton = simpleButtons('one', 'One', 'PRIMARY')
const twoButton = simpleButtons('two', 'Two', 'PRIMARY')
const threeButton = simpleButtons('three', 'Three', 'PRIMARY')
const fourButton = simpleButtons('four', 'Four', 'PRIMARY')
const fiveButton = simpleButtons('five', 'Five', 'PRIMARY')
const sixButton = simpleButtons('six', 'Six', 'PRIMARY')


const numberRow1 = new MessageActionRow().addComponents(oneButton, twoButton, threeButton, fourButton)
const numberRow2 = new MessageActionRow().addComponents(fiveButton, sixButton, infoButton, cancelButton)



// Odd and Even Function
export async function oddEvenChooseEmbed( interaction: CommandInteraction, type: string) {

    const oddButton = simpleButtons('odd', 'Odd', 'PRIMARY')
    const evenButton = simpleButtons('even', 'Even', 'PRIMARY')

    const oddEvenChooseRow = new MessageActionRow().addComponents(oddButton, evenButton, infoButton, cancelButton)

    const oddEvenChooseEmbed = simpleEmbed
    (
        `Hand Cricket (Player vs ${type})`,
        `Please Choose **Odd** or **Even**!
        Click **cancel** to cancel the match`
    )

    await interaction.reply({ embeds: [oddEvenChooseEmbed], components: [oddEvenChooseRow], ephemeral: true })
}


// Odd and Even NUmber Toss
export function tossNumberChooseEmbed( interaction: CommandInteraction, int: MessageComponentInteraction, result: string ) {
    const tossNumberChooseEmbed = simpleEmbed(
        'Choose a Number!',
        `You ${result} the toss! Choose a number between 1 and 6!

        You get to choose first if you want to go bat or Ball, if the sum of both the players number is **${int.customId}**.
        ` 
    )
    
    // interaction.editReply({ embeds: [tossNumberChooseEmbed], components: [numberRow1, numberRow2] })
    int.update({ embeds: [tossNumberChooseEmbed], components: [numberRow1, numberRow2] })
}

export function batBallChooseEmbed( interaction: CommandInteraction, int: MessageComponentInteraction, totalNumber: number ) {

    const batButton = simpleButtons('bat', 'Bat', 'PRIMARY')
    const ballButton = simpleButtons('ball', 'Ball', 'PRIMARY')

    const batBallChooseRow = new MessageActionRow().addComponents(batButton, ballButton, infoButton, cancelButton)

    const batBallChooseEmbed = simpleEmbed(
        'Bat or Ball!',
        `The total number is ${totalNumber} and it seems to match what you choose during toss! So you get to choose!

        What do you want to do first? **Bat** or **Ball**.
        ` 
    )
    
    // interaction.editReply({ embeds: [batBallChooseEmbed], components: [batBallChooseRow] })
    int.update({ embeds: [batBallChooseEmbed], components: [batBallChooseRow] })
}

export function batBallChooseBotEmbed( interaction: CommandInteraction, int: MessageComponentInteraction, totalNumber: number, botBatBallChoose: string ) {
    
    const startBotGameButton = simpleButtons('startBotGame', 'Start', 'SUCCESS')
    const startBotGameRow = new MessageActionRow().addComponents(startBotGameButton, infoButton, cancelButton)
    
    const batBallChooseBotEmbed = simpleEmbed(
        'Bot is Correct!',
        `The total number is ${totalNumber} and it seems to match what the bot choose during toss! So the bot gets to choose!

        The bot has decided to **${botBatBallChoose}**!
        Click on **Start** to Start the games
        ` 
    )
    
    // interaction.editReply({ embeds: [batBallChooseBotEmbed], components: [continueRow] })
    int.update({ embeds: [batBallChooseBotEmbed], components: [startBotGameRow] })
}

export function startBotGameEmbed( interaction: CommandInteraction, int: MessageComponentInteraction) {
    
    const startBotGameButton = simpleButtons('startBotGame', 'Start', 'SUCCESS')
    const startBotGameRow = new MessageActionRow().addComponents(startBotGameButton, infoButton, cancelButton)
    
    const startBotGameEmbed = simpleEmbed(
        'Are you Ready to play!',
        `
        You are going to **${int.customId}** first!

        Click on **Start** to Start the games
        ` 
    )
    
    // interaction.editReply({ embeds: [batBallChooseBotEmbed], components: [continueRow] })
    int.update({ embeds: [startBotGameEmbed], components: [startBotGameRow] })
}


export function botGameEmbed( interaction: CommandInteraction, int: MessageComponentInteraction, totalPlayerScore: number) {
    
    // const botGameRow = new MessageActionRow().addComponents()
    
    const botGameEmbed = simpleEmbed(
        `Choose a Number (${totalPlayerScore}/100)!`,
        `
        Click on a number between **1** and **6**!
        Click **info** for info and **cancel** to stop the match!
        `
    )
    
    // interaction.editReply({ embeds: [batBallChooseBotEmbed], components: [continueRow] })
    int.update({ embeds: [botGameEmbed], components: [numberRow1, numberRow2] })
}

// 

export function oddEven( int: MessageComponentInteraction ) {
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

    const tossOddEven: number = getRandomNumber(0,1)
    
    if (tossOddEven === playerOddEvenNumber) return true
    else return false
}

export function numberChooseCheck(int: MessageComponentInteraction) {
    const numberChooseOptions = ['one', 'two', 'three', 'four', 'five', 'six'] 
    return numberChooseOptions.includes(int.customId)
}

export function tossNumberChooseTotal (int: MessageComponentInteraction) {
    const botTossNumber = getRandomNumber(1, 6)
    const playerTossNumber = stringToNumber(int.customId)

    return playerTossNumber + botTossNumber
}

export function botBatBallChoose () {
    const botBatBallChooseNumber = getRandomNumber(0, 1)
    let botBatBallChoose: string = ''

    switch (botBatBallChooseNumber) {         
        case 0:
            botBatBallChoose = 'Bat'
            break;
        case 1:
            botBatBallChoose = 'Ball'
            break;
    }

    return botBatBallChoose
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