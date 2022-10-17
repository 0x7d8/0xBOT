const { SlashCommandBuilder, EmbedBuilder } = require('@discordjs/builders');
const { version } = require('../../config.json');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('apiremove')
        .setDescription('REMOVE AN API')
        .setDescriptionLocalizations({
            de: 'ENTFERNE EINE API'
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
        const amount = await bot.apis.get(interaction.user.id);
        const newamount = amount - 1

       	// Check if API even exists
        if (await uapi.get(interaction.user.id + '-' + name) !== 'N-EXIST') {
        	// Create Embed
        	let message = new EmbedBuilder().setColor('#37009B')
            	.setTitle('<:CODE:1024400109741551686> » PAPER API REMOVE')
  				.setDescription('You have deleted the API **' + name + '**!')
        		.setFooter({ text: '» ' + version + ' » SLOTS ' + newamount + '/5'});

            if (lang === 'de') {
                message = new EmbedBuilder().setColor('#37009B')
            	    .setTitle('<:CODE:1024400109741551686> » PAPER API REMOVE')
  				    .setDescription('Du hast die API **' + name + '** gelöscht!')
        		    .setFooter({ text: '» ' + version + ' » SLOTS ' + newamount + '/5'});
            }

        	// Remove File
        	uapi.del(interaction.user.id + '-' + name)

        	// Send Message
        	bot.apis.rem(interaction.user.id, 1)
        	bot.log(false, interaction.user.id, interaction.guild.id, '[CMD] APIREMOVE : ' + name)
        	return interaction.reply({ embeds: [message], ephemeral: true })
        } else {
            // Create Embed
            let message = new EmbedBuilder().setColor('#37009B')
        		.setTitle('<:EXCLAMATION:1024407166460891166> » ERROR')
        		.setDescription('» This API doesnt exist!\n</apicreate:1002107281510506516> to Create one')
        		.setFooter({ text: '» ' + version + ' » SLOTS ' + amount + '/5'});

            if (lang === 'de') {
                message = new EmbedBuilder().setColor('#37009B')
        		    .setTitle('<:EXCLAMATION:1024407166460891166> » FEHLER')
        		    .setDescription('» Diese API existiert nicht!\n</apicreate:1002107281510506516> um eine zu erstellen')
        		    .setFooter({ text: '» ' + version + ' » SLOTS ' + amount + '/5'});
            }
            
            // Send Message
            bot.log(false, interaction.user.id, interaction.guild.id, '[CMD] APIREMOVE : ' + name + ' : NOTFOUND')
            return interaction.reply({ embeds: [message], ephemeral: true })
        }
    },
};