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
    async execute(interaction, client, lang, vote) {
        // Set Variables
        const lenght = interaction.options.getInteger("lenght")

        // Check Lenght
        if (lenght > 256) {

            // Create Embed
            let message = new EmbedBuilder()
        		.setTitle('<:EXCLAMATION:1024407166460891166> » ERROR')
        		.setDescription('» The Maximum Size is **256**!')
        		.setFooter({ text: '» ' + vote + ' » ' + version });

            if (lang == "de") {
                message = new EmbedBuilder()
        		    .setTitle('<:EXCLAMATION:1024407166460891166> » FEHLER')
        		    .setDescription('» Die Maximale Größe ist **128**!')
        		    .setFooter({ text: '» ' + vote + ' » ' + version });
            }
            
            bot.log(false, interaction.user.id, interaction.guild.id, '[CMD] PASSWORD : TOOBIG : ' + lenght)
            return interaction.reply({ embeds: [message], ephemeral: true })

        }

        if (lenght < 4) {

            // Create Embed
            let message = new EmbedBuilder()
        		.setTitle('<:EXCLAMATION:1024407166460891166> » ERROR')
        		.setDescription('» The Minimum Size is **4**!')
        		.setFooter({ text: '» ' + vote + ' » ' + version });

            if (lang == "de") {
                message = new EmbedBuilder()
        		    .setTitle('<:EXCLAMATION:1024407166460891166> » FEHLER')
        		    .setDescription('» Die Minimale Größe ist **4**!')
        		    .setFooter({ text: '» ' + vote + ' » ' + version });
            }
            
            bot.log(false, interaction.user.id, interaction.guild.id, '[CMD] PASSWORD : TOOSMALL : ' + lenght)
            return interaction.reply({ embeds: [message], ephemeral: true })

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
        	.setTitle('<:KEY:1024392167130664980> » GENERATE PASSWORD')
  			.setDescription('» This is the Password I choose:\n`' + password + '`')
        	.setFooter({ text: '» ' + vote + ' » ' + version });

        if (lang == "de") {
            message = new EmbedBuilder()
        	    .setTitle('<:KEY:1024392167130664980> » PASSWORT GENERIEREN')
  			    .setDescription('» Das hier ist mein ausgedachtes Passwort:\n`' + password + '`')
        	    .setFooter({ text: '» ' + vote + ' » ' + version });
        }

        // Send Message
        bot.log(false, interaction.user.id, interaction.guild.id, '[CMD] PASSWORD : ' + lenght + ' : SUCCESS')
        return interaction.reply({ embeds: [message], ephemeral: true })
    },
};