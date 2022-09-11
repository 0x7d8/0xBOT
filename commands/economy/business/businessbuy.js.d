const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('@discordjs/builders');
const { version } = require('../../../config.json');
const fetch = require("node-fetch");

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
    async execute(interaction, client) {
        // Set Variables
        const business = interaction.options.getString("business")
        const balance = await bals.get(interaction.user.id.replace(/\D/g, ''));

        // Check if Command is Allowed :P
        if (interaction.user.id.replace(/\D/g, '') != "745619551865012274") {
            // Create Embed
            const err = new EmbedBuilder()
            .setTitle('» FEHLER')
            .setDescription('» Nur für Devs!')
            .setFooter({ text: '» ' + version });
    
        // Send Message
        return interaction.message.edit({ embeds: [err.toJSON()], ephemeral: true })
        }

        // Check if Business is Empty
        let businessowner, oldleft
        if (business = '1' && await Lb1o.get('g-' + interaction.guild.id) != 0) {
            oldleft = true
            businessowner = await Lb1o.get('g-' + interaction.guild.id)
            const guild = client.guilds.get(interaction.guild.id)

            // Check if Owner Left
            if (guild.member(businessowner)) {
                // Create Embed
                const err = new EmbedBuilder()
        		    .setTitle('» FEHLER')
        		    .setDescription('» Dieses Business gehört schon <@' + businessowner + '>!')
        		    .setFooter({ text: '» ' + version });
            
                // Send Message
                console.log('[0xBOT] [i] [' + new Date().toLocaleTimeString('en-US', { hour12: false }) + '] [' + interaction.user.id.replace(/\D/g, '') + ' @ ' + interaction.guild.id + '] [CMD] BUSINESSBUY : ALREADYOWNED')
                return interaction.message.edit({ embeds: [err.toJSON()], ephemeral: true })
            }
        }
        if (business = '2' && await Lb2o.get('g-' + interaction.guild.id) != 0) {
            oldleft = true
            businessowner = await Lb2o.get('g-' + interaction.guild.id)
            const guild = client.guilds.get(interaction.guild.id)

            // Check if Owner Left
            if (guild.member(businessowner)) {
                // Create Embed
                const err = new EmbedBuilder()
        		    .setTitle('» FEHLER')
        		    .setDescription('» Dieses Business gehört schon <@' + businessowner + '>!')
        		    .setFooter({ text: '» ' + version });
            
                // Send Message
                console.log('[0xBOT] [i] [' + new Date().toLocaleTimeString('en-US', { hour12: false }) + '] [' + interaction.user.id.replace(/\D/g, '') + ' @ ' + interaction.guild.id + '] [CMD] BUSINESSBUY : ALREADYOWNED')
                return interaction.message.edit({ embeds: [err.toJSON()], ephemeral: true })
            }
        }
        if (business = '3' && await Lb3o.get('g-' + interaction.guild.id) != 0) {
            oldleft = true
            businessowner = await Lb3o.get('g-' + interaction.guild.id)
            const guild = client.guilds.get(interaction.guild.id)

            // Check if Owner Left
            if (guild.member(businessowner)) {
                // Create Embed
                const err = new EmbedBuilder()
        		    .setTitle('» FEHLER')
        		    .setDescription('» Dieses Business gehört schon <@' + businessowner + '>!')
        		    .setFooter({ text: '» ' + version });
            
                // Send Message
                console.log('[0xBOT] [i] [' + new Date().toLocaleTimeString('en-US', { hour12: false }) + '] [' + interaction.user.id.replace(/\D/g, '') + ' @ ' + interaction.guild.id + '] [CMD] BUSINESSBUY : ALREADYOWNED')
                return interaction.message.edit({ embeds: [err.toJSON()], ephemeral: true })
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
            console.log('[0xBOT] [i] [' + new Date().toLocaleTimeString('en-US', { hour12: false }) + '] [' + interaction.user.id.replace(/\D/g, '') + ' @ ' + interaction.guild.id + '] [CMD] BUSINESSBUY : ' + name.toUpperCase() + ' : NOTENOUGHMONEY : ' + cost + '€')
            return interaction.message.edit({ embeds: [err.toJSON()], ephemeral: true })
        }

        if (business = '1') {
            // Remove Old Owner if he left
            if (oldleft = true) {
                Lb1o.rem('g-' + interaction.guild.id, businessowner)
            }

            // Own Business
            Lb1o.add('g-' + interaction.guild.id, interaction.user.id.replace(/\D/g, ''))
            Lb1e.rem('g-' + interaction.guild.id, await Lb1e.get('g-' + interaction.guild.id))
            Lb1u.rem('g-' + interaction.guild.id, await Lb1u.get('g-' + interaction.guild.id))
            Lb1t.rem('g-' + interaction.guild.id, await Lb1t.get('g-' + interaction.guild.id))
            Lb1t.add('g-' + interaction.guild.id, Math.floor(+new Date() / 1000))
        }
        if (business = '2') {
            // Remove Old Owner if he left
            if (oldleft = true) {
                Lb1o.rem('g-' + interaction.guild.id, businessowner)
            }

            // Own Business
            Lb2o.add('g-' + interaction.guild.id, interaction.user.id.replace(/\D/g, ''))
            Lb2e.rem('g-' + interaction.guild.id, await Lb2e.get('g-' + interaction.guild.id))
            Lb2u.rem('g-' + interaction.guild.id, await Lb2u.get('g-' + interaction.guild.id))
            Lb2t.rem('g-' + interaction.guild.id, await Lb2t.get('g-' + interaction.guild.id))
            Lb2t.rem('g-' + interaction.guild.id, Math.floor(+new Date() / 1000))
        }
        if (business = '3') {
            // Remove Old Owner if he left
            if (oldleft = true) {
                Lb1o.rem('g-' + interaction.guild.id, businessowner)
            }

            // Own Business
            Lb3o.add('g-' + interaction.guild.id, interaction.user.id.replace(/\D/g, ''))
            Lb3e.rem('g-' + interaction.guild.id, await Lb3e.get('g-' + interaction.guild.id))
            Lb3u.rem('g-' + interaction.guild.id, await Lb3u.get('g-' + interaction.guild.id))
            Lb3t.rem('g-' + interaction.guild.id, await Lb3t.get('g-' + interaction.guild.id))
            Lb3t.add('g-' + interaction.guild.id, Math.floor(+new Date() / 1000))
        }

        // Remove Money
        bals.rem(interaction.user.id.replace(/\D/g, ''), cost)

        // Create Embed
        const message = new EmbedBuilder()
            .setTitle('» GESCHÄFT KAUFEN')
            .setDescription('» Du hast erfolgreich eine **' + name + '** für **' + cost + '€** gekauft!')
            .setFooter({ text: '» ' + version });

        // Send Message
        console.log('[0xBOT] [i] [' + new Date().toLocaleTimeString('en-US', { hour12: false }) + '] [' + interaction.user.id.replace(/\D/g, '') + ' @ ' + interaction.guild.id + '] [CMD] BUSINESSBUY : ' + name.toUpperCase() + ' : ' + cost + '€')
        return interaction.message.edit({ embeds: [message.toJSON()] })
    },
};