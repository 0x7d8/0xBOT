const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('@discordjs/builders');
const { version } = require('../../config.json');
const fs = require('fs');

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
    async execute(interaction, client) {
        // Set Variables
        const name = interaction.options.getString("name")
        const amount = await apis.get(interaction.user.id.replace(/\D/g, ''));
        const newamount = amount - 1

       	// Check if API even exists
        const path = '/paper-api/' + interaction.user.id.replace(/\D/g, '') + '/' + name
        try {
        	// Create Embed
        	let message = new EmbedBuilder()
            	.setTitle('» PAPER API REMOVE')
  				.setDescription('You have deleted the API **' + name + '**!')
        		.setFooter({ text: '» ' + version + ' » SLOTS ' + newamount + '/5'});

            if (interaction.guildLocale == "de") {
                message = new EmbedBuilder()
            	    .setTitle('» PAPER API REMOVE')
  				    .setDescription('Du hast die API **' + name + '** gelöscht!')
        		    .setFooter({ text: '» ' + version + ' » SLOTS ' + newamount + '/5'});
            }

        	// Remove File
        	fs.unlinkSync(path)

        	// Send Message
        	apis.rem(interaction.user.id.replace(/\D/g, ''), 1)
        	console.log('[0xBOT] [i] [' + new Date().toLocaleTimeString('en-US', { hour12: false }) + '] [' + interaction.user.id.replace(/\D/g, '') + ' @ ' + interaction.guild.id + '] [CMD] APIREMOVE : ' + name)
        	await return interaction.reply({ embeds: [message.toJSON()], ephemeral: true })
        } catch (err) {
            // Create Embed
            let message = new EmbedBuilder()
        		.setTitle('» PAPER API EDIT')
        		.setDescription('» This API doesnt exist!\n</apicreate:1002107281510506516> to Create one')
        		.setFooter({ text: '» ' + version + ' » SLOTS ' + amount + '/5'});

            if (interaction.guildLocale == "de") {
                message = new EmbedBuilder()
        		    .setTitle('» PAPER API EDIT')
        		    .setDescription('» Diese API existiert nicht!\n</apicreate:1002107281510506516> um eine zu erstellen')
        		    .setFooter({ text: '» ' + version + ' » SLOTS ' + amount + '/5'});
            }
            
            // Send Message
            console.log('[0xBOT] [i] [' + new Date().toLocaleTimeString('en-US', { hour12: false }) + '] [' + interaction.user.id.replace(/\D/g, '') + ' @ ' + interaction.guild.id + '] [CMD] APIREMOVE : ' + name + ' : NOTFOUND')
            await return interaction.reply({ embeds: [message.toJSON()], ephemeral: true })
        }
    },
};