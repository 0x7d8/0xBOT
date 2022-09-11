const { Intents, Collection } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('@discordjs/builders');
const { version } = require('../../config.json');
const cooldown = new Collection();
let time = 30000;

module.exports = {
    data: new SlashCommandBuilder()
        .setName('rob')
        .setDescription('ROB SOMEONE')
        .setDescriptionLocalizations({
            de: 'RAUBE JEMANDEN AUS'
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
        .addStringOption(option =>
            option.setName('money')
                .setNameLocalizations({
                    de: 'geld'
                })
                .setDescription('THE MONEY')
                .setDescriptionLocalizations({
                    de: 'DAS GELD'
                })
                .setRequired(true)
    			.addChoices(
                    // Setup Choices
            		{ name: '💸 [35%] 10€ - 20€', value: '35' },
                    { name: '🤑 [20%] 30€ - 50€', value: '20' },
                    { name: '💰 [05%] 60€ - 100€', value: '5' },
				)),
    async execute(interaction, client) {
        // Set Variables
        const user = interaction.options.getUser("user")
        const money = interaction.options.getString("money")
        const moneysnd = await bals.get(interaction.user.id.replace(/\D/g, ''));
        const moneytar = await bals.get(user.toString().replace(/\D/g, ''));

        // Cooldown
        if (cooldown.get(interaction.user.id.replace(/\D/g, '')) - Date.now() > 0) {
            // Translate Vars
        	const timeLeft = cooldown.get(interaction.user.id.replace(/\D/g, '')) - Date.now(); 
            const cdown = timeLeft / 1000;
            
            // Create Embed
            let message = new EmbedBuilder()
            	.setTitle('» ERROR')
  				.setDescription('» You still have a Cooldown of **' + cdown.toFixed(0) + 's**!')
            	.setFooter({ text: '» ' + version });

            if (interaction.guildLocale == "de") {
                message = new EmbedBuilder()
            	    .setTitle('» FEHLER')
  				    .setDescription('» Du hast leider noch einen Cooldown von **' + cdown.toFixed(0) + 's**!')
            	    .setFooter({ text: '» ' + version });
            }
            
            console.log('[0xBOT] [i] [' + new Date().toLocaleTimeString('en-US', { hour12: false }) + '] [' + interaction.user.id.replace(/\D/g, '') + ' @ ' + interaction.guild.id + '] [CMD] ROB : ONCOOLDOWN : ' + cdown.toFixed(0) + 's');
            return interaction.edit.message({ embeds: [message.toJSON()], ephemeral: true })
        }
        
        // Check if User is Author
        if (interaction.user.id.replace(/\D/g, '') == user) {
            
            // Create Embed
            let message = new EmbedBuilder()
            	.setTitle('» ERROR')
  				.setDescription('» You cant rob yourself?!')
            	.setFooter({ text: '» ' + version });

            if (interaction.guildLocale == "de") {
                message = new EmbedBuilder()
            	    .setTitle('» FEHLER')
  				    .setDescription('» Du kannst dich nicht selber ausrauben?!')
            	    .setFooter({ text: '» ' + version });
            }
            
            console.log('[0xBOT] [i] [' + new Date().toLocaleTimeString('en-US', { hour12: false }) + '] [' + interaction.user.id.replace(/\D/g, '') + ' @ ' + interaction.guild.id + '] [CMD] ROB : ' + user.toString().replace(/\D/g, '') + ' : ' + money + '€ : SAMEPERSON')
            return interaction.edit.message({ embeds: [message.toJSON()], ephemeral: true })
        }

        // Check if Target is Bot
        const userinfo = await client.users.fetch(user);
        if (userinfo.bot == true) {
            // Create Embed
            let message = new EmbedBuilder()
        		.setTitle('» ERROR')
        		.setDescription('» You cant rob a Bot!')
        		.setFooter({ text: '» ' + version });

            if (interaction.guildLocale == "de") {
                message = new EmbedBuilder()
        		    .setTitle('» FEHLER')
        		    .setDescription('» Du kannst einem Bot kein Geld klauen!')
        		    .setFooter({ text: '» ' + version });
            }
            
            // Send Message
            console.log('[0xBOT] [i] [' + new Date().toLocaleTimeString('en-US', { hour12: false }) + '] [' + interaction.user.id.replace(/\D/g, '') + ' @ ' + interaction.guild.id + '] [CMD] ROB : ' + user + ' : BOT')
            return interaction.edit.message({ embeds: [message.toJSON()], ephemeral: true })
        }
        
        // Set Steal to Need
        let need
        if (money == 35) { need = '20' }
        if (money == 20) { need = '50' }
        if (money == 5) { need = '100' }
        
        // Check for enough Money #1
        // Create Embed
        let notenoughmoney1 = new EmbedBuilder()
        	.setTitle('» ERROR')
  			.setDescription('» You dont have enough Money for that, you need atleast **$' + need + '**! BRUH.')
        	.setFooter({ text: '» ' + version });

        if (interaction.guildLocale == "de") {
            notenoughmoney1 = new EmbedBuilder()
        	    .setTitle('» FEHLER')
  			    .setDescription('» Du hast nicht genug Geld dafür, du brauchst mindestens **' + need + '€**! BRUH.')
        	    .setFooter({ text: '» ' + version });
        }
            
        // Check Money
        if (money == 35 && moneysnd < 20) {
            console.log('[0xBOT] [i] [' + new Date().toLocaleTimeString('en-US', { hour12: false }) + '] [' + interaction.user.id.replace(/\D/g, '') + ' @ ' + interaction.guild.id + '] [CMD] ROB : ' + user + ' : NOTENOUGHMONEY')
            return interaction.edit.message({ embeds: [notenoughmoney1.toJSON()], ephemeral: true })
     	};
        if (money == 20 && moneysnd < 50) {
            console.log('[0xBOT] [i] [' + new Date().toLocaleTimeString('en-US', { hour12: false }) + '] [' + interaction.user.id.replace(/\D/g, '') + ' @ ' + interaction.guild.id + '] [CMD] ROB : ' + user + ' : NOTENOUGHMONEY')
            return interaction.edit.message({ embeds: [notenoughmoney1.toJSON()], ephemeral: true })
     	};
        if (money == 5 && moneysnd < 100) {
            console.log('[0xBOT] [i] [' + new Date().toLocaleTimeString('en-US', { hour12: false }) + '] [' + interaction.user.id.replace(/\D/g, '') + ' @ ' + interaction.guild.id + '] [CMD] ROB : ' + user + ' : NOTENOUGHMONEY')
            return interaction.edit.message({ embeds: [notenoughmoney1.toJSON()], ephemeral: true })
     	};
            
        // Check for enough Money #2
        // Create Embed
        let notenoughmoney2 = new EmbedBuilder()
        	.setTitle('» ERROR')
  			.setDescription('» <@' + user + '> doesnt have enough Money for that, he needs atleast **$' + need + '**! LOL.')
        	.setFooter({ text: '» ' + version });

        if (interaction.guildLocale == "de") {
            notenoughmoney2 = new EmbedBuilder()
        	    .setTitle('» FEHLER')
  			    .setDescription('» <@' + user + '> hat nicht genug Geld dafür, er braucht mindestens **' + need + '€**! LOL.')
        	    .setFooter({ text: '» ' + version });
        }
            
        // Check Money
        if (money == 35 && moneytar < 20) {
            console.log('[0xBOT] [i] [' + new Date().toLocaleTimeString('en-US', { hour12: false }) + '] [' + interaction.user.id.replace(/\D/g, '') + ' @ ' + interaction.guild.id + '] [CMD] ROB : ' + user + ' : NOTENOUGHMONEY')
            return interaction.edit.message({ embeds: [notenoughmoney2.toJSON()], ephemeral: true })
     	};
        if (money == 20 && moneytar < 50) {
            console.log('[0xBOT] [i] [' + new Date().toLocaleTimeString('en-US', { hour12: false }) + '] [' + interaction.user.id.replace(/\D/g, '') + ' @ ' + interaction.guild.id + '] [CMD] ROB : ' + user + ' : NOTENOUGHMONEY')
            return interaction.edit.message({ embeds: [notenoughmoney2.toJSON()], ephemeral: true })
     	};
        if (money == 5 && moneytar < 100) {
            console.log('[0xBOT] [i] [' + new Date().toLocaleTimeString('en-US', { hour12: false }) + '] [' + interaction.user.id.replace(/\D/g, '') + ' @ ' + interaction.guild.id + '] [CMD] ROB : ' + user + ' : NOTENOUGHMONEY')
            return interaction.edit.message({ embeds: [notenoughmoney2.toJSON()], ephemeral: true })
     	};
        
        // Setup Chances
        const random35 = Math.floor(Math.random() * (3 - 1 + 1)) + 1;
        const random20 = Math.floor(Math.random() * (5 - 1 + 1)) + 1;
        const random05 = Math.floor(Math.random() * (20 - 1 + 1)) + 1;
        
        let status
        let amount
        if (money == 35) {
        	if (random35 == 1) { status = true; amount = Math.floor(Math.random() * (20 - 10 + 1)) + 10; } else { 
                status = false; amount = Math.floor(Math.random() * (20 - 15 + 1)) + 10; }
        } else if (money == 20) {
            if (random20 == 1) { status = true; amount = Math.floor(Math.random() * (50 - 30 + 1)) + 30; } else {
                status = false; amount = Math.floor(Math.random() * (50 - 40 + 1)) + 30; }
        } else {
            if (random05 == 1) { status = true; amount = Math.floor(Math.random() * (100 - 50 + 1)) + 50; } else {
                status = false; amount = Math.floor(Math.random() * (100 - 80 + 1)) + 60; }
        }

        // Set Punishment
        let punishment
        if (moneysnd > parseInt(need)*2) {
            punishment = parseInt(amount)*2
        } else {
            punishment = parseInt(amount)
        }
        
        // Set Extra Text
        let extra
        if (amount < 20) { extra = 'MEH.'}
        if (amount >= 20) { extra = 'NICE.' }
        if (amount >= 40) { extra = 'WONDERFUL.' }
        if (amount >= 60) { extra = 'LOL.' }
        if (amount >= 80) { extra = 'A PRO??!!' }

        if (interaction.guildLocale == "de") {
            if (amount < 20) { extra = 'NAJA.'}
            if (amount >= 20) { extra = 'NICE.' }
            if (amount >= 40) { extra = 'PRIMA.' }
            if (amount >= 60) { extra = 'LOL.' }
            if (amount >= 80) { extra = 'EIN PRO??!!' }
        }
        
        // Create Embeds
      	let sucess = new EmbedBuilder()
            .setTitle('» AUSRAUBEN')
  			.setDescription('» You stole <@' + user + '> **$' + amount + '**! ' + extra)
        	.setFooter({ text: '» ' + version });

        let failure = new EmbedBuilder()
            .setTitle('» AUSRAUBEN')
  			.setDescription('» You wanted to steal <@' + user + '> **$' + amount + '**, but the Police caught you! You had to pay **$' + punishment + '**! KEKW.')
        	.setFooter({ text: '» ' + version });

        if (interaction.guildLocale == "de") {
            sucess = new EmbedBuilder()
                .setTitle('» AUSRAUBEN')
  			    .setDescription('» Du hast <@' + user + '> **' + amount + '€** geklaut! ' + extra)
        	    .setFooter({ text: '» ' + version });
            
            failure = new EmbedBuilder()
                .setTitle('» AUSRAUBEN')
                .setDescription('» Du wolltest <@' + user + '> **' + amount + '€** klauen, aber die Polizei hat dich erwischt! Du musstest **' + punishment + '€** Strafgeld bezahlen! KEKW.')
                .setFooter({ text: '» ' + version });
        }
        
        // Set Money
        if (status == false) {
            // Set Cooldown
			cooldown.set(interaction.user.id.replace(/\D/g, ''), Date.now() + time);
        	setTimeout(() => cooldown.delete(), time)
            
            console.log('[0xBOT] [i] [' + new Date().toLocaleTimeString('en-US', { hour12: false }) + '] [' + interaction.user.id.replace(/\D/g, '') + ' @ ' + interaction.guild.id + '] [CMD] ROB : ' + user + ' : ' + amount + '€ : FAILURE : ' + punishment + '€')
        	bals.rem(interaction.user.id.replace(/\D/g, ''), punishment)
        	return interaction.edit.message({ embeds: [failure.toJSON()] })
        }
        
        // Set Cooldown
		cooldown.set(interaction.user.id.replace(/\D/g, ''), Date.now() + time);
        setTimeout(() => cooldown.delete(), time)

        // Set Money
        bals.rem(user.toString().replace(/\D/g, ''), amount)
        bals.add(interaction.user.id.replace(/\D/g, ''), amount)
        
        // Send Message
        console.log('[0xBOT] [i] [' + new Date().toLocaleTimeString('en-US', { hour12: false }) + '] [' + interaction.user.id.replace(/\D/g, '') + ' @ ' + interaction.guild.id + '] [CMD] ROB : ' + user + ' : ' + amount + '€ : SUCCESS')
        return interaction.edit.message({ embeds: [sucess.toJSON()] })
    },
};