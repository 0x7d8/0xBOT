const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('@discordjs/builders');
const { version, token } = require('../../../config.json');
const fetch = require("node-fetch");

// Register Client
const { Client, GatewayIntentBits } = require('discord.js');
const client = new Client({ intents: [GatewayIntentBits.Guilds] });
client.login(token)

module.exports = {
    data: new SlashCommandBuilder()
        .setName('businessbuy')
    	.setDMPermission(false)
        .setDescription('BUY BUSINESSES')
        .setDescriptionLocalizations({
            de: 'KAUFE GESCHÄFTE'
        })
        .addStringOption(option =>
            option.setName('business')
                .setNameLocalizations({
                    de: 'geschäft'
                })
                .setDescription('THE BUSINESS')
                .setDescriptionLocalizations({
                    de: 'DAS GESCHÄFT'
                })
                .setRequired(true)
    			.addChoices(
                    // Setup Choices
                    { name: '🟢 [150000€] SUPERMARKT', value: '1' },
            		{ name: '🔵 [390000€] PARKHAUS', value: '2' },
                    { name: '🟡 [520000€] BAHNHOF', value: '3' },
				)),
    async execute(interaction) {
        // Count to Global Commands
        cmds.add('t-all', 1)
        
        // Count Guild Commands and User
        cmds.add('g-' + interaction.guild.id, 1)
        cmds.add('u-' + interaction.user.id, 1)
        
        // Set Variables
        const business = interaction.options.getString("business")
        const balance = await getbal('<@' + interaction.user.id + '>');

        // Check if Command is Allowed :P
        if (interaction.user.id != "745619551865012274") {
            // Create Embed
            const err = new EmbedBuilder()
            .setTitle('» FEHLER')
            .setDescription('» Nur für Devs!')
            .setFooter({ text: '» ' + version });
    
        // Send Message
        return interaction.reply({ embeds: [err.toJSON()], ephemeral: true })
        }

        // Check if Business is Empty
        let businessowner, oldleft
        if (business = '1' && await getLb1o('g-' + interaction.guild.id) != 0) {
            oldleft = true
            businessowner = await getLb1o('g-' + interaction.guild.id)
            const guild = client.guilds.get(interaction.guild.id)

            // Check if Owner Left
            if (guild.member(businessowner)) {
                // Create Embed
                const err = new EmbedBuilder()
        		    .setTitle('» FEHLER')
        		    .setDescription('» Dieses Business gehört schon <@' + businessowner + '>!')
        		    .setFooter({ text: '» ' + version });
            
                // Send Message
                console.log('[0xBOT] [i] [' + interaction.user.id + ' @ ' + interaction.guild.id + '] BUSINESSBUY : ALREADYOWNED')
                return interaction.reply({ embeds: [err.toJSON()], ephemeral: true })
            }
        }
        if (business = '2' && await getLb2o('g-' + interaction.guild.id) != 0) {
            oldleft = true
            businessowner = await getLb2o('g-' + interaction.guild.id)
            const guild = client.guilds.get(interaction.guild.id)

            // Check if Owner Left
            if (guild.member(businessowner)) {
                // Create Embed
                const err = new EmbedBuilder()
        		    .setTitle('» FEHLER')
        		    .setDescription('» Dieses Business gehört schon <@' + businessowner + '>!')
        		    .setFooter({ text: '» ' + version });
            
                // Send Message
                console.log('[0xBOT] [i] [' + interaction.user.id + ' @ ' + interaction.guild.id + '] BUSINESSBUY : ALREADYOWNED')
                return interaction.reply({ embeds: [err.toJSON()], ephemeral: true })
            }
        }
        if (business = '3' && await getLb3o('g-' + interaction.guild.id) != 0) {
            oldleft = true
            businessowner = await getLb3o('g-' + interaction.guild.id)
            const guild = client.guilds.get(interaction.guild.id)

            // Check if Owner Left
            if (guild.member(businessowner)) {
                // Create Embed
                const err = new EmbedBuilder()
        		    .setTitle('» FEHLER')
        		    .setDescription('» Dieses Business gehört schon <@' + businessowner + '>!')
        		    .setFooter({ text: '» ' + version });
            
                // Send Message
                console.log('[0xBOT] [i] [' + interaction.user.id + ' @ ' + interaction.guild.id + '] BUSINESSBUY : ALREADYOWNED')
                return interaction.reply({ embeds: [err.toJSON()], ephemeral: true })
            }
        }

        // Calculate Cost
        let cost
        if (business = '1') { cost = 150000 }
        if (business = '2') { cost = 390000 }
        if (business = '3') { cost = 520000 }

        // Translate to Business Names
        let name
        if (business = '1') { name = 'SUPERMARKT' }
        if (business = '2') { name = 'PARKHAUS' }
        if (business = '3') { name = 'BAHNHOF' }

        if (balance < cost) {
            const missing = cost - balance
            
            // Create Embed
            const err = new EmbedBuilder()
            	.setTitle('» GESCHÄFT KAUFEN')
  				.setDescription('» Du hast dafür nicht genug Geld, dir fehlen **' + missing + '€**!')
            	.setFooter({ text: '» ' + version });
            
            // Send Message
            console.log('[0xBOT] [i] [' + interaction.user.id + ' @ ' + interaction.guild.id + '] BUSINESSBUY : ' + name.toUpperCase() + ' : NOTENOUGHMONEY : ' + cost + '€')
            return interaction.reply({ embeds: [err.toJSON()], ephemeral: true })
        }

        if (business = '1') {
            // Remove Old Owner if he left
            if (oldleft = true) {
                remLb1o('g-' + interaction.guild.id, businessowner)
            }

            // Own Business
            addLb1o('g-' + interaction.guild.id, interaction.user.id)
            remLb1e('g-' + interaction.guild.id, await getLb1e('g-' + interaction.guild.id))
            remLb1u('g-' + interaction.guild.id, await getLb1u('g-' + interaction.guild.id))
            remLb1t('g-' + interaction.guild.id, await getLb1t('g-' + interaction.guild.id))
            addLb1t('g-' + interaction.guild.id, Math.floor(+new Date() / 1000))
        }
        if (business = '2') {
            // Remove Old Owner if he left
            if (oldleft = true) {
                remLb1o('g-' + interaction.guild.id, businessowner)
            }

            // Own Business
            addLb2o('g-' + interaction.guild.id, interaction.user.id)
            remLb2e('g-' + interaction.guild.id, await getLb2e('g-' + interaction.guild.id))
            remLb2u('g-' + interaction.guild.id, await getLb2u('g-' + interaction.guild.id))
            remLb2t('g-' + interaction.guild.id, await getLb2t('g-' + interaction.guild.id))
            addLb2t('g-' + interaction.guild.id, Math.floor(+new Date() / 1000))
        }
        if (business = '3') {
            // Remove Old Owner if he left
            if (oldleft = true) {
                remLb1o('g-' + interaction.guild.id, businessowner)
            }

            // Own Business
            addLb3o('g-' + interaction.guild.id, interaction.user.id)
            remLb3e('g-' + interaction.guild.id, await getLb3e('g-' + interaction.guild.id))
            remLb3u('g-' + interaction.guild.id, await getLb3u('g-' + interaction.guild.id))
            remLb3t('g-' + interaction.guild.id, await getLb3t('g-' + interaction.guild.id))
            addLb3t('g-' + interaction.guild.id, Math.floor(+new Date() / 1000))
        }

        // Remove Money
        rembal('<@' + interaction.user.id + '>', cost)

        // Create Embed
        const message = new EmbedBuilder()
            .setTitle('» GESCHÄFT KAUFEN')
            .setDescription('» Du hast erfolgreich eine **' + name + '** für **' + cost + '€** gekauft!')
            .setFooter({ text: '» ' + version });

        // Send Message
        console.log('[0xBOT] [i] [' + interaction.user.id + ' @ ' + interaction.guild.id + '] BUSINESSBUY : ' + name.toUpperCase() + ' : ' + cost + '€')
        return interaction.reply({ embeds: [message.toJSON()] })
    },
};