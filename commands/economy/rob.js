const { Client, Intents, Collection } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('@discordjs/builders');
const { version } = require('../../config.json');
const cooldown = new Collection();
let time = 30000;

module.exports = {
    data: new SlashCommandBuilder()
        .setName('rob')
        .setDescription('RAUBE JEMANDEN AUS')
    	.setDMPermission(false)
        .addUserOption(option =>
            option.setName('user')
                .setDescription('DER NUTZER')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('geld')
                .setDescription('DAS GELD')
                .setRequired(true)
    			.addChoices(
                    // Setup Choices
            		{ name: '💸 [35%] 10€ - 20€', value: '35' },
                    { name: '🤑 [20%] 30€ - 50€', value: '20' },
                    { name: '💰 [05%] 60€ - 100€', value: '5' },
				)),
    async execute(interaction) {
        // Count to Global Commands
        addcmd('t-all', 1)
        
        // Count Guild Commands and User
        addcmd('g-' + interaction.guild.id, 1)
        addcmd('u-' + interaction.user.id, 1)
        
        // Set Variables
        const user = interaction.options.getUser("user")
        const money = interaction.options.getString("geld")
        const moneysnd = await getbal('<@' + interaction.user.id + '>');
        const moneytar = await getbal('<@' + user + '>');

        // Cooldown
        if (cooldown.get(interaction.user.id) - Date.now() > 0) {
            // Translate Vars
        	const timeLeft = cooldown.get(interaction.user.id) - Date.now(); 
            const cdown = timeLeft / 1000;
            
            // Create Embed
            const err = new EmbedBuilder()
            	.setTitle('» AUSRAUBEN')
  				.setDescription('» Du hast leider noch einen Cooldown von **' + cdown.toFixed(0) + 's**!')
            	.setFooter({ text: '» ' + version });
            
            console.log('[0xBOT] [i] [' + interaction.user.id + ' @ ' + interaction.guild.id + '] ROB : ONCOOLDOWN : ' + cdown.toFixed(0) + 's');
            return interaction.reply({ embeds: [err.toJSON()], ephemeral: true })
        }
        
        // Check if User is Author
        if (interaction.user.id == user) {
            
            // Create Embed
            const err = new EmbedBuilder()
            	.setTitle('» AUSRAUBEN')
  				.setDescription('» Du kannst dich nicht selber ausrauben?!')
            	.setFooter({ text: '» ' + version });
            
            return interaction.reply({ embeds: [err.toJSON()], ephemeral: true })
        }
        
        // Set Steal to Need
        let need
        if (money == 35) { need = '20' }
        if (money == 20) { need = '50' }
        if (money == 5) { need = '100' }
        
        // Check for enough Money #1
        // Create Embed
        const notenoughmoney1 = new EmbedBuilder()
        	.setTitle('» AUSRAUBEN')
  			.setDescription('» Du hast nicht genug Geld dafür, du brauchst mindestens **' + need + '€**! BRUH.')
        	.setFooter({ text: '» ' + version });
            
        // Check Money
        if (geld == 35 && moneysnd < 20) {
            console.log('[0xBOT] [i] [' + interaction.user.id + ' @ ' + interaction.guild.id + '] ROB : ' + user + ' : NOTENOUGHMONEY')
            return interaction.reply({ embeds: [notenoughmoney1.toJSON()], ephemeral: true })
     	};
        if (geld == 20 && moneysnd < 50) {
            console.log('[0xBOT] [i] [' + interaction.user.id + ' @ ' + interaction.guild.id + '] ROB : ' + user + ' : NOTENOUGHMONEY')
            return interaction.reply({ embeds: [notenoughmoney1.toJSON()], ephemeral: true })
     	};
        if (geld == 5 && moneysnd < 100) {
            console.log('[0xBOT] [i] [' + interaction.user.id + ' @ ' + interaction.guild.id + '] ROB : ' + user + ' : NOTENOUGHMONEY')
            return interaction.reply({ embeds: [notenoughmoney1.toJSON()], ephemeral: true })
     	};
            
        // Check for enough Money #2
        // Create Embed
        const notenoughmoney2 = new EmbedBuilder()
        	.setTitle('» AUSRAUBEN')
  			.setDescription('» <@' + user + '> hat nicht genug Geld dafür, er braucht mindestens **' + need + '€**! LOL.')
        	.setFooter({ text: '» ' + version });
            
        // Check Money
        if (money == 35 && moneytar < 20) {
            console.log('[0xBOT] [i] [' + interaction.user.id + ' @ ' + interaction.guild.id + '] ROB : ' + user + ' : NOTENOUGHMONEY')
            return interaction.reply({ embeds: [notenoughmoney2.toJSON()], ephemeral: true })
     	};
        if (money == 20 && moneytar < 50) {
            console.log('[0xBOT] [i] [' + interaction.user.id + ' @ ' + interaction.guild.id + '] ROB : ' + user + ' : NOTENOUGHMONEY')
            return interaction.reply({ embeds: [notenoughmoney2.toJSON()], ephemeral: true })
     	};
        if (money == 5 && moneytar < 100) {
            console.log('[0xBOT] [i] [' + interaction.user.id + ' @ ' + interaction.guild.id + '] ROB : ' + user + ' : NOTENOUGHMONEY')
            return interaction.reply({ embeds: [notenoughmoney2.toJSON()], ephemeral: true })
     	};
        
        // Setup Chances
        const random35 = Math.floor(Math.random() * (3 - 1 + 1)) + 1;
        const random20 = Math.floor(Math.random() * (5 - 1 + 1)) + 1;
        const random05 = Math.floor(Math.random() * (20 - 1 + 1)) + 1;
        
        let status
        let amount
        if (geld == 35) {
        	if (random35 == 1) { status = true; amount = Math.floor(Math.random() * (20 - 10 + 1)) + 10; } else { 
                status = false; amount = Math.floor(Math.random() * (20 - 15 + 1)) + 10; }
        } else if (geld == 20) {
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
        if (amount < 20) { extra = 'NAJA.'}
        if (amount >= 20) { extra = 'NICE.' }
        if (amount >= 40) { extra = 'PRIMA.' }
        if (amount >= 60) { extra = 'LOL.' }
        if (amount >= 80) { extra = 'EIN PRO??!!' }
        
        // Create Embeds
      	const sucess = new EmbedBuilder()
            .setTitle('» AUSRAUBEN')
  			.setDescription('» Du hast <@' + user + '> **' + amount + '€** geklaut! ' + extra)
        	.setFooter({ text: '» ' + version });
        const failure = new EmbedBuilder()
            .setTitle('» AUSRAUBEN')
  			.setDescription('» Du wolltest <@' + user + '> **' + amount + '€** klauen, aber die Polizei hat dich erwischt! Du musstest **' + punishment + '€** Strafgeld bezahlen! KEKW.')
        	.setFooter({ text: '» ' + version });
        
        // Set Money
        if (status == false) {
            // Set Cooldown
			cooldown.set(interaction.user.id, Date.now() + time);
        	setTimeout(() => cooldown.delete(), time)
            
            console.log('[0xBOT] [i] [' + interaction.user.id + ' @ ' + interaction.guild.id + '] ROB : ' + user + ' : ' + anzahl + '€ : FAILURE : ' + punishment + '€')
        	rembal('<@' + interaction.user.id + '>', punishment)
        	return interaction.reply({ embeds: [failure.toJSON()] })
        }
        
        // Set Cooldown
		cooldown.set(interaction.user.id, Date.now() + time);
        setTimeout(() => cooldown.delete(), time)

        // Set Money
        rembal('<@' + user + '>', anzahl)
        addbal('<@' + interaction.user.id + '>', anzahl)
        
        // Send Message
        console.log('[0xBOT] [i] [' + interaction.user.id + ' @ ' + interaction.guild.id + '] ROB : ' + user + ' : ' + anzahl + '€ : SUCCESS')
        return interaction.reply({ embeds: [sucess.toJSON()] })
    },
};