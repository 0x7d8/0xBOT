const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('@discordjs/builders');
const { version, token } = require('../../config.json');

// Register Client
const { Client, GatewayIntentBits } = require('discord.js');
const client = new Client({ intents: [GatewayIntentBits.Guilds] });
client.login(token)

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
    async execute(interaction) {
        // Count to Global Commands
        cmds.add('t-all', 1)
        
        // Count Guild Commands and User
        cmds.add('g-' + interaction.guild.id, 1)
        cmds.add('u-' + interaction.user.id, 1)
        
        // Set Variables
        const user = interaction.options.getUser("user")

        // Get Username
        let userinfo
        if (user != null) {
            userinfo = await client.users.fetch(user);
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
            	.setTitle('» DER GELDSTAND VON ' + userinfo.username.toUpperCase() + '#' + userinfo.discriminator)
  				.setDescription('» Der Geldstand von <@' + user + '> ist **' + money + '€**!')
            	.setFooter({ text: '» ' + version });
        }

        // Send Message
        return interaction.reply({ embeds: [message.toJSON()] })
    },
};