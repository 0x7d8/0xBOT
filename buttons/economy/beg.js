const { EmbedBuilder } = require('@discordjs/builders');
const { version } = require('../../config.json');

module.exports = {
    data: {
        name: 'beg'
    },
    async execute(interaction, reciever, amount) {
        // Set Variables
        const balance = await bals.get(interaction.user.id.replace(/\D/g, ''));

        // Check for enough Money
        if (balance < amount) {
            const missing = cost - balance
            
            // Create Embed
            const err = new EmbedBuilder()
            	.setTitle('» FEHLER')
  				.setDescription('» Du hast dafür nicht genug Geld, dir fehlen **' + missing + '€**!')
            	.setFooter({ text: '» ' + version });
            
            // Send Message
            console.log('[0xBOT] [i] [' + new Date().toLocaleTimeString('en-US', { hour12: false }) + '] [' + interaction.user.id.replace(/\D/g, '') + ' @ ' + interaction.guild.id + '] [BTN] BEG : ' + reciever + ' : ' + amount + '€ : NOTENOUGHMONEY')
            return interaction.reply({ embeds: [err.toJSON()], ephemeral: true })
        }

        // Check if User is Author
        if (interaction.user.id == reciever.toString().replace(/\D/g, '')) {
            // Create Embed
            const err = new EmbedBuilder()
        	    .setTitle('» BETTELN')
  			    .setDescription("» Du kannst dir selber kein Geld geben?")
        	    .setFooter({ text: '» ' + version });

            // Send Message
            console.log('[0xBOT] [i] [' + new Date().toLocaleTimeString('en-US', { hour12: false }) + '] [' + interaction.user.id.replace(/\D/g, '') + ' @ ' + interaction.guild.id + '] [BTN] BEG : ' + reciever + ' : ' + amount + '€ : SAMEPERSON')
            return interaction.reply({ embeds: [err.toJSON()], ephemeral: true })
        }

        // Transfer Money
        bals.rem(interaction.user.id.replace(/\D/g, ''), parseInt(amount))
        bals.add(reciever.toString().replace(/\D/g, ''))
        // Create Embeds
      	const message = new EmbedBuilder()
            .setTitle('» BETTELN')
            .setDescription('» <@' + interaction.user.id + '> hat <@' + reciever.toString().replace(/\D/g, '') + '> **' + amount + '€** gegeben!')
            .setFooter({ text: '» ' + version });

        // Send Message
        console.log('[0xBOT] [i] [' + new Date().toLocaleTimeString('en-US', { hour12: false }) + '] [' + interaction.user.id.replace(/\D/g, '') + ' @ ' + interaction.guild.id + '] [BTN] BEG : ' + reciever + ' : ' + amount + '€')
        return interaction.reply({ embeds: [message.toJSON()] })
    }
}