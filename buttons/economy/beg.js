const { EmbedBuilder } = require('@discordjs/builders');
const { version } = require('../../config.json');

module.exports = {
    data: {
        name: 'beg'
    },
    async execute(interaction, client, lang, vote, reciever, amount) {
        // Set Variables
        const balance = await bals.get(interaction.user.id.replace(/\D/g, ''));

        // Check for enough Money
        if (balance < amount) {
            const missing = cost - balance
            
            // Create Embed
            let message = new EmbedBuilder()
            	.setTitle('» ERROR')
  				.setDescription('» You dont have enough Money for that, you are missing **$' + missing + '**!')
            	.setFooter({ text: '» ' + vote + ' » ' + version });

            if (lang.toString() == "de") {
                message = new EmbedBuilder()
            	    .setTitle('» FEHLER')
  				    .setDescription('» Du hast dafür nicht genug Geld, dir fehlen **' + missing + '€**!')
            	    .setFooter({ text: '» ' + vote + ' » ' + version });
            }
            
            // Send Message
            console.log('[0xBOT] [i] [' + new Date().toLocaleTimeString('en-US', { hour12: false }) + '] [' + interaction.user.id.replace(/\D/g, '') + ' @ ' + interaction.guild.id + '] [BTN] BEG : ' + reciever.toString().replace(/\D/g, '') + ' : ' + amount + '€ : NOTENOUGHMONEY')
            return interaction.reply({ embeds: [message.toJSON()], ephemeral: true })
        }

        // Check if User is Author
        if (interaction.user.id == reciever.toString().replace(/\D/g, '')) {
            // Create Embed
            let message = new EmbedBuilder()
            	.setTitle('» ERROR')
  				.setDescription('» You cant give yourself Money?')
            	.setFooter({ text: '» ' + vote + ' » ' + version });

            if (lang.toString() == "de") {
                message = new EmbedBuilder()
            	    .setTitle('» FEHLER')
  				    .setDescription('» Du kannst dir selber kein Geld geben?')
            	    .setFooter({ text: '» ' + vote + ' » ' + version });
            }

            // Send Message
            console.log('[0xBOT] [i] [' + new Date().toLocaleTimeString('en-US', { hour12: false }) + '] [' + interaction.user.id.replace(/\D/g, '') + ' @ ' + interaction.guild.id + '] [BTN] BEG : ' + reciever.toString().replace(/\D/g, '') + ' : ' + amount + '€ : SAMEPERSON')
            return interaction.reply({ embeds: [message.toJSON()], ephemeral: true })
        }

        // Transfer Money
        bals.rem(interaction.user.id.replace(/\D/g, ''), parseInt(amount))
        bals.add(reciever.toString().replace(/\D/g, ''), parseInt(amount))

        // Create Embeds
      	let message = new EmbedBuilder()
            .setTitle('» BEGGING')
            .setDescription('» <@' + interaction.user.id + '> gave <@' + reciever.toString().replace(/\D/g, '') + '> **$' + amount + '**!')
            .setFooter({ text: '» ' + vote + ' » ' + version });

        if (lang.toString() == "de") {
            message = new EmbedBuilder()
                .setTitle('» BETTELN')
                .setDescription('» <@' + interaction.user.id + '> hat <@' + reciever.toString().replace(/\D/g, '') + '> **' + amount + '€** gegeben!')
                .setFooter({ text: '» ' + vote + ' » ' + version });
        }

        // Send Message
        console.log('[0xBOT] [i] [' + new Date().toLocaleTimeString('en-US', { hour12: false }) + '] [' + interaction.user.id.replace(/\D/g, '') + ' @ ' + interaction.guild.id + '] [BTN] BEG : ' + reciever.toString().replace(/\D/g, '') + ' : ' + amount + '€')
        return interaction.reply({ embeds: [message.toJSON()] })
    }
}