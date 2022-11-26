const { SlashCommandBuilder, EmbedBuilder } = require('discord.js')

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
                    de: 'amount'
                })
                .setDescription('THE AMOUNT OF MONEY')
                .setDescriptionLocalizations({
                    de: 'DIE amount VON GELD'
                })
                .setRequired(true)),
    async execute(interaction, client, lang, vote) {
        // Set Variables
        const user = interaction.options.getUser("user")
        const amount = interaction.options.getInteger("amount")

        const balance = await bot.money.get(interaction.user.id)

        // Check if Balance is Minus
        if (amount < 0) {
            // Create Embed
            let message = new EmbedBuilder().setColor(0x37009B)
        		.setTitle('<:EXCLAMATION:1024407166460891166> » ERROR')
        		.setDescription('» You cant send negative Money!')
        		.setFooter({ text: '» ' + vote + ' » ' + config.version });

            if (lang === 'de') {
                message = new EmbedBuilder().setColor(0x37009B)
        		    .setTitle('<:EXCLAMATION:1024407166460891166> » FEHLER')
        		    .setDescription('» Du kannst kein negatives Geld senden!')
        		    .setFooter({ text: '» ' + vote + ' » ' + config.version });
            }
            
            // Send Message
            bot.log(false, interaction.user.id, interaction.guild.id, '[CMD] PAY : NEGATIVEMONEY : ' + amount + '€')
            return interaction.reply({ embeds: [message], ephemeral: true })
        }

        // Check if Target is Bot
        if (user.bot) {
            // Create Embed
            let message = new EmbedBuilder().setColor(0x37009B)
        		.setTitle('<:EXCLAMATION:1024407166460891166> » ERROR')
        		.setDescription('» You cant give a Bot Money!')
        		.setFooter({ text: '» ' + vote + ' » ' + config.version });

            if (lang === 'de') {
                message = new EmbedBuilder().setColor(0x37009B)
        		    .setTitle('<:EXCLAMATION:1024407166460891166> » FEHLER')
        		    .setDescription('» Du kannst einem Bot kein Geld geben!')
        		    .setFooter({ text: '» ' + vote + ' » ' + config.version });
            }
            
            // Send Message
            bot.log(false, interaction.user.id, interaction.guild.id, '[CMD] PAY : ' + user.id + ' : BOT : ' + amount + '€')
            return interaction.reply({ embeds: [message], ephemeral: true })
        }

        // Check if User is Author
        if (interaction.user.id === user.id) {
            // Create Embed
            let message = new EmbedBuilder().setColor(0x37009B)
            	.setTitle('<:EXCLAMATION:1024407166460891166> » ERROR')
  				.setDescription('» You cant pay yourself Money?')
            	.setFooter({ text: '» ' + vote + ' » ' + config.version });

            if (lang === 'de') {
                message = new EmbedBuilder().setColor(0x37009B)
            	    .setTitle('<:EXCLAMATION:1024407166460891166> » FEHLER')
  				    .setDescription('» Du kannst dir selber kein Geld überweisen?')
            	    .setFooter({ text: '» ' + vote + ' » ' + config.version });
            }

            // Send Message
            bot.log(false, interaction.user.id, interaction.guild.id, '[CMD] PAY : ' + user.id + ' : ' + amount + '€ : SAMEPERSON')
            return interaction.reply({ embeds: [message], ephemeral: true })
        }

        // Check for enough Money
        if (balance < amount) {
            const missing = amount - balance
            
            // Create Embed
            let message = new EmbedBuilder().setColor(0x37009B)
            	.setTitle('<:EXCLAMATION:1024407166460891166> » ERROR')
  				.setDescription('» You dont have enough Money for that, you are missing **$' + missing + '**!')
            	.setFooter({ text: '» ' + vote + ' » ' + config.version });

            if (lang === 'de') {
                message = new EmbedBuilder().setColor(0x37009B)
            	    .setTitle('<:EXCLAMATION:1024407166460891166> » FEHLER')
  				    .setDescription('» Du hast dafür nicht genug Geld, dir fehlen **' + missing + '€**!')
            	    .setFooter({ text: '» ' + vote + ' » ' + config.version });
            }
            
            // Send Message
            bot.log(false, interaction.user.id, interaction.guild.id, '[CMD] PAY : ' + user.id + ' : NOTENOUGHMONEY : ' + amount + '€')
            return interaction.reply({ embeds: [message], ephemeral: true })
        }

        // Log Transaction
        const transaction = await bot.transactions.log({
            success: true,
            sender: {
                id: interaction.user.id,
                amount: amount,
                type: 'negative'
            }, reciever: {
                id: user.id,
                amount: amount,
                type: 'positive'
            }
        })
        
        // Create Embeds
      	let message = new EmbedBuilder().setColor(0x37009B)
            .setTitle('<:BAG:1024389219558367292> » GIVE MONEY')
  			.setDescription('» You gave <@' + user.id + '> **$' + amount + '**!\n\nID: ' + transaction.id)
        	.setFooter({ text: '» ' + vote + ' » ' + config.version });

        if (lang === 'de') {
            message = new EmbedBuilder().setColor(0x37009B)
                .setTitle('<:BAG:1024389219558367292> » GELD GEBEN')
  			    .setDescription('» Du hast <@' + user.id + '> **' + amount + '€** gegeben!\n\nID: ' + transaction.id)
        	    .setFooter({ text: '» ' + vote + ' » ' + config.version });
        }
        
        // Set Money
        bot.money.rem(interaction.guild.id, interaction.user.id, amount)
        bot.money.add(interaction.guild.id, user.id, amount)

        // Send Message
        bot.log(false, interaction.user.id, interaction.guild.id, '[CMD] PAY : ' + user.id + ' : ' + amount + '€')
        return interaction.reply({ embeds: [message] })
    }
}