const { Intents, Collection } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('@discordjs/builders');
const { version } = require('../../../config.json');
const cooldown = new Collection();
let time = 45000;

module.exports = {
    data: new SlashCommandBuilder()
        .setName('quote')
        .setDescription('QUOTE SOMETHING')
        .setDescriptionLocalizations({
            de: 'ZITIERE ETWAS'
        })
    	.setDMPermission(false)
        .addStringOption(option =>
            option.setName('quote')
                .setNameLocalizations({
                    de: 'zitat'
                })
                .setDescription('THE QUOTE')
                .setDescriptionLocalizations({
                    de: 'DAS ZITAT'
                })
                .setRequired(true))
        .addUserOption(option =>
            option.setName('author')
                .setNameLocalizations({
                    de: 'autor'
                })
                .setDescription('THE AUTHOR')
                .setDescriptionLocalizations({
                    de: 'DER AUTOR'
                })
                .setRequired(false)),
    async execute(interaction, client, lang, vote) {
        // Check if Quotes are Enabled in Server
        const qes = await gopt.get(interaction.guild.id + '-QUOTES')
        if (parseInt(qes) == 1) {
            // Create Embed
            let message = new EmbedBuilder()
        		.setTitle('<:EXCLAMATION:1024407166460891166> » ERROR')
        		.setDescription('» Quotes are disabled on this Server!')
        		.setFooter({ text: '» ' + vote + ' » ' + version });

            if (lang == "de") {
                message = new EmbedBuilder()
        		    .setTitle('<:EXCLAMATION:1024407166460891166> » FEHLER')
        		    .setDescription('» Zitate sind auf diesem Server deaktiviert!')
        		    .setFooter({ text: '» ' + vote + ' » ' + version });
            }
            
            // Send Message
            bot.log(false, interaction.user.id, interaction.guild.id, '[CMD] QUOTE : DISABLED')
            return interaction.reply({ embeds: [message.toJSON()], ephemeral: true })
        }

        // Set Variables
        const zitat = interaction.options.getString("quote")
        const autor = interaction.options.getUser("author")
     
        // Cooldown
        if (cooldown.get(interaction.user.id) - Date.now() > 0) {
            // Translate Vars
        	const timeLeft = cooldown.get(interaction.user.id) - Date.now(); 
            const cdown = timeLeft / 1000;
            
            // Create Embed
            let message = new EmbedBuilder()
            	.setTitle('<:EXCLAMATION:1024407166460891166> » ERROR')
  				.setDescription('» You still have a Cooldown of **' + cdown.toFixed(0) + 's**!')
            	.setFooter({ text: '» ' + vote + ' » ' + version });

            if (lang == "de") {
                message = new EmbedBuilder()
            	    .setTitle('<:EXCLAMATION:1024407166460891166> » FEHLER')
  				    .setDescription('» Du hast leider noch einen Cooldown von **' + cdown.toFixed(0) + 's**!')
            	    .setFooter({ text: '» ' + vote + ' » ' + version });
            }
            
            // Send Message
            bot.log(false, interaction.user.id, interaction.guild.id, '[CMD] QUOTE : ONCOOLDOWN : ' + cdown.toFixed(0) + 's');
            return interaction.reply({ embeds: [message.toJSON()], ephemeral: true })
        }
        
        // Check if there is a author specified
        let message
        if (autor == null) {
            const amount = await quts.get(interaction.user.id) + 1;
        	message = new EmbedBuilder()
            	.setTitle('<:QUOTES:1024406448127623228> » A WISE QUOTE')
  				.setDescription('» "' + zitat + '" ~<@' + interaction.user.id + '>')
            	.setFooter({ text: '» ' + version + ' » QUOTES: ' + amount});

            if (lang == "de") {
                message = new EmbedBuilder()
            	    .setTitle('<:QUOTES:1024406448127623228> » EIN WEISES ZITAT')
  				    .setDescription('» "' + zitat + '" ~<@' + interaction.user.id + '>')
            	    .setFooter({ text: '» ' + version + ' » ZITATE: ' + amount});
            }
            
            bot.log(false, interaction.user.id, interaction.guild.id, '[CMD] QUOTE : ' + zitat.toUpperCase())
        } else {
            const amount = await quts.get(autor.toString().replace(/\D/g, '')) + 1;
        	message = new EmbedBuilder()
            	.setTitle('<:QUOTES:1024406448127623228> » A QUOTE')
  				.setDescription('» "' + zitat + '" ~<@' + autor + '>')
            	.setFooter({ text: '» ' + version + ' » QUOTES: ' + amount});

            if (lang == "de") {
                message = new EmbedBuilder()
            	    .setTitle('<:QUOTES:1024406448127623228> » EIN ZITAT')
  				    .setDescription('» "' + zitat + '" ~<@' + autor + '>')
            	    .setFooter({ text: '» ' + version + ' » ZITATE: ' + amount});
            }
            
            bot.log(false, interaction.user.id, interaction.guild.id, '[CMD] QUOTE : ' + zitat.toUpperCase() + ' : ~' + autor)
            quts.add(autor.toString().replace(/\D/g, ''), 1);
        }
        
        // Set Cooldown
		cooldown.set(interaction.user.id, Date.now() + time);
        setTimeout(() => cooldown.delete(), time)

        // Send Message
        return interaction.reply({ embeds: [message.toJSON()] })
    },
};