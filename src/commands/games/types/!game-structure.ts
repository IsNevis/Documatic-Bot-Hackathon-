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
export async function tossOddEvenEmbed( interaction: CommandInteraction, type: string) {

    const oddButton = simpleButtons('odd', 'Odd', 'PRIMARY')
    const evenButton = simpleButtons('even', 'Even', 'PRIMARY')

    const row = new MessageActionRow().addComponents(oddButton, evenButton, infoButton, cancelButton)

    const tossOddEvenEmbed = simpleEmbed
    (
        `Hand Cricket (Player vs ${type})`,
        `Please Choose **Odd** or **Even**!
        Click **cancel** to cancel the match`
    )

    await interaction.reply({ embeds: [tossOddEvenEmbed], components: [row], ephemeral: true })
}

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

// Odd and Even NUmber Toss
export function tossNumberChooseWonEmbed( interaction: CommandInteraction, int: MessageComponentInteraction ) {
    const tossNumberChooseEmbed = simpleEmbed(
        'Choose a Number!',
        `You Won the toss! Choose a number between 1 and 6!

        You go first if the sum of both the players number is **${int.customId}**.
        ` 
    )
    
    int.update({ embeds: [tossNumberChooseEmbed], components: [numberRow1, numberRow2] })
}

