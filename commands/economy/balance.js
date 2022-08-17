const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('@discordjs/builders');
const { version } = require('../../config.json');

// Register Client
const { Client } = require('discord.js');
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

module.exports = {
    data: new SlashCommandBuilder()
        .setName('balance')
    	.setDMPermission(false)
        .setDescription('SEHE DEN GELDSTAND')
        .addUserOption(option =>
            option.setName('user')
                .setDescription('DER NUTZER')
                .setRequired(false)),
    async execute(interaction) {
        // Count to Global Commands
        addcmd('t-all', 1)
        
        // Count Guild Commands and User
        addcmd('g-' + interaction.guild.id, 1)
        addcmd('u-' + interaction.user.id, 1)
        
        // Set Variables
        const user = interaction.options.getUser("user")

        // Get Username
        let username
        if (user != null) {
            username = client.users.cache.get(user);
        }

        // Get Money
        let money
        if (user == null) {
            money = await getbal('<@' + interaction.user.id + '>');
            console.log('[0xBOT] [i] [' + interaction.user.id + ' @ ' + interaction.guild.id + '] BALANCE : ' + money + '€');
        } else {
            money = await getbal('<@' + user + '>');
            console.log('[0xBOT] [i] [' + interaction.user.id + ' @ ' + interaction.guild.id + '] BALANCE : ' + user + ' : ' + money + '€');
        }
        
        // Create Embed
        let message
        if (user == null) {
        	message = new EmbedBuilder()
            	.setTitle('» DEIN GELDSTAND')
  				.setDescription('» Dein Geldstand beträgt **' + money + '€**!')
            	.setFooter({ text: '» ' + version });
        } else {
            message = new EmbedBuilder()
            	.setTitle('» DER GELDSTAND VON <@' + username.username + '>')
  				.setDescription('» Der Geldstand von <@' + user + '> ist **' + money + '€**!')
            	.setFooter({ text: '» ' + version });
        }

        // Send Message
        return interaction.reply({ embeds: [message.toJSON()] })
    },
};