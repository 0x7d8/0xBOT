const { Collection } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('@discordjs/builders');
const { version } = require('../../config.json');

const cooldown = new Collection();
const time = 1800000;

module.exports = {
    data: new SlashCommandBuilder()
        .setName('work')
    	.setDMPermission(false)
        .setDescription('WORK FOR MONEY')
        .setDescriptionLocalizations({
            de: 'ARBEITE FÜR GELD'
        }),
    async execute(interaction, client, lang, vote) {
        // Check if Work is Enabled in Server
        const wes = await gopt.get(interaction.guild.id + '-WORK')
        if (parseInt(wes) == 1) {
            // Create Embed
            let message = new EmbedBuilder()
        		.setTitle('» ERROR')
        		.setDescription('» The **`/work`** Command is disabled on this Server!')
        		.setFooter({ text: '» ' + vote + ' » ' + version });

            if (lang.toString() == "de") {
                message = new EmbedBuilder()
        		    .setTitle('» FEHLER')
        		    .setDescription('» Der **`/work`** Befehl ist auf diesem Server deaktiviert!')
        		    .setFooter({ text: '» ' + vote + ' » ' + version });
            }
            
            // Send Message
            bot.log(false, interaction.user.id, interaction.guild.id, '[CMD] WORK : DISABLED')
            return interaction.reply({ embeds: [message.toJSON()], ephemeral: true })
        }

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
            	.setFooter({ text: '» ' + vote + ' » ' + version });

            if (lang.toString() == "de") {
                message = new EmbedBuilder()
            	    .setTitle('» FEHLER')
  				    .setDescription('» Du hast leider noch einen Cooldown von **' + cdown.toFixed(0) + use + '**!')
            	    .setFooter({ text: '» ' + vote + ' » ' + version });
            }
            
            // Send Message
            bot.log(false, interaction.user.id, interaction.guild.id, '[CMD] WORK : ONCOOLDOWN : ' + cdown.toFixed(0) + use);
            return interaction.reply({ embeds: [message.toJSON()], ephemeral: true })
        } else {
            
            // Set Jobs
            let job
            let result
        	if (random == '1') { job = 'PROGRAMMER'; result = Math.floor(Math.random() * (200 - 75 + 1)) + 75; }
        	if (random == '2') { job = 'CLEANER'; result = Math.floor(Math.random() * (100 - 50 + 1)) + 50; }
        	if (random == '3') { job = 'MCDONALDS WORKER'; result = Math.floor(Math.random() * (120 - 30 + 1)) + 30; }
        	if (random == '4') { job = 'PAINTER'; result = Math.floor(Math.random() * (500 - 200 + 1)) + 200; }

            if (lang.toString() == "de") {
                if (random == '1') { job = 'PROGRAMMIERER'; }
        	    if (random == '2') { job = 'HAUSMEISTER'; }
        	    if (random == '3') { job = 'MCDONALDS KASSIERER'; }
        	    if (random == '4') { job = 'KÜNSTLER'; }
            }

            // Check for Car Boost
            let carboost = false
            let carboostam
            const car = await item.get(interaction.user.id.replace(/\D/g, '') + '-CAR', 'value')
            if (car !== 0) {
                carboost = true
                carboostam = await item.get(interaction.user.id.replace(/\D/g, '') + '-CAR', 'amount')
            }
            
            // Set Extra Text
            let extra
            if (!carboost) {
                if (result < 40) { extra = 'MEH.' }
                if (result >= 40) { extra = 'NICE.' }
                if (result >= 60) { extra = 'GREAT.' }
                if (result >= 80) { extra = 'WONDERFUL!' }
                if (result >= 100) { extra = 'WOW!' }
                if (lang.toString() == "de") {
                    if (result < 40) { extra = 'MEH.' }
                    if (result >= 40) { extra = 'NICE.' }
                    if (result >= 60) { extra = 'PRIMA.' }
                    if (result >= 80) { extra = 'TOLL!' }
                    if (result >= 100) { extra = 'WOW!' }
                }
            } else {
                if (result < 40) { extra = 'MEH.\n\n**+' + carboostam + '%** thanks to your Car!' }
                if (result >= 40) { extra = 'NICE.\n\n**+' + carboostam + '%** thanks to your Car!' }
                if (result >= 60) { extra = 'GREAT.\n\n**+' + carboostam + '%** thanks to your Car!' }
                if (result >= 80) { extra = 'WONDERFUL!\n\n**+' + carboostam + '%** thanks to your Car!' }
                if (result >= 100) { extra = 'WOW!\n\n**+' + carboostam + '%** thanks to your Car!' }
                if (lang.toString() == "de") {
                    if (result < 40) { extra = 'MEH.\n\n**+' + carboostam + '%** wegen deinem Auto!' }
                    if (result >= 40) { extra = 'NICE.\n\n**+' + carboostam + '%** wegen deinem Auto!' }
                    if (result >= 60) { extra = 'PRIMA.\n\n**+' + carboostam + '%** wegen deinem Auto!' }
                    if (result >= 80) { extra = 'TOLL!\n\n**+' + carboostam + '%** wegen deinem Auto!' }
                    if (result >= 100) { extra = 'WOW!\n\n**+' + carboostam + '%** wegen deinem Auto!' }
                }
            }

            // Calculate Result with Car
            let resultcar
            if (!carboost) { resultcar = result } else { resultcar = await Math.round(addper(result, carboostam)) }
        
        	// Create Embed
      		let message = new EmbedBuilder()
            	.setTitle('» WORK')
  				.setDescription('» You work as **' + job + '** and earn **$' + resultcar + '**! ' + extra)
            	.setFooter({ text: '» ' + vote + ' » ' + version });

            if (lang.toString() == "de") {
                message = new EmbedBuilder()
            	    .setTitle('» ARBEIT')
  				    .setDescription('» Du arbeitest als **' + job + '** und verdienst **' + resultcar + '€**! ' + extra)
            	    .setFooter({ text: '» ' + vote + ' » ' + version });
            }
        
        	// Send Money
        	bals.add(interaction.user.id.replace(/\D/g, ''), resultcar)
            bot.log(false, interaction.user.id, interaction.guild.id, '[CMD] WORK : ' + resultcar + '€');
            
            // Set Cooldown
			cooldown.set(interaction.user.id.replace(/\D/g, ''), Date.now() + time);
            setTimeout(() => cooldown.delete(), time)
            
            // Send Message
        	return interaction.reply({ embeds: [message.toJSON()] })
        }
    },
};