const { SlashCommandBuilder, EmbedBuilder } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('apiview')
        .setDescription('VIEW AN API')
        .setDescriptionLocalizations({
            de: 'BETRACHTE EINE API'
        })
    	.setDMPermission(false)
        .addStringOption(option =>
            option.setName('name')
                .setDescription('THE NAME')
                .setDescriptionLocalizations({
                    de: 'DER NAME'
                })
                .setRequired(true)
        		.addChoices(
            		// Setup Choices
					{ name: '💻 1', value: '1' },
					{ name: '💻 2', value: '2' },
					{ name: '💻 3', value: '3' },
            		{ name: '💻 4', value: '4' },
            		{ name: '💻 5', value: '5' },
				)),
    async execute(interaction, client, lang, vote) {
        // Set Variables
        const name = interaction.options.getString("name")
        const amount = await bot.apis.get(interaction.user.id)

       	// Check if API even exists
        if (await uapi.get(interaction.user.id + '-' + name) !== 'N-EXIST') {
        	
            // Read File
            const data = await uapi.get(interaction.user.id + '-' + name)
            
        	// Create Embed
        	let message = new EmbedBuilder().setColor(0x37009B)
            	.setTitle('<:CODE:1024400109741551686> » PAPER API EDIT')
  				.setDescription('» The Content of **' + name + '**:\n`' + data + '`\n» The Link:\n**`https://api.paperstudios.de/user/' + interaction.user.id + '/' + name + '`**')
        		.setFooter({ text: '» ' + config.version + ' » SLOTS ' + amount + '/5'});

            if (lang === 'de') {
                message = new EmbedBuilder().setColor(0x37009B)
            	    .setTitle('<:CODE:1024400109741551686> » PAPER API EDIT')
  				    .setDescription('» Der Inhalt von **' + name + '**:\n`' + data + '`\n» Der Link:\n**`https://api.paperstudios.de/user/' + interaction.user.id + '/' + name + '`**')
        		    .setFooter({ text: '» ' + config.version + ' » SLOTS ' + amount + '/5'});
            }

        	// Send Message
        	ctx.log(false, '[CMD] APIVIEW : ' + name + ' : ' + data.toUpperCase())
        	return interaction.reply({ embeds: [message], ephemeral: true })
        } else {
            // Create Embed
            let message = new EmbedBuilder().setColor(0x37009B)
        		.setTitle('<:EXCLAMATION:1024407166460891166> » ERROR')
        		.setDescription('» This API doesnt exist!\n</apicreate:1002107281510506516> to Create one')
        		.setFooter({ text: '» ' + config.version + ' » SLOTS ' + amount + '/5'});

            if (lang === 'de') {
                message = new EmbedBuilder().setColor(0x37009B)
        		    .setTitle('<:EXCLAMATION:1024407166460891166> » FEHLER')
        		    .setDescription('» Diese API existiert nicht!\n</apicreate:1002107281510506516> um eine zu erstellen')
        		    .setFooter({ text: '» ' + config.version + ' » SLOTS ' + amount + '/5'});
            }
            
            // Send Message
            ctx.log(false, '[CMD] APIVIEW : ' + name + ' : NOTFOUND')
            return interaction.reply({ embeds: [message], ephemeral: true })
        }
    }
}