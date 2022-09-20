const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('@discordjs/builders');
const { version } = require('../../config.json');
const fs = require('fs');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('apicreate')
        .setDescription('CREATE AN API')
        .setDescriptionLocalizations({
            de: 'ERSTELLE EINE API'
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
        const amount = await apis.get(interaction.user.id.replace(/\D/g, ''));
        const newamount = amount + 1

        // Check if API exists
        const dir = '/paper-api/' + interaction.user.id.replace(/\D/g, '')
        const path = '/paper-api/' + interaction.user.id.replace(/\D/g, '') + '/' + name
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir)
        }
  		if (fs.existsSync(path)) {
            // Create Embed
            let message = new EmbedBuilder()
        		.setTitle('» PAPER API CREATE')
        		.setDescription('» This API already exists!\n</apiedit:1002107281510506517> to change it\n</apiremove:1002107281510506518> to delete it')
        		.setFooter({ text: '» ' + version + ' » SLOTS ' + amount + '/5'});

            if (lang.toString() == "de") {
                message = new EmbedBuilder()
        		    .setTitle('» PAPER API CREATE')
        		    .setDescription('» Diese API existiert schon!\n</apiedit:1002107281510506517> um sie zu ändern\n</apiremove:1002107281510506518> um sie zu löschen')
        		    .setFooter({ text: '» ' + version + ' » SLOTS ' + amount + '/5'});
            }
            
            // Send Message
            bot.log(false, interaction.user.id, interaction.guild.id, '[CMD] APICREATE : ' + name + ' : NOTFOUND')
            return interaction.reply({ embeds: [message.toJSON()], ephemeral: true })
  		}
        
        // Check if Slots are Free
        if (amount > '4') {
            // Create Embed
            let message = new EmbedBuilder()
        		.setTitle('» PAPER API CREATE')
        		.setDescription('» You have used all of your **5** API Slots!')
        		.setFooter({ text: '» ' + vote + ' » ' + version });

            if (lang.toString() == "de") {
                message = new EmbedBuilder()
        		    .setTitle('» PAPER API CREATE')
        		    .setDescription('» Du hast alle deiner **5** API Slots genutzt!')
        		    .setFooter({ text: '» ' + vote + ' » ' + version });
            }
            
            // Send Message
            bot.log(false, interaction.user.id, interaction.guild.id, '[CMD] APICREATE : ' + name + ' : MAXSLOTS')
            return interaction.reply({ embeds: [message.toJSON()], ephemeral: true })
        } 
        
        // Create Embed
        let message = new EmbedBuilder()
            .setTitle('» PAPER API EDIT')
  			.setDescription('You have created a new API!\nIts available here:\n**`https://api.paperstudios.de/user/' + interaction.user.id.replace(/\D/g, '') + '/' + name + '`**!')
        	.setFooter({ text: '» ' + version + ' » SLOTS ' + newamount + '/5'});

        if (lang.toString() == "de") {
            message = new EmbedBuilder()
                .setTitle('» PAPER API EDIT')
  			    .setDescription('Du hast eine neue API erstellt!\nSie ist hier verfügbar:\n**`https://api.paperstudios.de/user/' + interaction.user.id.replace(/\D/g, '') + '/' + name + '`**!')
        	    .setFooter({ text: '» ' + version + ' » SLOTS ' + newamount + '/5'});
        }
        
        // Write File
        fs.writeFile('/paper-api/' + interaction.user.id.replace(/\D/g, '') + '/' + name, inhalt, function(err) {})

        // Send Message
        apis.add(interaction.user.id.replace(/\D/g, ''), 1)
        bot.log(false, interaction.user.id, interaction.guild.id, '[CMD] APICREATE : ' + name + ' : ' + inhalt.toUpperCase())
        return interaction.reply({ embeds: [message.toJSON()], ephemeral: true })
    },
};