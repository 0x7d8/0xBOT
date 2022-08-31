const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('@discordjs/builders');
const { version } = require('../../config.json');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('pay')
        .setDescription('GEBE JEMANDED GELB')
    	.setDMPermission(false)
        .addUserOption(option =>
            option.setName('user')
                .setDescription('DER NUTZER')
                .setRequired(true))
        .addIntegerOption(option =>
            option.setName('anzahl')
                .setDescription('DIE ANZAHL')
                .setRequired(true)),
    async execute(interaction) {
        // Count to Global Commands
        addcmd('t-all', 1)
        
        // Count Guild Commands and User
        addcmd('g-' + interaction.guild.id, 1)
        addcmd('u-' + interaction.user.id, 1)
        
        // Set Variables
        const user = interaction.options.getUser("user")
        const anzahl = interaction.options.getInteger("anzahl")
        const money = await getbal('<@' + interaction.user.id + '>');

        // Check if Balance is Minus
        if (anzahl < 0) {
            // Create Embed
            const err = new EmbedBuilder()
        		.setTitle('» FEHLER')
        		.setDescription('» Du kannst kein negatives Geld senden!')
        		.setFooter({ text: '» ' + version });
            
            // Send Message
            console.log('[0xBOT] [i] [' + interaction.user.id + ' @ ' + interaction.guild.id + '] PAY : NEGATIVEMONEY : ' + wette + '€')
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