const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('@discordjs/builders');
const { version } = require('../../../config.json');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('quotes')
    	.setDMPermission(false)
        .setDescription('SEE THE QUOTES')
        .setDescriptionLocalizations({
            de: 'SEHE DIE ZITATE'
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
        
        // Set User ID
        let quotes
        if (user == null) {
            quotes = await quts.get(interaction.user.id.replace(/\D/g, ''));
            console.log('[0xBOT] [i] [' + new Date().toLocaleTimeString('en-US', { hour12: false }) + '] [' + interaction.user.id.replace(/\D/g, '') + ' @ ' + interaction.guild.id + '] [CMD] QUOTES : ' + quotes);
        } else {
            quotes = await quts.get(user.toString().replace(/\D/g, ''));
            console.log('[0xBOT] [i] [' + new Date().toLocaleTimeString('en-US', { hour12: false }) + '] [' + interaction.user.id.replace(/\D/g, '') + ' @ ' + interaction.guild.id + '] [CMD] QUOTES : ' + user + ' : ' + quotes);
        }
        
        // Check if Plural or not
        let word
        if (quotes = 1) {
            word = "Quote";
        } else {
            word = "Quotes";
        }

        if (interaction.guildLocale == "de") {
            if (quotes = 1) {
                word = "Zitat";
            } else {
                word = "Zitate";
            }
        }
        
        // Create Embed
        let message
        if (user == null) {
        	message = new EmbedBuilder()
            	.setTitle('» YOUR QUOTES')
  				.setDescription('» You have **' + quotes + '** ' + word + '!')
            	.setFooter({ text: '» ' + version });

            if (interaction.guildLocale == "de") {
                message = new EmbedBuilder()
            	    .setTitle('» DEINE ZITATE')
  				    .setDescription('» Du hast **' + quotes + '** ' + word + '!')
            	    .setFooter({ text: '» ' + version });
            }
        } else {
            message = new EmbedBuilder()
                .setTitle('» THE QUOTES OF ' + userinfo.username.toUpperCase() + '#' + userinfo.discriminator)
  				.setDescription('» <@' + user + '> has **' + quotes + '** ' + word + '!')
            	.setFooter({ text: '» ' + version });

            if (interaction.guildLocale == "de") {
                message = new EmbedBuilder()
                    .setTitle('» DIE ZITATE VON ' + userinfo.username.toUpperCase() + '#' + userinfo.discriminator)
  				    .setDescription('» <@' + user + '> hat **' + quotes + '** ' + word + '!')
            	    .setFooter({ text: '» ' + version });
            }
        }

        // Send Message
        return interaction.reply({ embeds: [message.toJSON()], ephemeral: true })
    },
};