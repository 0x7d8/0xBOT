const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('@discordjs/builders');
const { version } = require('../../config.json');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('balance')
    	.setDMPermission(false)
        .setDescription('SEE THE BALANCE')
        .setDescriptionLocalizations({
            de: 'SEHE DEN KONTOSTAND'
        })
        .addUserOption(option =>
            option.setName('user')
                .setNameLocalizations({
                    de: 'nutzer'
                })
                .setDescription('THE USER')
                .setDescriptionLocalizations({
                    de: 'DER NUTZER'
                })
                .setRequired(false)),
    async execute(interaction, client) {
        // Set Variables
        const user = interaction.options.getUser("user")

        // Get Userinfo
        let userinfo
        if (user != null) {
            userinfo = await client.users.fetch(user);
        }

        // Get Money
        let money
        if (user == null) {
            money = await bals.get(interaction.user.id.replace(/\D/g, ''));
            console.log('[0xBOT] [i] [' + new Date().toLocaleTimeString('en-US', { hour12: false }) + '] [' + interaction.user.id.replace(/\D/g, '') + ' @ ' + interaction.guild.id + '] [CMD] BALANCE : ' + money + '€');
        } else {
            money = await bals.get(user.toString().replace(/\D/g, ''));
            console.log('[0xBOT] [i] [' + new Date().toLocaleTimeString('en-US', { hour12: false }) + '] [' + interaction.user.id.replace(/\D/g, '') + ' @ ' + interaction.guild.id + '] [CMD] BALANCE : ' + user + ' : ' + money + '€');
        }
        
        // Create Embed
        let message
        if (user == null) {
        	message = new EmbedBuilder()
            	.setTitle('» YOUR BALANCE')
  				.setDescription('» Your Balance is **$' + money + '**!')
            	.setFooter({ text: '» ' + version });

            if (interaction.guildLocale == "de") {
                message = new EmbedBuilder()
            	    .setTitle('» DEIN GELDSTAND')
  				    .setDescription('» Dein Geldstand beträgt **' + money + '€**!')
            	    .setFooter({ text: '» ' + version });
            }
        } else {
            message = new EmbedBuilder()
            	.setTitle('» THE BALANCE OF ' + userinfo.username.toUpperCase() + '#' + userinfo.discriminator)
  				.setDescription('» The Balance of <@' + user + '> is **$' + money + '**!')
            	.setFooter({ text: '» ' + version });

            if (interaction.guildLocale == "de") {
                message = new EmbedBuilder()
            	    .setTitle('» DER GELDSTAND VON ' + userinfo.username.toUpperCase() + '#' + userinfo.discriminator)
  				    .setDescription('» Der Geldstand von <@' + user + '> ist **' + money + '€**!')
            	    .setFooter({ text: '» ' + version });
            }
        }

        // Send Message
        return interaction.edit.message({ embeds: [message.toJSON()] })
    },
};