const { CommandInteraction, MessageEmbed } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('@discordjs/builders');
const { PermissionFlagsBits } = require('discord-api-types/v10');
const { version } = require('../../config.json');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('timeout')
        .setDescription('TIMEOUT A USER')
        .setDescriptionLocalizations({
            de: 'TIMEOUT EINEN NUTZER'
        })
    	.setDMPermission(false)
    	.addUserOption(option =>
            option.setName('user')
                .setNameLocalizations({
                    de: 'nutzer'
                })
                .setDescription('THE TARGET')
                .setDescriptionLocalizations({
                    de: 'DAS ZIEL'
                })
                .setRequired(true))
        .addIntegerOption(option =>
            option.setName('seconds')
                .setNameLocalizations({
                    de: 'sekunden'
                })
                .setDescription('THE AMOUNT OF TIME IN SECONDS')
                .setDescriptionLocalizations({
                    de: 'DIE ANZAHL DER ZEIT IN SEKUNDEN'
                })
                .setRequired(true))
        .setDefaultMemberPermissions(PermissionFlagsBits.ModerateMembers),
    async execute(interaction, client, lang, vote) {
        // Set Variables
        const user = interaction.options.getUser("user")
        const time = interaction.options.getInteger("seconds")

        // Check if Time Amount is Negative
        if (time < 1) {
            // Create Embed
            let message = new EmbedBuilder()
        		.setTitle('» ERROR')
        		.setDescription('» You have to timeout for atleast **1** Second!')
        		.setFooter({ text: '» ' + version });
            if (lang.toString() == "de") {

                message = new EmbedBuilder()
        		    .setTitle('» FEHLER')
        		    .setDescription('» Du musst mindestens **1** Sekunde Timeouten!')
        		    .setFooter({ text: '» ' + version });
            }
            
            // Send Message
            console.log('[0xBOT] [i] [' + new Date().toLocaleTimeString('en-US', { hour12: false }) + '] [' + interaction.user.id.replace(/\D/g, '') + ' @ ' + interaction.guild.id + '] [CMD] TIMEOUT : NOTENOUGHTIME : ' + time + 's')
            return interaction.reply({ embeds: [message.toJSON()], ephemeral: true })
        }

        // Check if Bot has Permission
        if (!interaction.appPermissions.has('ModerateMembers')) {
            // Create Embed
            let message = new EmbedBuilder()
        		.setTitle('» ERROR')
        		.setDescription('» I dont think I have the **MODERATE MEMBERS** Permission!')
        		.setFooter({ text: '» ' + version });
            if (lang.toString() == "de") {
                message = new EmbedBuilder()
        		    .setTitle('» FEHLER')
        		    .setDescription('» Ich denke nicht, dass ich die **MITGLIEDER IM TIMEOUT** Berechtigung habe!')
        		    .setFooter({ text: '» ' + version });
            }
            
            // Send Message
            console.log('[0xBOT] [i] [' + new Date().toLocaleTimeString('en-US', { hour12: false }) + '] [' + interaction.user.id.replace(/\D/g, '') + ' @ ' + interaction.guild.id + '] [CMD] TIMEOUT : NOPERM')
            return interaction.reply({ embeds: [message.toJSON()], ephemeral: true })
        }

        // Create Embed
        let message = new EmbedBuilder()
        	.setTitle('» TIMEOUT')
        	.setDescription('» Successfully gave <@' + user.toString().replace(/\D/g, '') + '> a Timeout of **' + time + 's**!')
        	.setFooter({ text: '» ' + version });

        if (lang.toString() == 'de') {
            message = new EmbedBuilder()
        	    .setTitle('» TIMEOUT')
        	    .setDescription('» Erfolgreich <@' + user.toString().replace(/\D/g, '') + '> einen Timeout von **' + time + 's** gegeben!')
        	    .setFooter({ text: '» ' + version });
        }

        // Timeout User
        const member = await interaction.guild.members.fetch(user.toString().replace(/\D/g, ''))
        member.timeout(parseInt(time) * 1000, 'TIMEOUT COMMAND FROM ' + interaction.user.id).catch((error) => {return})
        
        // Send Message
        console.log('[0xBOT] [i] [' + new Date().toLocaleTimeString('en-US', { hour12: false }) + '] [' + interaction.user.id.replace(/\D/g, '') + ' @ ' + interaction.guild.id + '] [CMD] TIMEOUT : ' + user.toString().replace(/\D/g, '') + ' : ' + time + 's')
        return interaction.reply({ embeds: [message.toJSON()], ephemeral: true })
    },
};