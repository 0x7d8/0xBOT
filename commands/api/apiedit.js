const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('@discordjs/builders');
const { version } = require('../../config.json');
const fs = require('fs');

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
    async execute(interaction) {
        // Count to Global Commands
        cmds.add('t-all', 1)
        
        // Count Guild Commands and User
        cmds.add('g-' + interaction.guild.id, 1)
        cmds.add('u-' + interaction.user.id.replace(/\D/g, ''), 1)
        
        // Set Variables
        const name = interaction.options.getString("name")
        const inhalt = interaction.options.getString("content")
        const amount = await apis.get(interaction.user.id.replace(/\D/g, ''));

       	// Check if API even exists
        const path = '/paper-api/' + interaction.user.id.replace(/\D/g, '') + '/' + name
        if (fs.existsSync(path)) {
        
            // Edit File
        	fs.writeFile('/paper-api/' + interaction.user.id.replace(/\D/g, '') + '/' + name, inhalt, function(err) {})
            
        	// Create Embed
        	const message = new EmbedBuilder()
            	.setTitle('» PAPER API EDIT')
  				.setDescription('Du hast die API **' + name + '** editiert!')
        		.setFooter({ text: '» ' + version + ' » SLOTS ' + amount + '/5'});

        	// Send Message
        	console.log('[0xBOT] [i] [' + new Date().toLocaleTimeString('en-US', { hour12: false }) + '] [' + interaction.user.id.replace(/\D/g, '') + ' @ ' + interaction.guild.id + '] APIEDIT : ' + name + ' : ' + inhalt.toUpperCase())
        	return interaction.reply({ embeds: [message.toJSON()], ephemeral: true })
        } else {
            // Create Embed
            const err = new EmbedBuilder()
        		.setTitle('» PAPER API EDIT')
        		.setDescription('» Diese API existiert garnicht!\n</apicreate:1002107281510506516> um eine zu erstellen')
        		.setFooter({ text: '» ' + version + ' » SLOTS ' + amount + '/5'});
            
            // Send Message
            console.log('[0xBOT] [i] [' + new Date().toLocaleTimeString('en-US', { hour12: false }) + '] [' + interaction.user.id.replace(/\D/g, '') + ' @ ' + interaction.guild.id + '] APIEDIT : ' + name + ' : NOTFOUND')
            return interaction.reply({ embeds: [err.toJSON()], ephemeral: true })
        }
    },
};