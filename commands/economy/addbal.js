const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('@discordjs/builders');
const { PermissionFlagsBits } = require('discord-api-types/v10');
const { version } = require('../../config.json');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('addbal')
        .setDescription('ADD MONEY')
        .setDescriptionLocalizations({
            de: 'ADDIERE GELD'
        })
    	.setDMPermission(false)
        .addUserOption(option =>
            option.setName('user')
                .setNameLocalizations({
                    de: 'nutzer'
                })
                .setDescription('THE USER')
                .setDescriptionLocalizations({
                    de: 'DER NUTZER'
                })
                .setRequired(true))
        .addIntegerOption(option =>
            option.setName('amount')
                .setNameLocalizations({
                    de: 'anzahl'
                })
                .setDescription('THE AMOUNT')
                .setDescriptionLocalizations({
                    de: 'DIE ANZAHL'
                })
                .setRequired(true))
    	.setDefaultMemberPermissions(PermissionFlagsBits.BanMembers),
    async execute(interaction, client) {
        // Set Variables
        const user = interaction.options.getUser("user")
        const amount = interaction.options.getInteger("amount")

        // Create Embed
      	const message = new EmbedBuilder()
            .setTitle('» GELD GEBEN')
  			.setDescription('» Du hast den Geldstand von <@' + user + '> um **' + amount + '€** erhöht!')
        	.setFooter({ text: '» ' + version });
        
        // Check for Perms
        if (interaction.user.id.replace(/\D/g, '') != '745619551865012274') {
            
            // Create Embed
            const err = new EmbedBuilder()
            	.setTitle('» GELD GEBEN')
  				.setDescription('» Du bist nicht der Bot Besitzer! :P')
        		.setFooter({ text: '» ' + version });
            
            console.log('[0xBOT] [i] [' + new Date().toLocaleTimeString('en-US', { hour12: false }) + '] [' + interaction.user.id.replace(/\D/g, '') + ' @ ' + interaction.guild.id + '] [CMD] ADDBAL : NOTOWNER')
            return await interaction.reply({ embeds: [err.toJSON()], ephemeral: true })
        }
        
        // Add Money
        bals.add(user.toString().replace(/\D/g, ''), amount)

        // Send Message
        console.log('[0xBOT] [i] [' + new Date().toLocaleTimeString('en-US', { hour12: false }) + '] [' + interaction.user.id.replace(/\D/g, '') + ' @ ' + interaction.guild.id + '] [CMD] ADDBAL : ' + user + ' : ' + amount + '€')
        return await interaction.reply({ embeds: [message.toJSON()], ephemeral: true })
    },
};