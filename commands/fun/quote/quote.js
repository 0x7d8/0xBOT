const { Intents, Collection } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('@discordjs/builders');
const { version, token } = require('../../../config.json');
const cooldown = new Collection();
let time = 45000;

// Register Client
const { Client, GatewayIntentBits } = require('discord.js');
const client = new Client({ intents: [GatewayIntentBits.Guilds] });
client.login(token)

module.exports = {
    data: new SlashCommandBuilder()
        .setName('quote')
        .setDescription('QUOTE SOMETHING')
        .setDescriptionLocalizations({
            de: 'ZITIERE ETWAS'
        })
    	.setDMPermission(false)
        .addStringOption(option =>
            option.setName('quote')
                .setNameLocalizations({
                    de: 'zitat'
                })
                .setDescription('THE QUOTE')
                .setDescriptionLocalizations({
                    de: 'DAS ZITAT'
                })
                .setRequired(true))
        .addUserOption(option =>
            option.setName('author')
                .setNameLocalizations({
                    de: 'autor'
                })
                .setDescription('THE AUTHOR')
                .setDescriptionLocalizations({
                    de: 'DER AUTOR'
                })
                .setRequired(false)),
    async execute(interaction) {
        // Count to Global Commands
        cmds.add('t-all', 1)
        
        // Count Guild Commands and User
        cmds.add('g-' + interaction.guild.id, 1)
        cmds.add('u-' + interaction.user.id, 1)
        
        // Set Variables
        const zitat = interaction.options.getString("quote")
        const autor = interaction.options.getUser("author")
     
        // Cooldown
        if (cooldown.get(interaction.user.id) - Date.now() > 0) {
            // Translate Vars
        	const timeLeft = cooldown.get(interaction.user.id) - Date.now(); 
            const cdown = timeLeft / 1000;
            
            // Create Embed
            const err = new EmbedBuilder()
            	.setTitle('» ZITAT')
  				.setDescription('» Du hast leider noch einen Cooldown von **' + cdown.toFixed(0) + 's**!')
            	.setFooter({ text: '» ' + version});
            
            // Send Message
            console.log('[0xBOT] [i] [' + interaction.user.id + ' @ ' + interaction.guild.id + '] QUOTE : ONCOOLDOWN : ' + cdown.toFixed(0) + 's');
            return interaction.reply({ embeds: [err.toJSON()], ephemeral: true })
        }
        
        // Check if there is a author specified
        let message
        if (autor == null) {
            const amount = await getqut('<@' + interaction.user.id + '>') + 1;
        	message = new EmbedBuilder()
            	.setTitle('» EIN WEISES ZITAT')
  				.setDescription('» "' + zitat + '" ~<@' + interaction.user.id + '>')
            	.setFooter({ text: '» ' + version + ' » ZITATE: ' + amount});
            
            console.log('[0xBOT] [i] [' + interaction.user.id + ' @ ' + interaction.guild.id + '] QUOTE : ' + zitat.toUpperCase())
        } else {
            const amount = await getqut('<@' + autor + '>') + 1;
        	message = new EmbedBuilder()
            	.setTitle('» EIN ZITAT')
  				.setDescription('» "' + zitat + '" ~<@' + autor + '>')
            	.setFooter({ text: '» ' + version + ' » ZITATE: ' + amount});
            
            console.log('[0xBOT] [i] [' + interaction.user.id + ' @ ' + interaction.guild.id + '] QUOTE : ' + zitat.toUpperCase() + ' : ~' + autor)
            addqut('<@' + autor + '>', 1);
        }

        // Check if Target is Bot
        const userinfo = await client.users.fetch(user);
        if (userinfo.bot == true) {
            // Create Embed
            const err = new EmbedBuilder()
        		.setTitle('» FEHLER')
        		.setDescription('» Du kannst einen Bot Leider nicht Zitieren!')
        		.setFooter({ text: '» ' + version });
            
            // Send Message
            console.log('[0xBOT] [i] [' + interaction.user.id + ' @ ' + interaction.guild.id + '] QUOTE : ' + user + ' : BOT : ' + zitat.toUpperCase())
            return interaction.reply({ embeds: [err.toJSON()], ephemeral: true })
        }
        
        // Set Cooldown
		cooldown.set(interaction.user.id, Date.now() + time);
        setTimeout(() => cooldown.delete(), time)

        // Send Message
        return interaction.reply({ embeds: [message.toJSON()] })
    },
};