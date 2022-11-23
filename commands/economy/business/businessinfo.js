const { SlashCommandBuilder, EmbedBuilder } = require('@discordjs/builders')

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
        // Check if Businesses are Enabled in Server
        if (!await bot.settings.get(interaction.guild.id, 'businesses')) {
            // Create Embed
            let message = new EmbedBuilder().setColor(0x37009B)
        		.setTitle('<:EXCLAMATION:1024407166460891166> » ERROR')
        		.setDescription('» Businesses are disabled on this Server!')
        		.setFooter({ text: '» ' + vote + ' » ' + config.version });

            if (lang === 'de') {
                message = new EmbedBuilder().setColor(0x37009B)
        		    .setTitle('<:EXCLAMATION:1024407166460891166> » FEHLER')
        		    .setDescription('» Geschäfte sind auf diesem Server deaktiviert!')
        		    .setFooter({ text: '» ' + vote + ' » ' + config.version });
            }
            
            // Send Message
            bot.log(false, interaction.user.id, interaction.guild.id, '[CMD] BUSINESS : DISABLED')
            return interaction.reply({ embeds: [message], ephemeral: true })
        }

        // Set Variables
        const business = interaction.options.getString("business")

        // Translate to Business ID
        let businessid
        if (business == 'market') { businessid = '1' }
        if (business == 'parking garage') { businessid = '2' }
        if (business == 'car dealership') { businessid = '3' }

        // Check if Business is Empty
        let businessowner, oldleft
        if (await bot.businesses.get('g-' + interaction.guild.id + '-' + businessid + '-OWNER') != 0) {
            oldleft = true
            businessowner = await bot.businesses.get('g-' + interaction.guild.id + '-' + businessid + '-OWNER')
            businessearning = await bot.businesses.get('g-' + interaction.guild.id + '-' + businessid + '-EARNING', true)
            try {
                await interaction.guild.members.fetch(businessowner)
            } catch (e) {return}

            // Create Embed
            let message = new EmbedBuilder().setColor(0x37009B)
        	    .setTitle('<:QUESTION:1024402860210921503> » BUSINESS INFO')
        	    .setDescription('» Business Infos:\n\nOwner: <@' + businessowner + '>\nEarnings: ' + businessearning + '€')
        	    .setFooter({ text: '» ' + vote + ' » ' + config.version });

            if (lang == 'de') {
                message = new EmbedBuilder().setColor(0x37009B)
        	        .setTitle('<:QUESTION:1024402860210921503> » GESCHÄFTS INFO')
        	        .setDescription('» Geschäfts Infos:\n\nBesitzer: <@' + businessowner + '>\nEinkommen: ' + businessearning + '€')
        	        .setFooter({ text: '» ' + vote + ' » ' + config.version });
            }
            
            // Send Message
            bot.log(false, interaction.user.id, interaction.guild.id, '[CMD] BUSINESSINFO : ' + business.toUpperCase())
            return interaction.reply({ embeds: [message], ephemeral: true })
        }

        // Create Embed
        let message = new EmbedBuilder().setColor(0x37009B)
            .setTitle('<:QUESTION:1024402860210921503> » BUSINESS INFO')
            .setDescription('» Noone owns this Business, people say its profitable though!\n*mhm, I say that for everything*')
            .setFooter({ text: '» ' + vote + ' » ' + config.version });

        if (lang == 'de') {
            message = new EmbedBuilder().setColor(0x37009B)
                .setTitle('<:QUESTION:1024402860210921503> » GESCHÄFTS INFO')
                .setDescription('» Niemanden gehört dieses Geschäft, es besagt sich es sei aber profitabel!\n*naja, das sag ich bei jedem*')
                .setFooter({ text: '» ' + vote + ' » ' + config.version });
        }

        // Send Message
        bot.log(false, interaction.user.id, interaction.guild.id, '[CMD] BUSINESSINFO : ' + business.toUpperCase() + ' : NOTOWNED')
        return interaction.reply({ embeds: [message], ephemeral: true })
    }
}