const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('@discordjs/builders');
const { version } = require('../../config.json');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('votes')
    	.setDMPermission(false)
        .setDescription('SEE THE VOTES')
        .setDescriptionLocalizations({
            de: 'SEHE DIE VOTES'
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
        // Set Variables
        const user = interaction.options.getUser("user")

        // Get Userinfo
        let userinfo
        if (user != null) {
            userinfo = await client.users.fetch(user);
        }
        
        // Set User ID
        let votes
        if (user == null) {
            votes = await votef.get(interaction.user.id + '-A');
            bot.log(false, interaction.user.id, interaction.guild.id, '[CMD] VOTES : ' + votes);
        } else {
            votes = await votef.get(user.id + '-A');
            bot.log(false, interaction.user.id, interaction.guild.id, '[CMD] VOTES : ' + user + ' : ' + votes);
        }
        
        // Check if Plural or not
        let word
        if (votes == 1) {
            word = "Vote";
        } else {
            word = "Votes";
        }
        
        // Create Embed
        let message
        if (user == null) {
        	message = new EmbedBuilder()
            	.setTitle('» YOUR VOTES')
  				.setDescription('» You have **' + votes + '** ' + word + '!')
            	.setFooter({ text: '» ' + vote + ' » ' + version });

            if (lang == "de") {
                message = new EmbedBuilder()
            	    .setTitle('» DEINE VOTES')
  				    .setDescription('» Du hast **' + votes + '** ' + word + '!')
            	    .setFooter({ text: '» ' + vote + ' » ' + version });
            }
        } else {
            message = new EmbedBuilder()
                .setTitle('» THE VOTES OF ' + userinfo.username.toUpperCase() + '#' + userinfo.discriminator)
  				.setDescription('» <@' + user + '> has **' + votes + '** ' + word + '!')
            	.setFooter({ text: '» ' + vote + ' » ' + version });

            if (lang == "de") {
                message = new EmbedBuilder()
                    .setTitle('» DIE VOTES VON ' + userinfo.username.toUpperCase() + '#' + userinfo.discriminator)
  				    .setDescription('» <@' + user + '> hat **' + votes + '** ' + word + '!')
            	    .setFooter({ text: '» ' + vote + ' » ' + version });
            }
        }

        // Send Message
        return interaction.reply({ embeds: [message.toJSON()] })
    },
};