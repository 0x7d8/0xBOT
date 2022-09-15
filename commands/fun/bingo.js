const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('@discordjs/builders');
const { version } = require('../../config.json');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('bingo')
        .setDescription('SHOW A BINGO')
        .setDescriptionLocalizations({
            de: 'ZEIGE EIN BINGO'
        })
    	.setDMPermission(false)
    	.addStringOption(option =>
            option.setName('bingo')
                .setDescription('THE BINGO')
                .setDescriptionLocalizations({
                    de: 'DAS BINGO'
                })
                .setRequired(true)
    			.addChoices(
            		{ name: '🗺️ STADT LAND FLUSS', value: 'stadtlandfluss' },
				)),
    async execute(interaction, client, lang, vote) {
        // Set Variables
        const bingo = interaction.options.getString("bingo")

        // Check Guild
        if (interaction.guild.id != '745635382766600202') {
            // Create Embed
            const err = new EmbedBuilder()
        		.setTitle('» FEHLER')
        		.setDescription('» Dieser Befehl ist auf **' + interaction.guild.id + '** nicht erlaubt!\nDas ist kein Bug.')
        		.setFooter({ text: '» ' + vote + ' » ' + version });
            
            return interaction.reply({ embeds: [err.toJSON()], ephemeral: true })
        }
        
        // Create Embeds
        const slf = new EmbedBuilder()
        		.setTitle('» STADT LAND FLUSS BINGO')
        		.setImage("https://img.rjansen.de/bot/stadtlandfluss.png")
        		.setFooter({ text: '» ' + vote + ' » ' + version });

        // Send Message
        console.log('[0xBOT] [i] [' + new Date().toLocaleTimeString('en-US', { hour12: false }) + '] [' + interaction.user.id.replace(/\D/g, '') + ' @ ' + interaction.guild.id + '] [CMD] BINGO : ' + bingo.toUpperCase())
        if (bingo == 'stadtlandfluss') {
            await interaction.reply({ embeds: [slf.toJSON()] })
        }
    },
};