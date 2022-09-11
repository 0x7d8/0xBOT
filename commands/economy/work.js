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
        .setDescription('WORK FOR MONEY')
        .setDescriptionLocalizations({
            de: 'ARBEITE FÜR GELD'
        }),
    async execute(interaction, client) {
        // Set Variables
        const random = Math.floor(Math.random() * (4 - 1 + 1)) + 1;

        // Cooldown
        if (cooldown.get(interaction.user.id.replace(/\D/g, '')) - Date.now() > 0) {
        	// Translate Vars
            let use
            let cdown
        	const timeLeft = cooldown.get(interaction.user.id.replace(/\D/g, '')) - Date.now();
            use = 's'
            cdown = timeLeft / 1000;
            if (cdown > 60) { cdown = timeLeft / 1000 / 60; use = 'm' }
            
            // Create Embed
            let message = new EmbedBuilder()
            	.setTitle('» ERROR')
  				.setDescription('» You still have a Cooldown of **' + cdown.toFixed(0) + use + '**!')
            	.setFooter({ text: '» ' + version });

            if (interaction.guildLocale == "de") {
                message = new EmbedBuilder()
            	    .setTitle('» FEHLER')
  				    .setDescription('» Du hast leider noch einen Cooldown von **' + cdown.toFixed(0) + use + 's*!')
            	    .setFooter({ text: '» ' + version });
            }
            
            // Send Message
            console.log('[0xBOT] [i] [' + new Date().toLocaleTimeString('en-US', { hour12: false }) + '] [' + interaction.user.id.replace(/\D/g, '') + ' @ ' + interaction.guild.id + '] [CMD] WORK : ONCOOLDOWN : ' + cdown.toFixed(0) + use);
            await return interaction.reply({ embeds: [message.toJSON()], ephemeral: true })
        } else {
            
            // Set Jobs
            let job
            let result
        	if (random == '1') { job = 'PROGRAMMER'; result = Math.floor(Math.random() * (200 - 75 + 1)) + 75; }
        	if (random == '2') { job = 'CLEANER'; result = Math.floor(Math.random() * (100 - 50 + 1)) + 50; }
        	if (random == '3') { job = 'MCDONALDS WORKER'; result = Math.floor(Math.random() * (120 - 30 + 1)) + 30; }
        	if (random == '4') { job = 'PAINTER'; result = Math.floor(Math.random() * (500 - 200 + 1)) + 200; }

            if (interaction.guildLocale == "de") {
                if (random == '1') { job = 'PROGRAMMIERER'; }
        	    if (random == '2') { job = 'HAUSMEISTER'; }
        	    if (random == '3') { job = 'MCDONALDS KASSIERER'; }
        	    if (random == '4') { job = 'KÜNSTLER'; }
            }
            
            // Set Extra Text
            let extra
            if (result < 40) { extra = 'MEH.' }
            if (result >= 40) { extra = 'NICE.' }
            if (result >= 60) { extra = 'GREAT.' }
            if (result >= 80) { extra = 'WONDERFUL!' }
            if (result >= 100) { extra = 'WOW!' }

            if (interaction.guildLocale == "de") {
                if (result < 40) { extra = 'MEH.' }
                if (result >= 40) { extra = 'NICE.' }
                if (result >= 60) { extra = 'PRIMA.' }
                if (result >= 80) { extra = 'TOLL!' }
                if (result >= 100) { extra = 'WOW!' }
            }
        
        	// Create Embed
      		let message = new EmbedBuilder()
            	.setTitle('» WORK')
  				.setDescription('» You work as **' + job + '** and earn **$' + result + '**! ' + extra)
            	.setFooter({ text: '» ' + version });

            if (interaction.guildLocale == "de") {
                message = new EmbedBuilder()
            	    .setTitle('» ARBEIT')
  				    .setDescription('» Du arbeitest als **' + job + '** und verdienst **' + result + '€**! ' + extra)
            	    .setFooter({ text: '» ' + version });
            }
        
        	// Send Money
        	bals.add(interaction.user.id.replace(/\D/g, ''), result)
            console.log('[0xBOT] [i] [' + new Date().toLocaleTimeString('en-US', { hour12: false }) + '] [' + interaction.user.id.replace(/\D/g, '') + ' @ ' + interaction.guild.id + '] [CMD] WORK : ' + result + '€');
            
            // Set Cooldown
			cooldown.set(interaction.user.id.replace(/\D/g, ''), Date.now() + time);
            setTimeout(() => cooldown.delete(), time)
            
            // Send Message
        	await return interaction.reply({ embeds: [message.toJSON()] })
        }
    },
};