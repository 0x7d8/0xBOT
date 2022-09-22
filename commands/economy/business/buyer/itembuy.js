const { SlashCommandBuilder } = require('@discordjs/builders');
const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js')
const { EmbedBuilder } = require('@discordjs/builders');
const { version } = require('../../../../config.json');

const fetch = require("node-fetch");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('itembuy')
    	.setDMPermission(false)
        .setDescription('BUY ITEMS')
        .setDescriptionLocalizations({
            de: 'KAUFE GEGENSTÄNDE'
        })
        .addStringOption(option =>
            option.setName('item')
                .setNameLocalizations({
                    de: 'gegenstand'
                })
                .setDescription('THE ITEM')
                .setDescriptionLocalizations({
                    de: 'DER GEGENSTAND'
                })
                .setRequired(true)
    			.addChoices(
                    // Setup Choices
                    { name: '💣 NORMALE BOMBE', value: 'nbomb' },
            		{ name: '💣 MEDIUM BOMBE', value: 'mbomb' },
                    { name: '💣 HYPER BOMBE', value: 'hbomb' },
                    { name: '💣 CRAZY BOMBE', value: 'cbomb' },
				))
        .addIntegerOption(option =>
            option.setName('amount')
                .setNameLocalizations({
                    de: 'anzahl'
                })
                .setDescription('THE AMOUNT')
                .setDescriptionLocalizations({
                    de: 'DIE ANZAHL'
                })
                .setRequired(false)),
    async execute(interaction, client, lang, vote) {
        // Set Variables
        const itemid = interaction.options.getString("item")
        const amount = interaction.options.getInteger("amount")
        const balance = await bals.get(interaction.user.id)

        // Calculate Cost Multiplier
        let costmul
        if (amount == null) { costmul = 1 } else { costmul = amount }

        // Calculate Cost
        let cost
        if (await bsns.get('g-' + interaction.guild.id + '-1-PRICES') === '0' || await bsns.get('g-' + interaction.guild.id + '-1-PRICES') === 0) {
            if (itemid == 'nbomb') { cost = 500*costmul }
            if (itemid == 'mbomb') { cost = 1000*costmul }
            if (itemid == 'hbomb') { cost = 5000*costmul }
            if (itemid == 'cbomb') { cost = 15000*costmul }
        } else {
            const dbprices = await bsns.get('g-' + interaction.guild.id + '-1-PRICES')
            const cache = dbprices.split('-')
			const [j, k, t, p] = cache

            if (itemid == 'nbomb') { cost = parseInt(j)*costmul }
            if (itemid == 'mbomb') { cost = parseInt(k)*costmul }
            if (itemid == 'hbomb') { cost = parseInt(t)*costmul }
            if (itemid == 'cbomb') { cost = parseInt(p)*costmul }
        }

        // Translate to Item Names
        let name
        if (itemid == 'nbomb') { name = '<:NBOMB:1021783222520127508> NORMAL BOMB' }
        if (itemid == 'mbomb') { name = '<:MBOMB:1021783295211601940> MEDIUM BOMB' }
        if (itemid == 'hbomb') { name = '<:HBOMB:1022102357938536458> HYPER BOMB' }
        if (itemid == 'cbomb') { name = '<:CBOMB:1021783405161091162> CRAZY BOMB' }
        if (lang == 'de') {
            if (itemid == 'nbomb') { name = '<:NBOMB:1021783222520127508> NORMALE BOMBE' }
            if (itemid == 'mbomb') { name = '<:MBOMB:1021783295211601940> MEDIUM BOMBE' }
            if (itemid == 'hbomb') { name = '<:HBOMB:1022102357938536458> HYPER BOMBE' }
            if (itemid == 'cbomb') { name = '<:CBOMB:1021783405161091162> CRAZY BOMBE' }
        }

        // Check if User has enough Money
        if (balance < cost) {
            const missing = cost - balance
            
            // Create Embed
            let message = new EmbedBuilder()
            	.setTitle('» ERROR')
  				.setDescription('» You dont have enough Money for that, you are missing **$' + missing + '**!')
            	.setFooter({ text: '» ' + vote + ' » ' + version });

            if (lang == "de") {
                message = new EmbedBuilder()
            	    .setTitle('» FEHLER')
  				    .setDescription('» Du hast dafür nicht genug Geld, dir fehlen **' + missing + '€**!')
            	    .setFooter({ text: '» ' + vote + ' » ' + version });
            }
            
            // Send Message
            bot.log(false, interaction.user.id, interaction.guild.id, '[CMD] ITEMBUY : ' + itemid.toUpperCase() + ' : NOTENOUGHMONEY : ' + cost + '€')
            return interaction.reply({ embeds: [message.toJSON()], ephemeral: true })
        }

        // Calculate Processed Amount
        let pamount = amount
        if (amount == null) { pamount = 1 }

        // Check if Max Slots are used
        const oldamount = await item.get(interaction.user.id + '-' + itemid.toUpperCase() + 'S-' + interaction.guild.id, 'amount')
        if ((pamount + oldamount) > 15) {
            // Create Embed
            let message = new EmbedBuilder()
                .setTitle('» ERROR')
                .setDescription('» You dont have enough Slots for that!')
                .setFooter({ text: '» ' + vote + ' » ' + version });

            if (lang == "de") {
                message = new EmbedBuilder()
                    .setTitle('» FEHLER')
                    .setDescription('» Du hast nicht genug Slots dafür!')
                    .setFooter({ text: '» ' + vote + ' » ' + version });
            }
    
            // Send Message
            bot.log(false, interaction.user.id, interaction.guild.id, '[BTN] ITEMBUY : ' + itemid.toUpperCase() + ' : MAXSLOTS')
            return interaction.reply({ embeds: [message.toJSON()], ephemeral: true })
        }

        // Create Buttons
        let row = new ActionRowBuilder()
			.addComponents(
				new ButtonBuilder()
					.setLabel('YES')
                    .setCustomId('ITEM-BUY-YES-' + itemid + '-' + interaction.user.id + '-' + pamount)
                    .setEmoji('1017050442431209543')
					.setStyle(ButtonStyle.Success)
                    .setDisabled(true),

                new ButtonBuilder()
					.setLabel('NO')
                    .setCustomId('ITEM-BUY-NO-' + itemid + '-' + interaction.user.id + '-' + pamount)
                    .setEmoji('1017050508252418068')
					.setStyle(ButtonStyle.Danger)
                    .setDisabled(true),
			);
        if (lang == "de") {
            row = new ActionRowBuilder()
			    .addComponents(
			    	new ButtonBuilder()
			    		.setLabel('JA')
                        .setCustomId('ITEM-BUY-YES-' + itemid + '-' + interaction.user.id + '-' + pamount)
                        .setEmoji('1017050442431209543')
			    		.setStyle(ButtonStyle.Success)
                        .setDisabled(false),

                    new ButtonBuilder()
			    		.setLabel('NEIN')
                        .setCustomId('ITEM-BUY-NO-' + itemid + '-' + interaction.user.id + '-' + pamount)
                        .setEmoji('1017050508252418068')
			    		.setStyle(ButtonStyle.Danger)
                        .setDisabled(false),
			    );
        }

        // Create Embed
        let message
        if (amount == null || amount == 1) {
            message = new EmbedBuilder()
                .setTitle('» BUY itemid')
                .setDescription('» Do you want to buy a **' + name + '** for **$' + cost + '**?')
                .setFooter({ text: '» ' + vote + ' » ' + version });

            if (lang == 'de') {
                message = new EmbedBuilder()
                    .setTitle('» GEGENSTAND KAUFEN')
                    .setDescription('» Willst du eine **' + name + '** für **' + cost + '€** kaufen?')
                    .setFooter({ text: '» ' + vote + ' » ' + version });
            }
        } else {
            message = new EmbedBuilder()
                .setTitle('» BUY itemidS')
                .setDescription('» Do you want to buy **' + amount + 'x** **' + name + '** for **$' + cost + '**?')
                .setFooter({ text: '» ' + vote + ' » ' + version });

            if (lang == 'de') {
                message = new EmbedBuilder()
                    .setTitle('» GEGENSTÄNDE KAUFEN')
                    .setDescription('» Willst du **' + amount + 'x** **' + name + '** für **' + cost + '€** kaufen?')
                    .setFooter({ text: '» ' + vote + ' » ' + version });
            }
        }

        // Send Message
        bot.log(false, interaction.user.id, interaction.guild.id, '[CMD] ITEMBUY : ' + itemid.toUpperCase() + ' : ' + cost + '€')
        return interaction.reply({ embeds: [message.toJSON()], components: [row] })
    },
};