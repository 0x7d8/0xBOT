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
    async execute(interaction, client) {
        // Set Variables
        const zitat = interaction.options.getString("quote")
        const autor = interaction.options.getUser("author")
     
        // Cooldown
        if (cooldown.get(interaction.user.id.replace(/\D/g, '')) - Date.now() > 0) {
            // Translate Vars
        	const timeLeft = cooldown.get(interaction.user.id.replace(/\D/g, '')) - Date.now(); 
            const cdown = timeLeft / 1000;
            
            // Create Embed
            let message = new EmbedBuilder()
            	.setTitle('» ERROR')
  				.setDescription('» You still have a Cooldown of **' + cdown.toFixed(0) + 's**!')
            	.setFooter({ text: '» ' + version });

            if (interaction.guildLocale == "de") {
                message = new EmbedBuilder()
            	    .setTitle('» FEHLER')
  				    .setDescription('» Du hast leider noch einen Cooldown von **' + cdown.toFixed(0) + 's**!')
            	    .setFooter({ text: '» ' + version });
            }
            
            // Send Message
            console.log('[0xBOT] [i] [' + new Date().toLocaleTimeString('en-US', { hour12: false }) + '] [' + interaction.user.id.replace(/\D/g, '') + ' @ ' + interaction.guild.id + '] [CMD] QUOTE : ONCOOLDOWN : ' + cdown.toFixed(0) + 's');
            return await interaction.reply({ embeds: [message.toJSON()], ephemeral: true })
        }
        
        // Check if there is a author specified
        let message
        if (autor == null) {
            const amount = await quts.get(interaction.user.id.replace(/\D/g, '')) + 1;
        	message = new EmbedBuilder()
            	.setTitle('» A WISE QUOTE')
  				.setDescription('» "' + zitat + '" ~<@' + interaction.user.id.replace(/\D/g, '') + '>')
            	.setFooter({ text: '» ' + version + ' » QUOTES: ' + amount});

            if (interaction.guildLocale == "de") {
                message = new EmbedBuilder()
            	    .setTitle('» EIN WEISES ZITAT')
  				    .setDescription('» "' + zitat + '" ~<@' + interaction.user.id.replace(/\D/g, '') + '>')
            	    .setFooter({ text: '» ' + version + ' » ZITATE: ' + amount});
            }
            
            console.log('[0xBOT] [i] [' + new Date().toLocaleTimeString('en-US', { hour12: false }) + '] [' + interaction.user.id.replace(/\D/g, '') + ' @ ' + interaction.guild.id + '] [CMD] QUOTE : ' + zitat.toUpperCase())
        } else {
            const amount = await quts.get(autor.toString().replace(/\D/g, '')) + 1;
        	message = new EmbedBuilder()
            	.setTitle('» A QUOTE')
  				.setDescription('» "' + zitat + '" ~<@' + autor + '>')
            	.setFooter({ text: '» ' + version + ' » QUOTES: ' + amount});

            if (interaction.guildLocale == "de") {
                message = new EmbedBuilder()
            	    .setTitle('» EIN ZITAT')
  				    .setDescription('» "' + zitat + '" ~<@' + autor + '>')
            	    .setFooter({ text: '» ' + version + ' » ZITATE: ' + amount});
            }
            
            console.log('[0xBOT] [i] [' + new Date().toLocaleTimeString('en-US', { hour12: false }) + '] [' + interaction.user.id.replace(/\D/g, '') + ' @ ' + interaction.guild.id + '] [CMD] QUOTE : ' + zitat.toUpperCase() + ' : ~' + autor)
            quts.add(autor.toString().replace(/\D/g, ''), 1);
        }
        
        // Set Cooldown
		cooldown.set(interaction.user.id.replace(/\D/g, ''), Date.now() + time);
        setTimeout(() => cooldown.delete(), time)

        // Send Message
        return await interaction.reply({ embeds: [message.toJSON()] })
    },
};