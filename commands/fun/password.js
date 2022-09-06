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
    async execute(interaction, client) {
        // Count to Global Commands
        cmds.add('t-all', 1)
        
        // Count Guild Commands and User
        cmds.add('g-' + interaction.guild.id, 1)
        cmds.add('u-' + interaction.user.id.replace(/\D/g, ''), 1)
        
        // Set Variables
        const lenght = interaction.options.getInteger("lenght")

        // Check Lenght
        if (lenght > 256) {

            // Create Embed
            let message = new EmbedBuilder()
        		.setTitle('» ERROR')
        		.setDescription('» The Maximum Size is **256**!')
        		.setFooter({ text: '» ' + version });

            if (interaction.guildLocale == "de") {
                message = new EmbedBuilder()
        		    .setTitle('» FEHLER')
        		    .setDescription('» Die Maximale Größe ist **128**!')
        		    .setFooter({ text: '» ' + version });
            }
            
            console.log('[0xBOT] [i] [' + new Date().toLocaleTimeString('en-US', { hour12: false }) + '] [' + interaction.user.id.replace(/\D/g, '') + ' @ ' + interaction.guild.id + '] [CMD] PASSWORD : TOOBIG : ' + lenght)
            return interaction.reply({ embeds: [message.toJSON()], ephemeral: true })

        }

        if (lenght < 4) {

            // Create Embed
            let message = new EmbedBuilder()
        		.setTitle('» ERROR')
        		.setDescription('» The Minimum Size is **4**!')
        		.setFooter({ text: '» ' + version });

            if (interaction.guildLocale == "de") {
                message = new EmbedBuilder()
        		    .setTitle('» FEHLER')
        		    .setDescription('» Die Minimale Größe ist **4**!')
        		    .setFooter({ text: '» ' + version });
            }
            
            console.log('[0xBOT] [i] [' + new Date().toLocaleTimeString('en-US', { hour12: false }) + '] [' + interaction.user.id.replace(/\D/g, '') + ' @ ' + interaction.guild.id + '] [CMD] PASSWORD : TOOSMALL : ' + lenght)
            return interaction.reply({ embeds: [message.toJSON()], ephemeral: true })

        }

        // Generate Password
        const password = generator.generate({
            length: lenght,
            numbers: true,
            uppercase: true,
            symbols: false,
        });
        
        // Create Embed
        let message = new EmbedBuilder()
        	.setTitle('» GENERATE PASSWORD')
  			.setDescription('» This is the Password I choose:\n`' + password + '`')
        	.setFooter({ text: '» ' + version });

        if (interaction.guildLocale == "de") {
            message = new EmbedBuilder()
        	    .setTitle('» PASSWORT GENERIEREN')
  			    .setDescription('» Das hier ist mein ausgedachtes Passwort:\n`' + password + '`')
        	    .setFooter({ text: '» ' + version });
        }

        // Send Message
        console.log('[0xBOT] [i] [' + new Date().toLocaleTimeString('en-US', { hour12: false }) + '] [' + interaction.user.id.replace(/\D/g, '') + ' @ ' + interaction.guild.id + '] [CMD] PASSWORD : ' + lenght + ' : SUCCESS')
        return interaction.reply({ embeds: [message.toJSON()], ephemeral: true })
    },
};