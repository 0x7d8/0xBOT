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
    async execute(interaction, client, lang, vote) {
        // Set Variables
        const user = interaction.options.getUser("user")
        const anzahl = interaction.options.getInteger("amount")
        const money = await bals.get(interaction.user.id);

        // Check if Balance is Minus
        if (anzahl < 0) {
            // Create Embed
            let message = new EmbedBuilder()
        		.setTitle('<:EXCLAMATION:1024407166460891166> » ERROR')
        		.setDescription('» You cant send negative Money!')
        		.setFooter({ text: '» ' + vote + ' » ' + version });

            if (lang == "de") {
                message = new EmbedBuilder()
        		    .setTitle('<:EXCLAMATION:1024407166460891166> » FEHLER')
        		    .setDescription('» Du kannst kein negatives Geld senden!')
        		    .setFooter({ text: '» ' + vote + ' » ' + version });
            }
            
            // Send Message
            bot.log(false, interaction.user.id, interaction.guild.id, '[CMD] PAY : NEGATIVEMONEY : ' + anzahl + '€')
            return interaction.reply({ embeds: [message.toJSON()], ephemeral: true })
        }

        // Check if Target is Bot
        const userinfo = await client.users.fetch(user);
        if (userinfo.bot == true) {
            // Create Embed
            let message = new EmbedBuilder()
        		.setTitle('<:EXCLAMATION:1024407166460891166> » ERROR')
        		.setDescription('» You cant give a Bot Money!')
        		.setFooter({ text: '» ' + vote + ' » ' + version });

            if (lang == "de") {
                message = new EmbedBuilder()
        		    .setTitle('<:EXCLAMATION:1024407166460891166> » FEHLER')
        		    .setDescription('» Du kannst einem Bot kein Geld geben!')
        		    .setFooter({ text: '» ' + vote + ' » ' + version });
            }
            
            // Send Message
            bot.log(false, interaction.user.id, interaction.guild.id, '[CMD] PAY : ' + user.id + ' : BOT : ' + anzahl + '€')
            return interaction.reply({ embeds: [message.toJSON()], ephemeral: true })
        }
        
        // Create Embeds
      	let message = new EmbedBuilder()
            .setTitle('<:BAG:1024389219558367292> » GIVE MONEY')
  			.setDescription('» You gave <@' + user.id + '> **$' + anzahl + '**!')
        	.setFooter({ text: '» ' + vote + ' » ' + version });
        let err2 = new EmbedBuilder()
            .setTitle('<:EXCLAMATION:1024407166460891166> » ERROR')
  			.setDescription('» You cant give yourself Money!')
        	.setFooter({ text: '» ' + vote + ' » ' + version });

        if (lang == "de") {
            message = new EmbedBuilder()
                .setTitle('<:BAG:1024389219558367292> » GELD GEBEN')
  			    .setDescription('» Du hast <@' + user.id + '> **' + anzahl + '€** gegeben!')
        	    .setFooter({ text: '» ' + vote + ' » ' + version });
            err2 = new EmbedBuilder()
                .setTitle('<:EXCLAMATION:1024407166460891166> » FEHLER')
  			    .setDescription('» Du kannst dir nicht selber Geld überweisen!')
        	    .setFooter({ text: '» ' + vote + ' » ' + version });
        }
        
        // Check if User is Author
        if (interaction.user.id == user.id) {
            return interaction.reply({ embeds: [err2.toJSON()], ephemeral: true })
        }
        
        // Set Money
        if (money >= anzahl) {
        	bals.rem(interaction.user.id, anzahl)
        	bals.add(user.id, anzahl)
        } else {
            const missing = anzahl - money
            
            // Create Embed
            let message = new EmbedBuilder()
            	.setTitle('<:EXCLAMATION:1024407166460891166> » ERROR')
  				.setDescription('» You dont have enough Money for that, you are missing **$' + missing + '**!')
            	.setFooter({ text: '» ' + vote + ' » ' + version });

            if (lang == "de") {
                message = new EmbedBuilder()
            	    .setTitle('<:EXCLAMATION:1024407166460891166> » FEHLER')
  				    .setDescription('» Du hast dafür nicht genug Geld, dir fehlen **' + missing + '€**!')
            	    .setFooter({ text: '» ' + vote + ' » ' + version });
            }
            
            // Send Message
            bot.log(false, interaction.user.id, interaction.guild.id, '[CMD] PAY : ' + user + ' : NOTENOUGHMONEY : ' + anzahl + '€')
            return interaction.reply({ embeds: [message.toJSON()], ephemeral: true })
        }

        // Send Message
        bot.log(false, interaction.user.id, interaction.guild.id, '[CMD] PAY : ' + user.id + ' : ' + anzahl + '€')
        return interaction.reply({ embeds: [message.toJSON()] })
    },
};