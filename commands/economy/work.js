const { Collection } = require('discord.js');
const { SlashCommandBuilder, EmbedBuilder } = require('@discordjs/builders');
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
            let message = new EmbedBuilder().setColor('#37009B')
        		.setTitle('<:EXCLAMATION:1024407166460891166> » ERROR')
        		.setDescription('» The **`/work`** Command is disabled on this Server!')
        		.setFooter({ text: '» ' + vote + ' » ' + version });

            if (lang === 'de') {
                message = new EmbedBuilder().setColor('#37009B')
        		    .setTitle('<:EXCLAMATION:1024407166460891166> » FEHLER')
        		    .setDescription('» Der **`/work`** Befehl ist auf diesem Server deaktiviert!')
        		    .setFooter({ text: '» ' + vote + ' » ' + version });
            }
            
            // Send Message
            bot.log(false, interaction.user.id, interaction.guild.id, '[CMD] WORK : DISABLED')
            return interaction.reply({ embeds: [message], ephemeral: true })
        }

        // Set Variables
        const random = Math.floor(Math.random() * (4 - 1 + 1)) + 1;

        // Cooldown
        if (cooldown.get(interaction.user.id) - Date.now() > 0) {
        	// Translate Vars
            let use, cdown
        	const timeLeft = cooldown.get(interaction.user.id) - Date.now();
            use = 's'; cdown = timeLeft / 1000;
            if (cdown > 60) { cdown = timeLeft / 1000 / 60; use = 'm' }
            
            // Create Embed
            let message = new EmbedBuilder().setColor('#37009B')
            	.setTitle('<:EXCLAMATION:1024407166460891166> » ERROR')
  				.setDescription('» You still have a Cooldown of **' + cdown.toFixed(0) + use + '**!')
            	.setFooter({ text: '» ' + vote + ' » ' + version });

            if (lang === 'de') {
                message = new EmbedBuilder().setColor('#37009B')
            	    .setTitle('<:EXCLAMATION:1024407166460891166> » FEHLER')
  				    .setDescription('» Du hast leider noch einen Cooldown von **' + cdown.toFixed(0) + use + '**!')
            	    .setFooter({ text: '» ' + vote + ' » ' + version });
            }
            
            // Send Message
            bot.log(false, interaction.user.id, interaction.guild.id, '[CMD] WORK : ONCOOLDOWN : ' + cdown.toFixed(0) + use);
            return interaction.reply({ embeds: [message], ephemeral: true })
        } else {
            
            // Set Jobs
            let job
            let result
        	if (random == '1') { job = 'PROGRAMMER'; result = Math.floor(Math.random() * (200 - 75 + 1)) + 75; }
        	if (random == '2') { job = 'CLEANER'; result = Math.floor(Math.random() * (100 - 50 + 1)) + 50; }
        	if (random == '3') { job = 'MCDONALDS WORKER'; result = Math.floor(Math.random() * (120 - 30 + 1)) + 30; }
        	if (random == '4') { job = 'PAINTER'; result = Math.floor(Math.random() * (500 - 200 + 1)) + 200; }

            if (lang === 'de') {
                if (random == '1') { job = 'PROGRAMMIERER'; }
        	    if (random == '2') { job = 'HAUSMEISTER'; }
        	    if (random == '3') { job = 'MCDONALDS KASSIERER'; }
        	    if (random == '4') { job = 'KÜNSTLER'; }
            }

            // Check for Car Boost
            let carboost = false; let carboostam
            const car = await bot.items.get(interaction.user.id + '-CAR-' + interaction.guild.id, 'value')
            if (car !== 0) {
                carboost = true
                carboostam = await bot.items.get(interaction.user.id + '-CAR-' + interaction.guild.id, 'amount')
            }
            
            // Set Extra Text
            let extra
            if (!carboost) {
                if (result < 40) { extra = 'MEH.' }
                if (result >= 40) { extra = 'NICE.' }
                if (result >= 60) { extra = 'GREAT.' }
                if (result >= 80) { extra = 'WONDERFUL!' }
                if (result >= 100) { extra = 'WOW!' }
                if (lang === 'de') {
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
                if (lang === 'de') {
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
      		let message = new EmbedBuilder().setColor('#37009B')
            	.setTitle('<:HAMMER:1024388163747184662> » WORK')
  				.setDescription('» You work as **' + job + '** and earn **$' + resultcar + '**! ' + extra)
            	.setFooter({ text: '» ' + vote + ' » ' + version });

            if (lang === 'de') {
                message = new EmbedBuilder().setColor('#37009B')
            	    .setTitle('<:HAMMER:1024388163747184662> » ARBEIT')
  				    .setDescription('» Du arbeitest als **' + job + '** und verdienst **' + resultcar + '€**! ' + extra)
            	    .setFooter({ text: '» ' + vote + ' » ' + version });
            }
        
        	// Send Money
        	bot.money.add(interaction, interaction.user.id, resultcar)
            bot.log(false, interaction.user.id, interaction.guild.id, '[CMD] WORK : ' + resultcar + '€');
            
            // Set Cooldown
			cooldown.set(interaction.user.id, Date.now() + time);
            setTimeout(() => cooldown.delete(), time)
            
            // Send Message
        	return interaction.reply({ embeds: [message] })
        }
    },
};