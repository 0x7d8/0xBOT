const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('@discordjs/builders');
const { version, token } = require('../../config.json');

// Register Client
const { Client, GatewayIntentBits } = require('discord.js');
const client = new Client({ intents: [GatewayIntentBits.Guilds] });
client.login(token)

module.exports = {
    data: new SlashCommandBuilder()
        .setName('pay')
        .setDescription('GIVE SOMEONE MONEY')
        .setDescriptionLocalizations({
            de: 'GEBE JEMANDEN GELD'
        })
    	.setDMPermission(false)
        .addUserOption(option =>
            option.setName('user')
                .setNameLocalizations({
                    de: 'nutzer'
                })
                .setDescription('THE USER')
                .setDescriptionLocalizations({
                    de: 'DER NUTZER'
                })
                .setRequired(true))
        .addIntegerOption(option =>
            option.setName('amount')
                .setNameLocalizations({
                    de: 'anzahl'
                })
                .setDescription('THE AMOUNT')
                .setDescriptionLocalizations({
                    de: 'DIE ANZAHL'
                })
                .setRequired(true)),
    async execute(interaction) {
        // Count to Global Commands
        addcmd('t-all', 1)
        
        // Count Guild Commands and User
        addcmd('g-' + interaction.guild.id, 1)
        addcmd('u-' + interaction.user.id, 1)
        
        // Set Variables
        const user = interaction.options.getUser("user")
        const anzahl = interaction.options.getInteger("amount")
        const money = await getbal('<@' + interaction.user.id + '>');

        // Check if Balance is Minus
        if (anzahl < 0) {
            // Create Embed
            const err = new EmbedBuilder()
        		.setTitle('» FEHLER')
        		.setDescription('» Du kannst kein negatives Geld senden!')
        		.setFooter({ text: '» ' + version });
            
            // Send Message
            console.log('[0xBOT] [i] [' + interaction.user.id + ' @ ' + interaction.guild.id + '] PAY : NEGATIVEMONEY : ' + anzahl + '€')
            return interaction.reply({ embeds: [err.toJSON()], ephemeral: true })
        }

        // Check if Target is Bot
        const userinfo = await client.users.fetch(user);
        if (userinfo.bot == true) {
            // Create Embed
            const err = new EmbedBuilder()
        		.setTitle('» FEHLER')
        		.setDescription('» Du kannst einem Bot kein Geld geben!')
        		.setFooter({ text: '» ' + version });
            
            // Send Message
            console.log('[0xBOT] [i] [' + interaction.user.id + ' @ ' + interaction.guild.id + '] PAY : ' + user + ' : BOT : ' + anzahl + '€')
            return interaction.reply({ embeds: [err.toJSON()], ephemeral: true })
        }
        
        // Create Embeds
      	const message = new EmbedBuilder()
            .setTitle('» GELD GEBEN')
  			.setDescription('» Du hast <@' + user + '> **' + anzahl + '€** gegeben!')
        	.setFooter({ text: '» ' + version });
        const err2 = new EmbedBuilder()
            .setTitle('» GELD GEBEN')
  			.setDescription('» Du kannst dir nicht selber Geld überweisen!')
        	.setFooter({ text: '» ' + version });
        
        // Check if User is Author
        if (interaction.user.id == user) {
            return interaction.reply({ embeds: [err2.toJSON()], ephemeral: true })
        }
        
        // Set Money
        if (money >= anzahl) {
        	rembal('<@' + interaction.user.id + '>', anzahl)
        	addbal('<@' + user + '>', anzahl)
        } else {
            const missing = anzahl - money
            
            // Create Embed
            const err = new EmbedBuilder()
            	.setTitle('» GELD GEBEN')
  				.setDescription('» Du hast dafür nicht genug Geld, dir fehlen **' + missing + '€**!')
            	.setFooter({ text: '» ' + version });
            
            // Send Message
            console.log('[0xBOT] [i] [' + interaction.user.id + ' @ ' + interaction.guild.id + '] PAY : ' + user + ' : NOTENOUGHMONEY : ' + anzahl + '€')
            return interaction.reply({ embeds: [err.toJSON()], ephemeral: true })
        }

        // Send Message
        console.log('[0xBOT] [i] [' + interaction.user.id + ' @ ' + interaction.guild.id + '] PAY : ' + user + ' : ' + anzahl + '€')
        return interaction.reply({ embeds: [message.toJSON()] })
    },
};