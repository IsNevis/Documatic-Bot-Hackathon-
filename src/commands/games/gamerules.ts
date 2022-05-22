import { ICommand } from 'wokcommands'
import { simpleEmbed } from '../../helpers/utils';

export default {
	category: 'Games',
	description: 'Explain the rules of the game!',
  
	slash: true,
	guildOnly: true,  
	testOnly: true,
  
	callback: async ({ interaction }) => {
		const rulesEmbed = simpleEmbed(
			'Official Rules of Hand Cricket',
			'One player bowls and the other bats. The player has to type any number between 0 and 6 (representing the number of fingers) , once the player enters, the bot will generate a random number as it\'s output.',
		)
		
		rulesEmbed
			.addField('\u200b', '\u200b')
			.addFields(
					{ name: '1. ', value: 'If the number of fingers are equal, the batsman is out.', inline: true },
					{ name: '2. ', value: 'If the number of fingers do not match, the number of fingers on the batsman is the number of runs scored.', inline: true },
			)
  
		return interaction.reply({ embeds: [rulesEmbed] })
	},
  } as ICommand