const { ActionRowBuilder, ModalBuilder, TextInputBuilder, TextInputStyle } = require('discord.js')
const { SlashCommandBuilder, EmbedBuilder } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('apicreate')
        .setDescription('CREATE AN API')
        .setDescriptionLocalizations({
            de: 'ERSTELLE EINE API'
        })
    	.setDMPermission(false)
        .addStringOption(option =>
            option.setName('name')
                .setDescription('THE NAME')
                .setDescriptionLocalizations({
                    de: 'DER NAME'
                })
                .setRequired(true)
        		.addChoices(
            		// Setup Choices
					{ name: '💻 1', value: '1' },
					{ name: '💻 2', value: '2' },
					{ name: '💻 3', value: '3' },
            		{ name: '💻 4', value: '4' },
            		{ name: '💻 5', value: '5' },
				)),
    async execute(interaction, client, lang, vote) {
        // Set Variables
        const name = interaction.options.getString("name")
        const amount = await bot.apis.get(interaction.user.id)

        // Check if API exists
  		if (await uapi.get(interaction.user.id + '-' + name) !== 'N-EXIST') {
            // Create Embed
            let message = new EmbedBuilder().setColor(0x37009B)
        		.setTitle('<:EXCLAMATION:1024407166460891166> » ERROR')
        		.setDescription('» This API already exists!\n</apiedit:1002107281510506517> to change it\n</apiremove:1002107281510506518> to delete it')
        		.setFooter({ text: '» ' + config.version + ' » SLOTS ' + amount + '/5'});

            if (lang === 'de') {
                message = new EmbedBuilder().setColor(0x37009B)
        		    .setTitle('<:EXCLAMATION:1024407166460891166> » FEHLER')
        		    .setDescription('» Diese API existiert schon!\n</apiedit:1002107281510506517> um sie zu ändern\n</apiremove:1002107281510506518> um sie zu löschen')
        		    .setFooter({ text: '» ' + config.version + ' » SLOTS ' + amount + '/5'});
            }
            
            // Send Message
            ctx.log(false, '[CMD] APICREATE : ' + name + ' : NOTFOUND')
            return interaction.reply({ embeds: [message], ephemeral: true })
  		}
        
        // Check if Slots are Free
        if (amount > 4) {
            // Create Embed
            let message = new EmbedBuilder().setColor(0x37009B)
        		.setTitle('<:EXCLAMATION:1024407166460891166> » ERROR')
        		.setDescription('» You have used all of your **5** API Slots!')
        		.setFooter({ text: '» ' + vote + ' » ' + config.version });

            if (lang === 'de') {
                message = new EmbedBuilder().setColor(0x37009B)
        		    .setTitle('<:EXCLAMATION:1024407166460891166> » FEHLER')
        		    .setDescription('» Du hast alle deiner **5** API Slots genutzt!')
        		    .setFooter({ text: '» ' + vote + ' » ' + config.version });
            }
            
            // Send Message
            ctx.log(false, '[CMD] APICREATE : ' + name + ' : MAXSLOTS')
            return interaction.reply({ embeds: [message], ephemeral: true })
        }

        // Create Modal
        const modal = new ModalBuilder()
            .setCustomId('API-' + name + '-CREATE')
            .setTitle('API CONTENT')

        const contentInput = new TextInputBuilder()
            .setCustomId('api-content')
            .setLabel('Please enter the Content of your API.')
            .setMinLength(1)
            .setStyle(TextInputStyle.Paragraph)

        const content = new ActionRowBuilder().addComponents(contentInput)
        modal.addComponents(content)

        // Send Modal
        return interaction.showModal(modal)
    }
}