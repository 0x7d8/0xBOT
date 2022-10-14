const { SlashCommandBuilder, EmbedBuilder } = require('@discordjs/builders');
const { version } = require('../../config.json');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('apiedit')
        .setDescription('CHANGE AN API')
        .setDescriptionLocalizations({
            de: 'ÄNDERE EINE EMBED'
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
				))
    	.addStringOption(option =>
            option.setName('content')
                .setNameLocalizations({
                    de: 'inhalt'
                })
                .setDescription('THE CONTENT')
                .setDescriptionLocalizations({
                    de: 'DER INHALT'
                })
                .setRequired(true)),
    async execute(interaction, client, lang, vote) {
        // Set Variables
        const name = interaction.options.getString("name")
        const inhalt = interaction.options.getString("content")
        const amount = await bot.apis.get(interaction.user.id);

       	// Check if API even exists
        if (await uapi.get(interaction.user.id + '-' + name) !== 'N-EXIST') {
        
            // Edit File
        	uapi.set(interaction.user.id + '-' + name, inhalt)
            
        	// Create Embed
        	let message = new EmbedBuilder()
            	.setTitle('<:CODE:1024400109741551686> » PAPER API EDIT')
  				.setDescription('You edited the API **' + name + '**!')
        		.setFooter({ text: '» ' + version + ' » SLOTS ' + amount + '/5'});

            if (lang === 'de') {
                message = new EmbedBuilder()
            	    .setTitle('<:CODE:1024400109741551686> » PAPER API EDIT')
  				    .setDescription('Du hast die API **' + name + '** editiert!')
        		    .setFooter({ text: '» ' + version + ' » SLOTS ' + amount + '/5'});
            }

        	// Send Message
        	bot.log(false, interaction.user.id, interaction.guild.id, '[CMD] APIEDIT : ' + name + ' : ' + inhalt.toUpperCase())
        	return interaction.reply({ embeds: [message], ephemeral: true })
        } else {
            // Create Embed
            let message = new EmbedBuilder()
        		.setTitle('<:EXCLAMATION:1024407166460891166> » ERROR')
        		.setDescription('» This API doesnt exist!\n</apicreate:1002107281510506516> to Create one')
        		.setFooter({ text: '» ' + version + ' » SLOTS ' + amount + '/5'});

            if (lang === 'de') {
                message = new EmbedBuilder()
        		    .setTitle('<:EXCLAMATION:1024407166460891166> » FEHLER')
        		    .setDescription('» Diese API existiert nicht!\n</apicreate:1002107281510506516> um eine zu erstellen')
        		    .setFooter({ text: '» ' + version + ' » SLOTS ' + amount + '/5'});
            }
            
            // Send Message
            bot.log(false, interaction.user.id, interaction.guild.id, '[CMD] APIEDIT : ' + name + ' : NOTFOUND')
            return interaction.reply({ embeds: [message], ephemeral: true })
        }
    },
};