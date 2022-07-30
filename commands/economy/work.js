const { Client, Intents, Collection } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('@discordjs/builders');
const { version } = require('../../config.json');
const cooldown = new Collection();
let time = 900000;

module.exports = {
    data: new SlashCommandBuilder()
        .setName('work')
    	.setDMPermission(false)
        .setDescription('ARBEITE FÜR GELD'),
    async execute(interaction) {
        // Count to Global Commands
        addcmd('t-all', 1)
        
        // Count Guild Commands and User
        addcmd('g-' + interaction.guild.id, 1)
        addcmd('u-' + interaction.user.id, 1)
        
        // Set Variables
        const random = Math.floor(Math.random() * (4 - 1 + 1)) + 1;
        
        // Check Maintenance
        const { maintenance } = require('../../config.json');
        if (maintenance == 'yes' && interaction.user.id != '745619551865012274') {
            // Create Embed
            var mterr = new EmbedBuilder()
        		.setTitle('» FEHLER')
        		.setDescription('» Der Bot ist aktuell unter Wartungsarbeiten!')
        		.setFooter({ text: '» ' + version });
            
            return interaction.reply({ embeds: [mterr.toJSON()], ephemeral: true })
        }
        
        // Cooldown
        if (cooldown.get(interaction.user.id) - Date.now() > 0) {
        	// Translate Vars
        	const timeLeft = cooldown.get(interaction.user.id) - Date.now(); 
            var use = 's'
            var cdown = timeLeft / 1000;
            if (cdown > 60) { var cdown = timeLeft / 1000 / 60; var use = 'm' }
            
            // Create Embed
            var err = new EmbedBuilder()
            	.setTitle('» ARBEIT')
  				.setDescription('» Du hast leider noch einen Cooldown von **' + cdown.toFixed(0) + use + '**!')
            	.setFooter({ text: '» ' + version });
            
            console.log('[0xBOT] [i] [' + interaction.user.id + ' @ ' + interaction.guild.id + '] WORK : ONCOOLDOWN : ' + cdown.toFixed(0) + use);
            return interaction.reply({ embeds: [err.toJSON()], ephemeral: true })
        } else {
            
            // Set Jobs
        	if (random == '1') { var job = 'PROGRAMMIERER'; var result = Math.floor(Math.random() * (75 - 40 + 1)) + 40; }
        	if (random == '2') { var job = 'HAUSMEISTER'; var result = Math.floor(Math.random() * (40 - 25 + 1)) + 25; }
        	if (random == '3') { var job = 'MCDONALDS KASSIERER'; var result = Math.floor(Math.random() * (25 - 10 + 1)) + 10; }
        	if (random == '4') { var job = 'KÜNSTLER'; var result = Math.floor(Math.random() * (100 - 25 + 1)) + 25; }
            
            // Set Extra Text
            if (result < 20) { var extra = 'MEH.' }
            if (result >= 20) { var extra = 'NICE.' }
            if (result >= 40) { var extra = 'PRIMA.' }
            if (result >= 60) { var extra = 'TOLL!' }
            if (result >= 80) { var extra = 'WOW!' }
        
        	// Create Embed
      		const message = new EmbedBuilder()
            	.setTitle('» ARBEIT')
  				.setDescription('» Du arbeitest als **' + job + '** und verdienst **' + result + '€**! ' + extra)
            	.setFooter({ text: '» ' + version });
        
        	// Send Money
        	addbal('<@' + interaction.user.id + '>', result)
            console.log('[0xBOT] [i] [' + interaction.user.id + ' @ ' + interaction.guild.id + '] WORK : ' + result + '€');
            
            // Set Cooldown
			cooldown.set(interaction.user.id, Date.now() + time);
            setTimeout(() => cooldown.delete(), time)
            
            // Send Message
        	return interaction.reply({ embeds: [message.toJSON()] })
        }
    },
};