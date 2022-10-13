const { Collection } = require('discord.js')
const { SlashCommandBuilder } = require('@discordjs/builders')
const { EmbedBuilder } = require('@discordjs/builders')
const { version } = require('../../config.json')

const cooldown = new Collection()
let time = 30000

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
    async execute(interaction, client, lang, vote) {
        // Check if Rob is Enabled in Server
        const res = await gopt.get(interaction.guild.id + '-ROB')
        if (parseInt(res) == 1) {
            // Create Embed
            let message = new EmbedBuilder()
        		.setTitle('<:EXCLAMATION:1024407166460891166> » ERROR')
        		.setDescription('» The **`/rob`** Command is disabled on this Server!')
        		.setFooter({ text: '» ' + vote + ' » ' + version });

            if (lang === 'de') {
                message = new EmbedBuilder()
        		    .setTitle('<:EXCLAMATION:1024407166460891166> » FEHLER')
        		    .setDescription('» Der **`/rob`** Befehl ist auf diesem Server deaktiviert!')
        		    .setFooter({ text: '» ' + vote + ' » ' + version });
            }
            
            // Send Message
            bot.log(false, interaction.user.id, interaction.guild.id, '[CMD] ROB : DISABLED')
            return interaction.reply({ embeds: [message], ephemeral: true })
        }

        // Set Variables
        const user = interaction.options.getUser("user")
        const money = interaction.options.getString("money")
        const moneysnd = await bot.money.get(interaction.user.id);
        const moneytar = await bot.money.get(user.id);

        // Cooldown
        if (cooldown.get(interaction.user.id) - Date.now() > 0) {
            // Translate Vars
        	const timeLeft = cooldown.get(interaction.user.id) - Date.now(); 
            const cdown = timeLeft / 1000;
            
            // Create Embed
            let message = new EmbedBuilder()
            	.setTitle('<:EXCLAMATION:1024407166460891166> » ERROR')
  				.setDescription('» You still have a Cooldown of **' + cdown.toFixed(0) + 's**!')
            	.setFooter({ text: '» ' + vote + ' » ' + version });

            if (lang === 'de') {
                message = new EmbedBuilder()
            	    .setTitle('<:EXCLAMATION:1024407166460891166> » FEHLER')
  				    .setDescription('» Du hast leider noch einen Cooldown von **' + cdown.toFixed(0) + 's**!')
            	    .setFooter({ text: '» ' + vote + ' » ' + version });
            }
            
            bot.log(false, interaction.user.id, interaction.guild.id, '[CMD] ROB : ONCOOLDOWN : ' + cdown.toFixed(0) + 's');
            return interaction.reply({ embeds: [message], ephemeral: true })
        }
        
        // Check if User is Author
        if (interaction.user.id == user) {
            
            // Create Embed
            let message = new EmbedBuilder()
            	.setTitle('<:EXCLAMATION:1024407166460891166> » ERROR')
  				.setDescription('» You cant rob yourself?!')
            	.setFooter({ text: '» ' + vote + ' » ' + version });

            if (lang === 'de') {
                message = new EmbedBuilder()
            	    .setTitle('<:EXCLAMATION:1024407166460891166> » FEHLER')
  				    .setDescription('» Du kannst dich nicht selber ausrauben?!')
            	    .setFooter({ text: '» ' + vote + ' » ' + version });
            }
            
            bot.log(false, interaction.user.id, interaction.guild.id, '[CMD] ROB : ' + user.id + ' : ' + money + '€ : SAMEPERSON')
            return interaction.reply({ embeds: [message], ephemeral: true })
        }

        // Check if Target is Bot
        if (user.bot) {
            // Create Embed
            let message = new EmbedBuilder()
        		.setTitle('<:EXCLAMATION:1024407166460891166> » ERROR')
        		.setDescription('» You cant rob a Bot!')
        		.setFooter({ text: '» ' + vote + ' » ' + version });

            if (lang === 'de') {
                message = new EmbedBuilder()
        		    .setTitle('<:EXCLAMATION:1024407166460891166> » FEHLER')
        		    .setDescription('» Du kannst einem Bot kein Geld klauen!')
        		    .setFooter({ text: '» ' + vote + ' » ' + version });
            }
            
            // Send Message
            bot.log(false, interaction.user.id, interaction.guild.id, '[CMD] ROB : ' + user + ' : BOT')
            return interaction.reply({ embeds: [message], ephemeral: true })
        }
        
        // Set Steal to Need
        let need
        if (money == 35) { need = '20' }
        if (money == 20) { need = '50' }
        if (money == 5) { need = '100' }
        
        // Check for enough Money #1
        // Create Embed
        let notenoughmoney1 = new EmbedBuilder()
        	.setTitle('<:EXCLAMATION:1024407166460891166> » ERROR')
  			.setDescription('» You dont have enough Money for that, you need atleast **$' + need + '**! BRUH.')
        	.setFooter({ text: '» ' + vote + ' » ' + version });

        if (lang === 'de') {
            notenoughmoney1 = new EmbedBuilder()
        	    .setTitle('<:EXCLAMATION:1024407166460891166> » FEHLER')
  			    .setDescription('» Du hast nicht genug Geld dafür, du brauchst mindestens **' + need + '€**! BRUH.')
        	    .setFooter({ text: '» ' + vote + ' » ' + version });
        }
            
        // Check Money
        if (money == 35 && moneysnd < 20) {
            bot.log(false, interaction.user.id, interaction.guild.id, '[CMD] ROB : ' + user + ' : NOTENOUGHMONEY')
            return interaction.reply({ embeds: [notenoughmoney1.toJSON()], ephemeral: true })
     	};
        if (money == 20 && moneysnd < 50) {
            bot.log(false, interaction.user.id, interaction.guild.id, '[CMD] ROB : ' + user + ' : NOTENOUGHMONEY')
            return interaction.reply({ embeds: [notenoughmoney1.toJSON()], ephemeral: true })
     	};
        if (money == 5 && moneysnd < 100) {
            bot.log(false, interaction.user.id, interaction.guild.id, '[CMD] ROB : ' + user + ' : NOTENOUGHMONEY')
            return interaction.reply({ embeds: [notenoughmoney1.toJSON()], ephemeral: true })
     	};
            
        // Check for enough Money #2
        // Create Embed
        let notenoughmoney2 = new EmbedBuilder()
        	.setTitle('<:EXCLAMATION:1024407166460891166> » ERROR')
  			.setDescription('» <@' + user + '> doesnt have enough Money for that, he needs atleast **$' + need + '**! LOL.')
        	.setFooter({ text: '» ' + vote + ' » ' + version });

        if (lang === 'de') {
            notenoughmoney2 = new EmbedBuilder()
        	    .setTitle('<:EXCLAMATION:1024407166460891166> » FEHLER')
  			    .setDescription('» <@' + user + '> hat nicht genug Geld dafür, er braucht mindestens **' + need + '€**! LOL.')
        	    .setFooter({ text: '» ' + vote + ' » ' + version });
        }
            
        // Check Money
        if (money == 35 && moneytar < 20) {
            bot.log(false, interaction.user.id, interaction.guild.id, '[CMD] ROB : ' + user + ' : NOTENOUGHMONEY')
            return interaction.reply({ embeds: [notenoughmoney2.toJSON()], ephemeral: true })
     	};
        if (money == 20 && moneytar < 50) {
            bot.log(false, interaction.user.id, interaction.guild.id, '[CMD] ROB : ' + user + ' : NOTENOUGHMONEY')
            return interaction.reply({ embeds: [notenoughmoney2.toJSON()], ephemeral: true })
     	};
        if (money == 5 && moneytar < 100) {
            bot.log(false, interaction.user.id, interaction.guild.id, '[CMD] ROB : ' + user + ' : NOTENOUGHMONEY')
            return interaction.reply({ embeds: [notenoughmoney2.toJSON()], ephemeral: true })
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

        if (lang === 'de') {
            if (amount < 20) { extra = 'NAJA.'}
            if (amount >= 20) { extra = 'NICE.' }
            if (amount >= 40) { extra = 'PRIMA.' }
            if (amount >= 60) { extra = 'LOL.' }
            if (amount >= 80) { extra = 'EIN PRO??!!' }
        }
        
        // Create Embeds
      	let sucess = new EmbedBuilder()
            .setTitle('<:BAG:1024389219558367292> » AUSRAUBEN')
  			.setDescription('» You stole <@' + user + '> **$' + amount + '**! ' + extra)
        	.setFooter({ text: '» ' + vote + ' » ' + version });

        let failure = new EmbedBuilder()
            .setTitle('<:BAG:1024389219558367292> » AUSRAUBEN')
  			.setDescription('» You wanted to steal <@' + user + '> **$' + amount + '**, but the Police caught you! You had to pay **$' + punishment + '**! KEKW.')
        	.setFooter({ text: '» ' + vote + ' » ' + version });

        if (lang === 'de') {
            sucess = new EmbedBuilder()
                .setTitle('<:BAG:1024389219558367292> » AUSRAUBEN')
  			    .setDescription('» Du hast <@' + user + '> **' + amount + '€** geklaut! ' + extra)
        	    .setFooter({ text: '» ' + vote + ' » ' + version });
            
            failure = new EmbedBuilder()
                .setTitle('<:BAG:1024389219558367292> » AUSRAUBEN')
                .setDescription('» Du wolltest <@' + user + '> **' + amount + '€** klauen, aber die Polizei hat dich erwischt! Du musstest **' + punishment + '€** Strafgeld bezahlen! KEKW.')
                .setFooter({ text: '» ' + vote + ' » ' + version });
        }
        
        // Set Money
        if (status == false) {
            // Set Cooldown
			cooldown.set(interaction.user.id, Date.now() + time);
        	setTimeout(() => cooldown.delete(), time)
            
            bot.log(false, interaction.user.id, interaction.guild.id, '[CMD] ROB : ' + user + ' : ' + amount + '€ : FAILURE : ' + punishment + '€')
        	bot.money.rem(interaction, interaction.user.id, punishment)
        	return interaction.reply({ embeds: [failure.toJSON()] })
        }
        
        // Set Cooldown
		cooldown.set(interaction.user.id, Date.now() + time);
        setTimeout(() => cooldown.delete(), time)

        // Set Money
        bot.money.rem(interaction, user.id, amount)
        bot.money.add(interaction, interaction.user.id, amount)
        
        // Send Message
        bot.log(false, interaction.user.id, interaction.guild.id, '[CMD] ROB : ' + user + ' : ' + amount + '€ : SUCCESS')
        return interaction.reply({ embeds: [sucess.toJSON()] })
    },
};