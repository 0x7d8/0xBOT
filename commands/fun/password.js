const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('@discordjs/builders');
const { version } = require('../../config.json');
const generator = require('generate-password');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('password')
    	.setDMPermission(false)
        .setDescription('GENERATE A PASSWORD')
        .setDescriptionLocalizations({
            de: 'GENERIERE EIN PASSWORT'
        })
        .addIntegerOption(option =>
            option.setName('lenght')
                .setNameLocalizations({
                    de: 'länge'
                })
                .setDescription('THE LENGHT')
                .setDescriptionLocalizations({
                    de: 'DIE LÄNGE'
                })
                .setRequired(true)),
    async execute(interaction) {
        // Count to Global Commands
        cmds.add('t-all', 1)
        
        // Count Guild Commands and User
        cmds.add('g-' + interaction.guild.id, 1)
        cmds.add('u-' + interaction.user.id, 1)
        
        // Set Variables
        const lenght = interaction.options.getInteger("lenght")

        // Check Lenght
        if (lenght > 128) {

            // Create Embed
            const err = new EmbedBuilder()
        		.setTitle('» PASSWORT GENERIEREN')
        		.setDescription('» Die Maximale Größe ist **128**!')
        		.setFooter({ text: '» ' + version });
            
            console.log('[0xBOT] [i] [' + interaction.user.id + ' @ ' + interaction.guild.id + '] PASSWORD : TOOBIG : ' + lenght)
            return interaction.reply({ embeds: [err.toJSON()], ephemeral: true })

        }

        if (lenght < 4) {

            // Create Embed
            const err = new EmbedBuilder()
        		.setTitle('» PASSWORT GENERIEREN')
        		.setDescription('» Dein Password sollte schon mehr als **4** Buchstaben haben!')
        		.setFooter({ text: '» ' + version });
            
            console.log('[0xBOT] [i] [' + interaction.user.id + ' @ ' + interaction.guild.id + '] PASSWORD : TOOSMALL : ' + lenght)
            return interaction.reply({ embeds: [err.toJSON()], ephemeral: true })

        }

        // Generate Password
        const password = generator.generate({
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