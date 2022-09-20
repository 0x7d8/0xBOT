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
    async execute(interaction, client, lang, vote) {
        // Check if Quotes are Enabled in Server
        const qes = await gopt.get(interaction.guild.id + '-QUOTES')
        if (parseInt(qes) == 1) {
            // Create Embed
            let message = new EmbedBuilder()
        		.setTitle('» ERROR')
        		.setDescription('» Quotes are disabled on this Server!')
        		.setFooter({ text: '» ' + vote + ' » ' + version });

            if (lang.toString() == "de") {
                message = new EmbedBuilder()
        		    .setTitle('» FEHLER')
        		    .setDescription('» Zitate sind auf diesem Server deaktiviert!')
        		    .setFooter({ text: '» ' + vote + ' » ' + version });
            }
            
            // Send Message
            bot.log(false, interaction.user.id, interaction.guild.id, '[CMD] QUOTES : DISABLED')
            return interaction.reply({ embeds: [message.toJSON()], ephemeral: true })
        }

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
            bot.log(false, interaction.user.id, interaction.guild.id, '[CMD] QUOTES : ' + quotes);
        } else {
            quotes = await quts.get(user.toString().replace(/\D/g, ''));
            bot.log(false, interaction.user.id, interaction.guild.id, '[CMD] QUOTES : ' + user + ' : ' + quotes);
        }
        
        // Check if Plural or not
        let word
        if (quotes == 1) {
            word = "Quote";
        } else {
            word = "Quotes";
        }

        if (lang.toString() == "de") {
            if (quotes == 1) {
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
            	.setFooter({ text: '» ' + vote + ' » ' + version });

            if (lang.toString() == "de") {
                message = new EmbedBuilder()
            	    .setTitle('» DEINE ZITATE')
  				    .setDescription('» Du hast **' + quotes + '** ' + word + '!')
            	    .setFooter({ text: '» ' + vote + ' » ' + version });
            }
        } else {
            message = new EmbedBuilder()
                .setTitle('» THE QUOTES OF ' + userinfo.username.toUpperCase() + '#' + userinfo.discriminator)
  				.setDescription('» <@' + user + '> has **' + quotes + '** ' + word + '!')
            	.setFooter({ text: '» ' + vote + ' » ' + version });

            if (lang.toString() == "de") {
                message = new EmbedBuilder()
                    .setTitle('» DIE ZITATE VON ' + userinfo.username.toUpperCase() + '#' + userinfo.discriminator)
  				    .setDescription('» <@' + user + '> hat **' + quotes + '** ' + word + '!')
            	    .setFooter({ text: '» ' + vote + ' » ' + version });
            }
        }

        // Send Message
        return interaction.reply({ embeds: [message.toJSON()], ephemeral: true })
    },
};