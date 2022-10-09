const { EmbedBuilder } = require('@discordjs/builders');
const { version } = require('../../config.json');

module.exports = {
    data: {
        name: 'beg'
    },
    async execute(interaction, client, lang, vote, reciever, amount, reasontype, reason) {
        // Set Variables
        const balance = await bals.get(interaction.user.id);
        const args = interaction.message.embeds[0].description.split('**')
        let total = parseInt(args[1].match(/\d+/g))+parseInt(amount)

        // Check for enough Money
        if (balance < amount) {
            const missing = cost - balance
            
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
            bot.log(false, interaction.user.id, interaction.guild.id, '[BTN] BEG : ' + reciever + ' : ' + amount + '€ : NOTENOUGHMONEY')
            return interaction.reply({ embeds: [message.toJSON()], ephemeral: true })
        }

        // Check if User is Author
        if (interaction.user.id == reciever) {
            // Create Embed
            let message = new EmbedBuilder()
            	.setTitle('<:EXCLAMATION:1024407166460891166> » ERROR')
  				.setDescription('» You cant give yourself Money?')
            	.setFooter({ text: '» ' + vote + ' » ' + version });

            if (lang == "de") {
                message = new EmbedBuilder()
            	    .setTitle('<:EXCLAMATION:1024407166460891166> » FEHLER')
  				    .setDescription('» Du kannst dir selber kein Geld geben?')
            	    .setFooter({ text: '» ' + vote + ' » ' + version });
            }

            // Send Message
            bot.log(false, interaction.user.id, interaction.guild.id, '[BTN] BEG : ' + reciever + ' : ' + amount + '€ : SAMEPERSON')
            return interaction.reply({ embeds: [message.toJSON()], ephemeral: true })
        }

        // Transfer Money
        bals.rem(interaction.user.id, parseInt(amount))
        bals.add(reciever, parseInt(amount))

        // Create Embeds
        let message
        if (reasontype !== 'SET') {
      	    message = new EmbedBuilder()
                .setTitle('<:DONATE:1024397357988720711> » BEGGING')
  			    .setDescription('» <@' + reciever + '> needs Money!\nTotal Earnings: **$' + total + '**')
        	    .setFooter({ text: '» ' + vote + ' » ' + version });

            if (lang == "de") {
                message = new EmbedBuilder()
                    .setTitle('<:DONATE:1024397357988720711> » BETTELN')
  			        .setDescription('» <@' + reciever + '> braucht Geld!\nInsgesamte Einnahmen: **' + total + '€**')
        	        .setFooter({ text: '» ' + vote + ' » ' + version });
            }
        } else {
            message = new EmbedBuilder()
                .setTitle('<:DONATE:1024397357988720711> » BEGGING')
  			    .setDescription('» <@' + reciever + '> needs Money!\nTotal Earnings: **$' + total + '**\n*"' + reason + '"*')
        	    .setFooter({ text: '» ' + vote + ' » ' + version });

            if (lang == "de") {
                message = new EmbedBuilder()
                    .setTitle('<:DONATE:1024397357988720711> » BETTELN')
  			        .setDescription('» <@' + reciever + '> braucht Geld!\nInsgesamte Einnahmen: **' + total + '€**\n*"' + reason + '"*')
        	        .setFooter({ text: '» ' + vote + ' » ' + version });
            }
        }; let rmessage = new EmbedBuilder()
            .setTitle('<:DONATE:1024397357988720711> » BEGGING')
            .setDescription('» <@' + interaction.user.id + '> gave <@' + reciever + '> **$' + amount + '**!')
            .setFooter({ text: '» ' + vote + ' » ' + version });

        if (lang == "de") {
            rmessage = new EmbedBuilder()
                .setTitle('<:DONATE:1024397357988720711> » BETTELN')
                .setDescription('» <@' + interaction.user.id + '> hat <@' + reciever + '> **' + amount + '€** gegeben!')
                .setFooter({ text: '» ' + vote + ' » ' + version });
        }

        // Send Response Message
        bot.log(false, interaction.user.id, interaction.guild.id, '[BTN] BEG : ' + reciever + ' : ' + amount + '€')
        await interaction.reply({ embeds: [rmessage.toJSON()] })

        // Edit Original Message
        return interaction.message.edit({ embeds: [message.toJSON()] }).catch((error) => {})
    }
}