const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('@discordjs/builders');
const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const { version } = require('../../config.json');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('beg')
        .setDescription('BEG FOR MONEY')
        .setDescriptionLocalizations({
            de: 'BETTEL FÜR GELD'
        })
    	.setDMPermission(false)
        .addIntegerOption(option =>
            option.setName('amount')
                .setNameLocalizations({
                    de: 'anzahl'
                })
                .setDescription('THE AMOUNT OF MONEY')
                .setDescriptionLocalizations({
                    de: 'DIE ANZAHL AN GELD'
                })
                .setRequired(true))
        .addStringOption(option =>
            option.setName('reason')
                .setNameLocalizations({
                    de: 'grund'
                })
                .setDescription('THE REASON')
                .setDescriptionLocalizations({
                    de: 'DER GRUND'
                })
                .setRequired(false)),
    async execute(interaction, client, lang, vote) {
        // Set Variables
        const amount = interaction.options.getInteger("amount")
        const reason = interaction.options.getString("reason")

        // Check if Balance is Minus
        if (amount < 0) {
            // Create Embed
            let message = new EmbedBuilder()
        		.setTitle('» ERROR')
        		.setDescription('» You cant ask for negative Money!')
        		.setFooter({ text: '» ' + vote + ' » ' + version });

            if (lang.toString() == "de") {
                message = new EmbedBuilder()
        		    .setTitle('» FEHLER')
        		    .setDescription('» Du kannst nicht nach negativem Geld fragen!')
        		    .setFooter({ text: '» ' + vote + ' » ' + version });
            }
            
            // Send Message
            console.log('[0xBOT] [i] [' + new Date().toLocaleTimeString('en-US', { hour12: false }) + '] [' + interaction.user.id.replace(/\D/g, '') + ' @ ' + interaction.guild.id + '] [CMD] BEG : NEGATIVEMONEY : ' + amount + '€')
            return interaction.reply({ embeds: [message.toJSON()], ephemeral: true })
        }

        // Check for Max Amount
        if (amount > 10000) {
            // Create Embed
            let message = new EmbedBuilder()
                .setTitle('» BEGGING')
                .setDescription('» You cant beg that much! **$10000** is the Maximum.')
                .setFooter({ text: '» ' + vote + ' » ' + version });

            if (lang.toString() == "de") {
                message = new EmbedBuilder()
                    .setTitle('» BETTELN')
                    .setDescription('» Du kannst nicht soviel erbetteln! **10000€** ist das Maximum.')
                    .setFooter({ text: '» ' + vote + ' » ' + version });
            }
            
            // Send Message
            console.log('[0xBOT] [i] [' + new Date().toLocaleTimeString('en-US', { hour12: false }) + '] [' + interaction.user.id.replace(/\D/g, '') + ' @ ' + interaction.guild.id + '] [CMD] BEG : TOOMUCHMONEY : ' + amount + '€')
            return interaction.reply({ embeds: [message.toJSON()], ephemeral: true })
        }

        // Get Userinfo
        let userinfo
        userinfo = await client.users.fetch(interaction.user.id);

        // Create Button
        let button = new ActionRowBuilder()
			.addComponents(
				new ButtonBuilder()
					.setLabel('💰 GIVE ' + userinfo.username.toUpperCase() + ' $' + amount)
                    .setCustomId('BEG-' + interaction.user.id + '-' + amount)
					.setStyle(ButtonStyle.Secondary),
			);

        if (lang.toString() == "de") {
            button = new ActionRowBuilder()
			    .addComponents(
				    new ButtonBuilder()
				    	.setLabel('💰 GEBE ' + userinfo.username.toUpperCase() + ' ' + amount + '€')
                        .setCustomId('BEG-' + interaction.user.id + '-' + amount)
				    	.setStyle(ButtonStyle.Secondary),
			    );
        }
        
        // Create Embed
        let message
        if (reason == null) {
      	    message = new EmbedBuilder()
                .setTitle('» BEGGING')
  			    .setDescription('» <@' + interaction.user.id + '> needs Money!')
        	    .setFooter({ text: '» ' + vote + ' » ' + version });

            if (lang.toString() == "de") {
                message = new EmbedBuilder()
                    .setTitle('» BETTELN')
  			        .setDescription('» <@' + interaction.user.id + '> braucht Geld!')
        	        .setFooter({ text: '» ' + vote + ' » ' + version });
            }
        } else {
            message = new EmbedBuilder()
                .setTitle('» BEGGING')
  			    .setDescription('» <@' + interaction.user.id + '> needs Money!\n*"' + reason.toString() + '"*')
        	    .setFooter({ text: '» ' + vote + ' » ' + version });

            if (lang.toString() == "de") {
                message = new EmbedBuilder()
                    .setTitle('» BETTELN')
  			        .setDescription('» <@' + interaction.user.id + '> braucht Geld!\n*"' + reason.toString() + '"*')
        	        .setFooter({ text: '» ' + vote + ' » ' + version });
            }
        }

        // Send Message
        console.log('[0xBOT] [i] [' + new Date().toLocaleTimeString('en-US', { hour12: false }) + '] [' + interaction.user.id.replace(/\D/g, '') + ' @ ' + interaction.guild.id + '] [CMD] BEG : ' + amount + '€')
        return interaction.reply({ embeds: [message.toJSON()], components: [button] })
    },
};