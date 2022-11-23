const { EmbedBuilder } = require('@discordjs/builders')

module.exports = {
    data: {
        name: 'api'
    },
    async execute(interaction, client, lang, vote, name, action) {
        // Set Variables
        const content = interaction.fields.getTextInputValue('api-content')
		const amount = await bot.apis.get(interaction.user.id)

        if (action === 'edit') {
            // Edit API
            uapi.set(interaction.user.id + '-' + name, content)
            
            // Create Embed
            let message = new EmbedBuilder().setColor(0x37009B)
            	.setTitle('<:CODE:1024400109741551686> » PAPER API EDIT')
  		    	.setDescription('You edited the API **' + name + '**!')
            	.setFooter({ text: '» ' + config.version + ' » SLOTS ' + amount + '/5'});

            if (lang === 'de') {
                message = new EmbedBuilder().setColor(0x37009B)
            	    .setTitle('<:CODE:1024400109741551686> » PAPER API EDIT')
  		    	    .setDescription('Du hast die API **' + name + '** editiert!')
            	    .setFooter({ text: '» ' + config.version + ' » SLOTS ' + amount + '/5'});
            }

            // Send Message
            bot.log(false, interaction.user.id, interaction.guild.id, '[MOD] APIEDIT : ' + name + ' : "' + content.toUpperCase() + '"')
            return interaction.reply({ embeds: [message], ephemeral: true })
        } else if (action === 'create') {
            // Write API
            uapi.set(interaction.user.id + '-' + name, content)

            // Add Used Slots
            bot.apis.add(interaction.user.id, 1)

            // Create Embed
            let message = new EmbedBuilder().setColor(0x37009B)
                .setTitle('<:CODE:1024400109741551686> » PAPER API CREATE')
                .setDescription('You have created a new API!\nIts available here:\n**`https://api.paperstudios.de/user/' + interaction.user.id + '/' + name + '`**!')
                .setFooter({ text: '» ' + config.version + ' » SLOTS ' + (amount+1) + '/5'});

            if (lang === 'de') {
                message = new EmbedBuilder().setColor(0x37009B)
                    .setTitle('<:CODE:1024400109741551686> » PAPER API CREATE')
                    .setDescription('Du hast eine neue API erstellt!\nSie ist hier verfügbar:\n**`https://api.paperstudios.de/user/' + interaction.user.id + '/' + name + '`**!')
                    .setFooter({ text: '» ' + config.version + ' » SLOTS ' + (amount+1) + '/5'});
            }

            // Send Message
            bot.log(false, interaction.user.id, interaction.guild.id, '[MOD] APICREATE : ' + name + ' : "' + content.toUpperCase() + '"')
            return interaction.reply({ embeds: [message], ephemeral: true })
        }
    }
}