const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('@discordjs/builders');
const { version } = require('../../config.json');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('pay')
        .setDescription('GIVE SOMEONE MONEY')
        .setDescriptionLocalizations({
            de: 'GEBE JEMANDEN GELD'
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
                .setDescription('THE AMOUNT OF MONEY')
                .setDescriptionLocalizations({
                    de: 'DIE ANZAHL VON GELD'
                })
                .setRequired(true)),
    async execute(interaction, client) {
        // Set Variables
        const user = interaction.options.getUser("user")
        const anzahl = interaction.options.getInteger("amount")
        const money = await bals.get(interaction.user.id.replace(/\D/g, ''));

        // Check if Balance is Minus
        if (anzahl < 0) {
            // Create Embed
            let message = new EmbedBuilder()
        		.setTitle('» ERROR')
        		.setDescription('» You cant send negative Money!')
        		.setFooter({ text: '» ' + version });

            if (interaction.guildLocale == "de") {
                message = new EmbedBuilder()
        		    .setTitle('» FEHLER')
        		    .setDescription('» Du kannst kein negatives Geld senden!')
        		    .setFooter({ text: '» ' + version });
            }
            
            // Send Message
            console.log('[0xBOT] [i] [' + new Date().toLocaleTimeString('en-US', { hour12: false }) + '] [' + interaction.user.id.replace(/\D/g, '') + ' @ ' + interaction.guild.id + '] [CMD] PAY : NEGATIVEMONEY : ' + anzahl + '€')
            return await interaction.reply({ embeds: [message.toJSON()], ephemeral: true })
        }

        // Check if Target is Bot
        const userinfo = await client.users.fetch(user);
        if (userinfo.bot == true) {
            // Create Embed
            let message = new EmbedBuilder()
        		.setTitle('» ERROR')
        		.setDescription('» You cant give a Bot Money!')
        		.setFooter({ text: '» ' + version });

            if (interaction.guildLocale == "de") {
                message = new EmbedBuilder()
        		    .setTitle('» FEHLER')
        		    .setDescription('» Du kannst einem Bot kein Geld geben!')
        		    .setFooter({ text: '» ' + version });
            }
            
            // Send Message
            console.log('[0xBOT] [i] [' + new Date().toLocaleTimeString('en-US', { hour12: false }) + '] [' + interaction.user.id.replace(/\D/g, '') + ' @ ' + interaction.guild.id + '] [CMD] PAY : ' + user + ' : BOT : ' + anzahl + '€')
            return await interaction.reply({ embeds: [message.toJSON()], ephemeral: true })
        }
        
        // Create Embeds
      	let message = new EmbedBuilder()
            .setTitle('» GIVE MONEY')
  			.setDescription('» You gave <@' + user + '> **$' + anzahl + '**!')
        	.setFooter({ text: '» ' + version });
        let err2 = new EmbedBuilder()
            .setTitle('» GIVE MONEY')
  			.setDescription('» You cant give yourself Money!')
        	.setFooter({ text: '» ' + version });

        if (interaction.guildLocale == "de") {
            message = new EmbedBuilder()
                .setTitle('» GELD GEBEN')
  			    .setDescription('» Du hast <@' + user + '> **' + anzahl + '€** gegeben!')
        	    .setFooter({ text: '» ' + version });
            err2 = new EmbedBuilder()
                .setTitle('» GELD GEBEN')
  			    .setDescription('» Du kannst dir nicht selber Geld überweisen!')
        	    .setFooter({ text: '» ' + version });
        }
        
        // Check if User is Author
        if (interaction.user.id.replace(/\D/g, '') == user) {
            return await interaction.reply({ embeds: [err2.toJSON()], ephemeral: true })
        }
        
        // Set Money
        if (money >= anzahl) {
        	bals.rem(interaction.user.id.replace(/\D/g, ''), anzahl)
        	bals.add(user.toString().replace(/\D/g, ''), anzahl)
        } else {
            const missing = anzahl - money
            
            // Create Embed
            let message = new EmbedBuilder()
            	.setTitle('» ERROR')
  				.setDescription('» You dont have enough Money for that, you are missing **$' + missing + '**!')
            	.setFooter({ text: '» ' + version });

            if (interaction.guildLocale == "de") {
                message = new EmbedBuilder()
            	    .setTitle('» FEHLER')
  				    .setDescription('» Du hast dafür nicht genug Geld, dir fehlen **' + missing + '€**!')
            	    .setFooter({ text: '» ' + version });
            }
            
            // Send Message
            console.log('[0xBOT] [i] [' + new Date().toLocaleTimeString('en-US', { hour12: false }) + '] [' + interaction.user.id.replace(/\D/g, '') + ' @ ' + interaction.guild.id + '] [CMD] PAY : ' + user + ' : NOTENOUGHMONEY : ' + anzahl + '€')
            return await interaction.reply({ embeds: [message.toJSON()], ephemeral: true })
        }

        // Send Message
        console.log('[0xBOT] [i] [' + new Date().toLocaleTimeString('en-US', { hour12: false }) + '] [' + interaction.user.id.replace(/\D/g, '') + ' @ ' + interaction.guild.id + '] [CMD] PAY : ' + user + ' : ' + anzahl + '€')
        return await interaction.reply({ embeds: [message.toJSON()] })
    },
};