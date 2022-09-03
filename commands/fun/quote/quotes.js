const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('@discordjs/builders');
const { version, token } = require('../../../config.json');

// Register Client
const { Client, GatewayIntentBits } = require('discord.js');
const client = new Client({ intents: [GatewayIntentBits.Guilds] });
client.login(token)

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
    async execute(interaction) {
        // Count to Global Commands
        cmds.add('t-all', 1)
        
        // Count Guild Commands and User
        cmds.add('g-' + interaction.guild.id, 1)
        cmds.add('u-' + interaction.user.id, 1)
        
        // Set Variables
        const user = interaction.options.getUser("user")

        // Set User ID
        let quotes
        if (user == null) {
            quotes = await quts.get('<@' + interaction.user.id + '>');
            console.log('[0xBOT] [i] [' + interaction.user.id + ' @ ' + interaction.guild.id + '] QUOTES : ' + quotes);
        } else {
            quotes = await quts.get('<@' + user + '>');
            console.log('[0xBOT] [i] [' + interaction.user.id + ' @ ' + interaction.guild.id + '] QUOTES : ' + user + ' : ' + quotes);
        }

        // Check if Target is Bot
        const userinfo = await client.users.fetch(user);
        if (user != null) {
            if (userinfo.bot == true) {
                // Create Embed
                const err = new EmbedBuilder()
        		    .setTitle('» FEHLER')
        		    .setDescription('» Ein Bot kann keine Zitate haben!')
        		    .setFooter({ text: '» ' + version });
            
                // Send Message
                console.log('[0xBOT] [i] [' + interaction.user.id + ' @ ' + interaction.guild.id + '] QUOTES : ' + user + ' : BOT')
                return interaction.reply({ embeds: [err.toJSON()], ephemeral: true })
            }
        }
        
        // Check if Plural or not
        let word
        if (quotes = 1) {
            word = "Zitat";
        } else {
            word = "Zitate";
        }
        
        // Create Embed
        let message
        if (user == null) {
        	message = new EmbedBuilder()
            	.setTitle('» DEINE ZITATE')
  				.setDescription('» Du hast **' + quotes + '** ' + word + '!')
            	.setFooter({ text: '» ' + version });
        } else {
            message = new EmbedBuilder()
                .setTitle('» DIE ZITATE VON ' + userinfo.username.toUpperCase() + '#' + userinfo.discriminator)
  				.setDescription('» <@' + user + '> hat **' + quotes + '** ' + word + '!')
            	.setFooter({ text: '» ' + version });
        }

        // Send Message
        return interaction.reply({ embeds: [message.toJSON()], ephemeral: true })
    },
};