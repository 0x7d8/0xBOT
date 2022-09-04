const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('@discordjs/builders');
const { version } = require('../../config.json');
const fs = require('fs');

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
    async execute(interaction) {
        // Count to Global Commands
        cmds.add('t-all', 1)
        
        // Count Guild Commands and User
        cmds.add('g-' + interaction.guild.id, 1)
        cmds.add('u-' + interaction.user.id, 1)
        
        // Set Variables
        const name = interaction.options.getString("name")
        const amount = await apis.get('<@' + interaction.user.id + '>');

       	// Check if API even exists
        const path = '/paper-api/' + interaction.user.id + '/' + name
        try {
        	
            // Read File
            const data = fs.readFileSync(path, "utf8");
            
        	// Create Embed
        	const message = new EmbedBuilder()
            	.setTitle('» PAPER API EDIT')
  				.setDescription('» Der inhalt von **' + name + '**:\n`' + data + '`\n» Der Link:\n**`https://api.paperstudios.de/user/' + interaction.user.id + '/' + name + '`**')
        		.setFooter({ text: '» ' + version + ' » SLOTS ' + amount + '/5'});

        	// Send Message
        	console.log('[0xBOT] [i] [' + new Date().toLocaleTimeString('en-US', { hour12: false }) + '] [' + interaction.user.id + ' @ ' + interaction.guild.id + '] APIVIEW : ' + name + ' : ' + data.toUpperCase())
        	return interaction.reply({ embeds: [message.toJSON()], ephemeral: true })
        } catch (err) {
            // Create Embed
            const error = new EmbedBuilder()
        		.setTitle('» PAPER API EDIT')
        		.setDescription('» Diese API existiert garnicht!\n</apicreate:1002107281510506516> um eine zu erstellen')
        		.setFooter({ text: '» ' + version + ' » SLOTS ' + amount + '/5'});
            
            // Send Message
            console.log('[0xBOT] [i] [' + new Date().toLocaleTimeString('en-US', { hour12: false }) + '] [' + interaction.user.id + ' @ ' + interaction.guild.id + '] APIVIEW : ' + name + ' : NOTFOUND')
            return interaction.reply({ embeds: [error.toJSON()], ephemeral: true })
        }
    },
};