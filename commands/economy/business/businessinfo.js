const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('@discordjs/builders');
const { version } = require('../../../config.json');

const fetch = require("node-fetch");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('businessinfo')
    	.setDMPermission(false)
        .setDescription('VIEW INFO ABOUT BUSINESSES')
        .setDescriptionLocalizations({
            de: 'SEHE INFOS VON GESCHÄFTEN'
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
                    { name: '🟢 SUPERMARKT', value: 'market' },
            		{ name: '🔵 PARKHAUS', value: 'parking garage' },
                    { name: '🟡 AUTOHAUS', value: 'car dealership' },
				)),
    async execute(interaction, client, lang, vote) {
        // Set Variables
        const business = interaction.options.getString("business")
        const balance = await bals.get(interaction.user.id.replace(/\D/g, ''));

        // Check if Command is Allowed :P
        if (interaction.user.id.replace(/\D/g, '') != "745619551865012274" && interaction.user.id.replace(/\D/g, '') != "994495187617321010") {
            // Create Embed
            const err = new EmbedBuilder()
                .setTitle('» FEHLER')
                .setDescription('» Nur für Devs!')
                .setFooter({ text: '» ' + vote + ' » ' + version });
    
            // Send Message
            console.log(interaction.user.id + ' is a lol')
            return interaction.reply({ embeds: [err.toJSON()], ephemeral: true })
        }

        // Check if Business is Empty
        let businessowner, oldleft
        if (business == 'market' && await market.get('g-' + interaction.guild.id + '-OWNER') != 0) {
            oldleft = true
            businessowner = await market.get('g-' + interaction.guild.id + '-OWNER')
            businessearning = await market.get('g-' + interaction.guild.id + '-EARNING')
            try {
                await interaction.guild.members.fetch(businessowner)
            } catch (e) {return}

            // Create Embed
            let message = new EmbedBuilder()
        	    .setTitle('» BUSINESS INFO')
        	    .setDescription('» Business Infos:\n\nOwner: <@' + businessowner + '>\nEarnings: ' + businessearning + '€')
        	    .setFooter({ text: '» ' + vote + ' » ' + version });

            if (lang.toString() == 'de') {
                message = new EmbedBuilder()
        	        .setTitle('» GESCHÄFTS INFO')
        	        .setDescription('» Geschäfts Infos:\n\nBesitzer: <@' + businessowner + '>\nEinkommen: ' + businessearning + '€')
        	        .setFooter({ text: '» ' + vote + ' » ' + version });
            }
            
            // Send Message
            console.log('[0xBOT] [i] [' + new Date().toLocaleTimeString('en-US', { hour12: false }) + '] [' + interaction.user.id.replace(/\D/g, '') + ' @ ' + interaction.guild.id + '] [CMD] BUSINESSINFO : ' + business.toUpperCase())
            return interaction.reply({ embeds: [message.toJSON()], ephemeral: true })
        }

        // Create Embed
        let message = new EmbedBuilder()
            .setTitle('» BUSINESS INFO')
            .setDescription('» Noone owns this Business, people say its profitable though!\n*mhm, i say that for everything*')
            .setFooter({ text: '» ' + vote + ' » ' + version });

        if (lang.toString() == 'de') {
            message = new EmbedBuilder()
                .setTitle('» GESCHÄFTS INFO')
                .setDescription('» Niemanden gehört dieses Geschäft, es besagt sich es sei aber profitabel!\n*naja, das sag ich bei jedem*')
                .setFooter({ text: '» ' + vote + ' » ' + version });
        }

        // Send Message
        console.log('[0xBOT] [i] [' + new Date().toLocaleTimeString('en-US', { hour12: false }) + '] [' + interaction.user.id.replace(/\D/g, '') + ' @ ' + interaction.guild.id + '] [CMD] BUSINESSINFO : ' + business.toUpperCase() + ' : NOTOWNED')
        return interaction.reply({ embeds: [message.toJSON()] })
    },
};