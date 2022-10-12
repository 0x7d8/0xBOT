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
        
        // Set User ID
        let votes
        if (user == null) {
            votes = await bot.votes.get(interaction.user.id + '-A');
            bot.log(false, interaction.user.id, interaction.guild.id, '[CMD] VOTES : ' + votes);
        } else {
            votes = await bot.votes.get(user.id + '-A');
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
            	.setTitle('<:GLOBE:1024403680503529583> » YOUR VOTES')
  				.setDescription('» You have **' + votes + '** ' + word + '!')
            	.setFooter({ text: '» ' + vote + ' » ' + version });

            if (lang === 'de') {
                message = new EmbedBuilder()
            	    .setTitle('<:GLOBE:1024403680503529583> » DEINE VOTES')
  				    .setDescription('» Du hast **' + votes + '** ' + word + '!')
            	    .setFooter({ text: '» ' + vote + ' » ' + version });
            }
        } else {
            message = new EmbedBuilder()
                .setTitle('<:GLOBE:1024403680503529583> » THE VOTES OF ' + user.username.toUpperCase())
  				.setDescription('» <@' + user + '> has **' + votes + '** ' + word + '!')
            	.setFooter({ text: '» ' + vote + ' » ' + version });

            if (lang === 'de') {
                message = new EmbedBuilder()
                    .setTitle('<:GLOBE:1024403680503529583> » DIE VOTES VON ' + user.username.toUpperCase())
  				    .setDescription('» <@' + user + '> hat **' + votes + '** ' + word + '!')
            	    .setFooter({ text: '» ' + vote + ' » ' + version });
            }
        }

        // Send Message
        return interaction.reply({ embeds: [message] })
    },
};