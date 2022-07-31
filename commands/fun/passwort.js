const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('@discordjs/builders');
const { version } = require('../../config.json');
var generator = require('generate-password');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('passwort')
    	.setDMPermission(false)
        .setDescription('GENERIERE EIN PASSWORT')
        .addIntegerOption(option =>
            option.setName('länge')
                .setDescription('DIE LÄNGE')
                .setRequired(true)),
    async execute(interaction) {
        // Count to Global Commands
        addcmd('t-all', 1)
        
        // Count Guild Commands and User
        addcmd('g-' + interaction.guild.id, 1)
        addcmd('u-' + interaction.user.id, 1)
        
        // Set Variables
        const lenght = interaction.options.getInteger("länge")
        
        // Check Maintenance
        const { maintenance } = require('../../config.json');
        if (maintenance == 'yes' && interaction.user.id != '745619551865012274') {
            // Create Embed
            var err = new EmbedBuilder()
        		.setTitle('» FEHLER')
        		.setDescription('» Der Bot ist aktuell unter Wartungsarbeiten!')
        		.setFooter({ text: '» ' + version });
            
            return interaction.reply({ embeds: [err.toJSON()], ephemeral: true })
        }

        // Check Lenght
        if (lenght > 128) {

            // Create Embed
            var err = new EmbedBuilder()
        		.setTitle('» PASSWORT GENERIEREN')
        		.setDescription('» Die Maximale Größe ist **128**!')
        		.setFooter({ text: '» ' + version });
            
            console.log('[0xBOT] [i] [' + interaction.user.id + ' @ ' + interaction.guild.id + '] PASSWORD : ' + lenght + ' : TOOBIG')
            return interaction.reply({ embeds: [err.toJSON()], ephemeral: true })

        }
        if (lenght < 4) {

            // Create Embed
            var err = new EmbedBuilder()
        		.setTitle('» PASSWORT GENERIEREN')
        		.setDescription('» Dein Password sollte schon mehr als **4** Buchstaben haben!')
        		.setFooter({ text: '» ' + version });
            
            console.log('[0xBOT] [i] [' + interaction.user.id + ' @ ' + interaction.guild.id + '] PASSWORD : ' + lenght + ' : TOOSMALL')
            return interaction.reply({ embeds: [err.toJSON()], ephemeral: true })

        }

        // Generate Password
        var password = generator.generate({
            length: lenght,
            numbers: true,
            uppercase: true,
            symbols: false,
        });
        
        // Create Embed
        const message = new EmbedBuilder()
        	.setTitle('» PASSWORT GENERIEREN')
  			.setDescription('» Das hier ist mein ausgedachtes Passwort:\n`' + password + '`')
        	.setFooter({ text: '» ' + version });

        // Send Message
        console.log('[0xBOT] [i] [' + interaction.user.id + ' @ ' + interaction.guild.id + '] PASSWORD : ' + lenght + ' : SUCCESS')
        return interaction.reply({ embeds: [message.toJSON()], ephemeral: true })
    },
};