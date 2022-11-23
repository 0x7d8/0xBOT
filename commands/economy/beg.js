const { SlashCommandBuilder, EmbedBuilder } = require('@discordjs/builders')
const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js')

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
            let message = new EmbedBuilder().setColor(0x37009B)
        		.setTitle('<:EXCLAMATION:1024407166460891166> » ERROR')
        		.setDescription('» You cant ask for negative Money!')
        		.setFooter({ text: '» ' + vote + ' » ' + config.version });

            if (lang === 'de') {
                message = new EmbedBuilder().setColor(0x37009B)
        		    .setTitle('<:EXCLAMATION:1024407166460891166> » FEHLER')
        		    .setDescription('» Du kannst nicht nach negativem Geld fragen!')
        		    .setFooter({ text: '» ' + vote + ' » ' + config.version });
            }
            
            // Send Message
            bot.log(false, interaction.user.id, interaction.guild.id, '[CMD] BEG : NEGATIVEMONEY : ' + amount + '€')
            return interaction.reply({ embeds: [message], ephemeral: true })
        }

        // Check for Max Amount
        if (amount > 10000) {
            // Create Embed
            let message = new EmbedBuilder().setColor(0x37009B)
                .setTitle('» BEGGING')
                .setDescription('» You cant beg that much! **$10000** is the Maximum.')
                .setFooter({ text: '» ' + vote + ' » ' + config.version });

            if (lang === 'de') {
                message = new EmbedBuilder().setColor(0x37009B)
                    .setTitle('» BETTELN')
                    .setDescription('» Du kannst nicht soviel erbetteln! **10000€** ist das Maximum.')
                    .setFooter({ text: '» ' + vote + ' » ' + config.version });
            }
            
            // Send Message
            bot.log(false, interaction.user.id, interaction.guild.id, '[CMD] BEG : TOOMUCHMONEY : ' + amount + '€')
            return interaction.reply({ embeds: [message], ephemeral: true })
        }

        // Set Reason Type
        let reasontype
        if (reason === null) { reasontype = 'NONE' }
        else { reasontype = 'SET' }
        let reasonres = reason
        if (reason === null) { reasonres = 'NULL' }

        // Create Button
        let button = new ActionRowBuilder()
			.addComponents(
				new ButtonBuilder()
					.setLabel('GIVE ' + interaction.user.username.toUpperCase() + ' $' + amount)
                    .setEmoji('1024382935618572299')
                    .setCustomId('BEG-' + interaction.user.id + '-' + amount + '-' + reasontype + '-' + reasonres.toString())
					.setStyle(ButtonStyle.Secondary),
			);

        if (lang === 'de') {
            button = new ActionRowBuilder()
			    .addComponents(
				    new ButtonBuilder()
				    	.setLabel('GEBE ' + interaction.user.username.toUpperCase() + ' ' + amount + '€')
                        .setEmoji('1024382935618572299')
                        .setCustomId('BEG-' + interaction.user.id + '-' + amount + '-' + reasontype + '-' + reasonres.toString())
				    	.setStyle(ButtonStyle.Secondary),
			    );
        }
        
        // Create Embed
        let message
        if (reason == null) {
      	    message = new EmbedBuilder().setColor(0x37009B)
                .setTitle('<:DONATE:1024397357988720711> » BEGGING')
  			    .setDescription('» <@' + interaction.user.id + '> needs Money!\nTotal Earnings: **$0**')
        	    .setFooter({ text: '» ' + vote + ' » ' + config.version });

            if (lang === 'de') {
                message = new EmbedBuilder().setColor(0x37009B)
                    .setTitle('<:DONATE:1024397357988720711> » BETTELN')
  			        .setDescription('» <@' + interaction.user.id + '> braucht Geld!\nInsgesamte Einnahmen: **0€**')
        	        .setFooter({ text: '» ' + vote + ' » ' + config.version });
            }
        } else {
            message = new EmbedBuilder().setColor(0x37009B)
                .setTitle('<:DONATE:1024397357988720711> » BEGGING')
  			    .setDescription('» <@' + interaction.user.id + '> needs Money!\nTotal Earnings: **$0**\n*"' + reason.toString() + '"*')
        	    .setFooter({ text: '» ' + vote + ' » ' + config.version });

            if (lang === 'de') {
                message = new EmbedBuilder().setColor(0x37009B)
                    .setTitle('<:DONATE:1024397357988720711> » BETTELN')
  			        .setDescription('» <@' + interaction.user.id + '> braucht Geld!\nInsgesamte Einnahmen: **0€**\n*"' + reason.toString() + '"*')
        	        .setFooter({ text: '» ' + vote + ' » ' + config.version });
            }
        }

        // Send Message
        bot.log(false, interaction.user.id, interaction.guild.id, '[CMD] BEG : ' + amount + '€')
        return interaction.reply({ embeds: [message], components: [button] })
    }
}