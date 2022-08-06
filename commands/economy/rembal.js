const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('@discordjs/builders');
const { PermissionFlagsBits } = require('discord-api-types/v10');
const { version } = require('../../config.json');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('rembal')
        .setDescription('ENTFERNE GELD')
    	.setDMPermission(false)
        .addUserOption(option =>
            option.setName('user')
                .setDescription('DER NUTZER')
                .setRequired(true))
        .addIntegerOption(option =>
            option.setName('anzahl')
                .setDescription('DIE ANZAHL')
                .setRequired(true))
    	.setDefaultMemberPermissions(PermissionFlagsBits.BanMembers),
    async execute(interaction) {
        // Count to Global Commands
        addcmd('t-all', 1)
        
        // Count Guild Commands and User
        addcmd('g-' + interaction.guild.id, 1)
        addcmd('u-' + interaction.user.id, 1)
        
        // Set Variables
        const user = interaction.options.getUser("user")
        const anzahl = interaction.options.getInteger("anzahl")

        // Create Embed
      	const message = new EmbedBuilder()
            .setTitle('» GELD ENTFERNEN')
  			.setDescription('» Du hast den Geldstand von <@' + user + '> um **' + anzahl + '€** niedriger gemacht!')
        	.setFooter({ text: '» ' + version });
        
        // Check for Perms
        if (interaction.user.id != '745619551865012274') {
            
            // Create Embed
            const err = new EmbedBuilder()
            	.setTitle('» GELD ENTFERNEN')
  				.setDescription('» Du bist nicht der Bot Besitzer! :P')
        		.setFooter({ text: '» ' + version });
            
            console.log('[0xBOT] [i] [' + interaction.user.id + ' @ ' + interaction.guild.id + '] REMBAL : NOTOWNER')
            return interaction.reply({ embeds: [err.toJSON()], ephemeral: true })
        }
        
        // Remove Money
        rembal('<@' + user + '>', anzahl)

        // Send Message
        console.log('[0xBOT] [i] [' + interaction.user.id + ' @ ' + interaction.guild.id + '] REMBAL : ' + user + ' : ' + anzahl + '€')
        return interaction.reply({ embeds: [message.toJSON()], ephemeral: true })
    },
};