const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('@discordjs/builders');
const { version } = require('../../config.json');
var fs = require('file-system');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('apicreate')
        .setDescription('ERSTELLE EINE API')
    	.setDMPermission(false)
        .addStringOption(option =>
            option.setName('name')
                .setDescription('DER NAME')
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
            option.setName('inhalt')
                .setDescription('DER INHALT')
                .setRequired(true)),
    async execute(interaction) {
        // Count to Global Commands
        addcmd('t-all', 1)
        
        // Count Guild Commands and User
        addcmd('g-' + interaction.guild.id, 1)
        addcmd('u-' + interaction.user.id, 1)
        
        // Set Variables
        const name = interaction.options.getString("name")
        const inhalt = interaction.options.getString("inhalt")
        const amount = await getapi('<@' + interaction.user.id + '>');
        const newamount = amount + 1

        // Check if API exists
        const path = '/paper-api/' + interaction.user.id + '/' + name
  		if (fs.existsSync(path)) {
            // Create Embed
            const err = new EmbedBuilder()
        		.setTitle('» PAPER API CREATE')
        		.setDescription('» Diese API existiert schon!\n</apiedit:1000335179585441862> um sie zu ändern\n</apiremove:1000327305220071464> um sie zu löschen')
        		.setFooter({ text: '» ' + version + ' » SLOTS ' + amount + '/5'});
            
            // Send Message
            return interaction.reply({ embeds: [err.toJSON()], ephemeral: true })
  		}
        
        // Check if Slots are Free
        if (amount > '4') {
            // Create Embed
            const err = new EmbedBuilder()
        		.setTitle('» PAPER API CREATE')
        		.setDescription('» Du hast alle deiner **5** API Slots genutzt!')
        		.setFooter({ text: '» ' + version });
            
            // Send Message
            return interaction.reply({ embeds: [err.toJSON()], ephemeral: true })
        } 
        
        // Create Embed
        const message = new EmbedBuilder()
            .setTitle('» PAPER API EDIT')
  			.setDescription('Du hast eine neue API erstellt!\nSie ist hier verfügbar:\n**`https://api.paperstudios.de/user/' + interaction.user.id + '/' + name + '`**!')
        	.setFooter({ text: '» ' + version + ' » SLOTS ' + newamount + '/5'});
        
        // Write File
        fs.writeFile('/paper-api/' + interaction.user.id + '/' + name, inhalt, function(err) {})

        // Send Message
        addapi('<@' + interaction.user.id + '>', 1)
        console.log('[0xBOT] [i] [' + interaction.user.id + ' @ ' + interaction.guild.id + '] APICREATE : ' + name + ' : ' + inhalt.toUpperCase())
        return interaction.reply({ embeds: [message.toJSON()], ephemeral: true })
    },
};